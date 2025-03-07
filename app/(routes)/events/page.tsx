"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Tag, ChevronRight, Search, Filter } from "lucide-react";
import { ContentContainer } from "../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Event } from "./data/events"; // Nur den Typen importieren, nicht die Daten
import { format, isWithinInterval, parseISO, startOfDay, endOfDay, isSameDay } from "date-fns";

// API-URL für Events
const API_URL = '/api/events';

// Animation-Varianten
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [manualFrom, setManualFrom] = useState<string>('');
  const [manualTo, setManualTo] = useState<string>('');
  
  // Lade Events von der API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        // Wenn events ein Array im Datensatz ist, verwende es, sonst ein leeres Array
        setEvents(data.events || []);
      } catch (error) {
        console.error("Fehler beim Laden der Events:", error);
        setError("Events konnten nicht geladen werden. Bitte versuchen Sie es später erneut.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Kategorien für Filter - dynamisch aus den geladenen Events generieren
  const categories = useMemo(() => {
    return Array.from(new Set(events.map(event => event.category).filter(Boolean) as string[]));
  }, [events]);
  
  // Nach Datum sortierte Events
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [events]);
  
  // Gefilterte Events basierend auf der ausgewählten Kategorie und Datum/Zeitraum
  const filteredEvents = useMemo(() => {
    return sortedEvents.filter(event => {
      // Kategorie-Filter
      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }
      
      // Datum-Filter für einzelnes Datum
      if (selectedDate) {
        const eventDate = parseISO(event.date);
        return isSameDay(eventDate, selectedDate);
      }
      
      // Zeitraum-Filter
      if (dateRange && dateRange.from && dateRange.to) {
        const eventDate = parseISO(event.date);
        return isWithinInterval(eventDate, { 
          start: startOfDay(dateRange.from), 
          end: endOfDay(dateRange.to) 
        });
      }
      
      return true;
    });
  }, [sortedEvents, selectedCategory, selectedDate, dateRange]);
  
  // Formatiert das Datum in ein lesbares Format (DD.MM.YYYY)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Datumsauswahl zurücksetzen
  const resetDateSelection = () => {
    setSelectedDate(undefined);
    setDateRange(undefined);
  };

  // Bestimmung von Events für bestimmte Tage im Kalender
  const hasEventOnDate = (date: Date) => {
    return events.some(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, date);
    });
  };

  // Manuelle Datumseingabe validieren und anwenden
  const handleManualDateRange = () => {
    try {
      // Validiere die Eingaben
      const fromDate = parseISO(manualFrom);
      const toDate = parseISO(manualTo);
      
      if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
        throw new Error('Ungültiges Datumsformat');
      }
      
      if (fromDate > toDate) {
        throw new Error('Startdatum muss vor dem Enddatum liegen');
      }
      
      // Setze den Datumsbereich
      setDateRange({ from: fromDate, to: toDate });
      setSelectedDate(undefined);
    } catch (err) {
      alert('Bitte geben Sie gültige Daten im Format YYYY-MM-DD ein');
    }
  };

  // Event-Karte Komponente
  const EventCard = ({ event }: { event: Event }) => {
    const [imageError, setImageError] = useState(false);
    
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col relative z-10"
        variants={itemVariants}
      >
        <div className="relative h-48">
          <Image 
            src={imageError ? "/images/default-event.jpg" : (event.image || "/images/default-event.jpg")}
            alt={event.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {event.featured && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white py-1 px-3 rounded-bl-lg">
              Highlight
            </div>
          )}
          {event.category && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-white/80 text-blue-700 backdrop-blur-sm">
                {event.category}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
          
          <div className="space-y-2 mb-3 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span>{formatDate(event.date)}</span>
              {event.time && <span className="ml-2">| {event.time}</span>}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
          
          <p className="text-gray-600 line-clamp-3 mb-4">
            {event.description}
          </p>
        </div>
        
        <div className="p-4 pt-0 mt-auto">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/events/${event.id}`}>
              Details ansehen
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div className="bg-gray-50 py-8">
        <ContentContainer>
          {/* Hero-Bereich */}
          <div className="mb-12">
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/default-event.jpg"  // Standardbild für Events
                alt="Veranstaltungen auf Amrum"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Veranstaltungen auf Amrum</h1>
                  <p className="text-xl max-w-3xl">
                    Entdecken Sie die vielfältigen Events und Aktivitäten, die Amrum zu bieten hat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>

      <ContentContainer className="py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-800 transition-colors">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">Veranstaltungen</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Kommende Veranstaltungen</h2>
          <p className="text-gray-600 mb-6">
            Ob Kultur, Sport, Musik oder Tradition – auf Amrum ist immer etwas los! Entdecken Sie unser vielfältiges 
            Angebot an Veranstaltungen und Events, die Ihren Aufenthalt auf unserer Insel noch unvergesslicher machen.
            Von geführten Wattwanderungen über Konzerte bis hin zu traditionellen Festen – für jeden Geschmack ist etwas dabei.
          </p>
        </div>
        
        {/* Tabs für Listenansicht/Kalenderansicht */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "list" | "calendar")} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Veranstaltungen anzeigen</h3>
            <TabsList>
              <TabsTrigger value="list" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Listenansicht
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Kalenderansicht
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="list">
            {/* Kategorie-Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Nach Kategorien filtern:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={`cursor-pointer px-3 py-1 ${selectedCategory === null ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Alle
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    className={`cursor-pointer px-3 py-1 ${selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Anzeige der aktiven Filter */}
            {(selectedDate || (dateRange && dateRange.from && dateRange.to)) && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">
                    {selectedDate 
                      ? `Veranstaltungen am ${format(selectedDate, 'dd.MM.yyyy')}`
                      : dateRange?.from && dateRange?.to 
                        ? `Veranstaltungen vom ${format(dateRange.from, 'dd.MM.yyyy')} bis ${format(dateRange.to, 'dd.MM.yyyy')}`
                        : ''}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={resetDateSelection}>
                  Zurücksetzen
                </Button>
              </div>
            )}
            
            {/* Event-Karten */}
            {filteredEvents.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </motion.div>
            ) : (
              <div className="bg-blue-50 p-8 rounded-xl text-center">
                <p className="text-lg text-gray-700">
                  Für den ausgewählten Zeitraum oder diese Kategorie sind keine Veranstaltungen verfügbar.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory(null);
                    resetDateSelection();
                  }}
                >
                  Alle Filter zurücksetzen
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="mb-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 border-b pb-3">Veranstaltungen im Kalender</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Linke Spalte: Kalender für Einzeltagsauswahl */}
                <div className="lg:col-span-5">
                  <div className="bg-gray-50 rounded-lg p-4 relative">
                    <h4 className="font-medium text-lg mb-4 text-blue-800">Einzelnen Tag auswählen</h4>
                    <div className="calendar-wrapper relative z-30">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          // Bei Auswahl eines Tages den Zeitraum zurücksetzen
                          setDateRange(undefined);
                        }}
                        numberOfMonths={1}
                        modifiers={{
                          hasEvent: (date) => hasEventOnDate(date)
                        }}
                        modifiersClassNames={{
                          hasEvent: "bg-blue-100 font-bold text-blue-600"
                        }}
                        className="rounded-md border bg-white shadow-sm"
                        disabled={{ before: new Date('2000-01-01') }}
                        toDate={new Date('2030-12-31')}
                      />
                    </div>
                    
                    {selectedDate && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <h5 className="font-medium text-blue-700">Ausgewählter Tag:</h5>
                        <p className="text-gray-800 font-medium">
                          {format(selectedDate, 'dd.MM.yyyy')}
                        </p>
                        
                        <button 
                          onClick={() => setSelectedDate(undefined)}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Auswahl zurücksetzen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Rechte Spalte: Zeitraumauswahl */}
                <div className="lg:col-span-7">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-lg mb-4 text-blue-800">Zeitraum auswählen</h4>
                    <div className="space-y-6">
                      {/* Manuelle Datumseingabe */}
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <h5 className="font-medium text-gray-800 mb-3">Zeitraum manuell eingeben:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Von:</label>
                            <input 
                              type="date" 
                              value={manualFrom}
                              onChange={(e) => setManualFrom(e.target.value)}
                              className="border border-gray-300 rounded px-3 py-2"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Bis:</label>
                            <input 
                              type="date" 
                              value={manualTo}
                              onChange={(e) => setManualTo(e.target.value)}
                              className="border border-gray-300 rounded px-3 py-2"
                            />
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={handleManualDateRange}
                          className="mt-4 bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 transition-colors w-full md:w-auto"
                        >
                          Zeitraum anwenden
                        </button>
                      </div>
                      
                      {/* Ausgewählter Zeitraum-Anzeige */}
                      {dateRange?.from && dateRange?.to && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                          <h5 className="font-medium text-green-800 mb-2">Aktiver Zeitraum:</h5>
                          <div className="flex items-center text-lg mb-1">
                            <CalendarIcon className="h-5 w-5 text-green-600 mr-2" />
                            <span className="font-bold text-green-700">
                              {format(dateRange.from, 'dd.MM.yyyy')} - {format(dateRange.to, 'dd.MM.yyyy')}
                            </span>
                          </div>
                          <p className="text-sm text-green-600 ml-7">
                            ({Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} Tage)
                          </p>
                          <button 
                            onClick={resetDateSelection}
                            className="mt-3 text-sm bg-white text-green-600 border border-green-300 rounded-md px-3 py-1 hover:bg-green-50"
                          >
                            Zeitraum zurücksetzen
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Ergebnisbereich */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-lg mb-4 text-gray-800">Gefundene Veranstaltungen</h4>
                    
                    {filteredEvents.length === 0 ? (
                      <div className="bg-orange-50 border border-orange-200 rounded-md p-4 text-center">
                        <p className="text-orange-600">
                          Keine Veranstaltungen im ausgewählten Zeitraum gefunden.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-3">
                          <span className="font-medium text-green-600">
                            {filteredEvents.length} Veranstaltung{filteredEvents.length !== 1 ? 'en' : ''}
                          </span> gefunden
                        </p>
                        
                        <Button 
                          onClick={() => {
                            // Scroll zu den gefundenen Events
                            document.getElementById('filtered-events-results')?.scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }}
                          className="w-full"
                        >
                          Zu den Ergebnissen scrollen
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Event-Liste für Kalender-Ansicht */}
            <div id="filtered-events-results">
              <h3 className="text-xl font-semibold mb-4">
                {filteredEvents.length > 0 ? (
                  <>
                    Gefundene Veranstaltungen
                    {selectedDate && (
                      <span className="font-normal text-base ml-2 text-gray-600">
                        für den {format(selectedDate, 'dd.MM.yyyy')}
                      </span>
                    )}
                    {dateRange?.from && dateRange?.to && (
                      <span className="font-normal text-base ml-2 text-gray-600">
                        im Zeitraum {format(dateRange.from, 'dd.MM.yyyy')} - {format(dateRange.to, 'dd.MM.yyyy')}
                      </span>
                    )}
                  </>
                ) : (
                  "Keine Veranstaltungen gefunden"
                )}
              </h3>
              
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Veranstaltungen vorschlagen */}
        <div className="bg-gray-50 rounded-xl p-6 mt-10">
          <h3 className="text-xl font-bold mb-3">Sie planen eine Veranstaltung auf Amrum?</h3>
          <p className="text-gray-600 mb-4">
            Wenn Sie eine Veranstaltung auf Amrum planen und diese hier veröffentlichen möchten, 
            kontaktieren Sie uns bitte. Wir nehmen Ihre Veranstaltung gerne in unseren Kalender auf.
          </p>
          <Button asChild>
            <Link href="/kontakt">Veranstaltung melden</Link>
          </Button>
        </div>
      </ContentContainer>
    </>
  );
} 