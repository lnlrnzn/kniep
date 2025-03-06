"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Clock, Tag, ChevronRight, Search, Filter } from "lucide-react";
import { ContentContainer } from "../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { events, Event } from "./data/events";
import { format, isWithinInterval, parseISO, startOfDay, endOfDay, isSameDay } from "date-fns";

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

// Kategorien für Filter
const categories = Array.from(new Set(events.map(event => event.category).filter(Boolean) as string[]));

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(undefined);
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  
  // Nach Datum sortierte Events
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, []);
  
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

  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/events/events-hero.webp"
          alt="Veranstaltungen auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Veranstaltungen auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie ein vielfältiges Programm an Events und Veranstaltungen auf unserer schönen Insel
            </p>
          </div>
        </div>
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
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    variants={itemVariants}
                  >
                    <Link href={`/events/${event.id}`}>
                      <div className="relative h-48">
                        <Image
                          src={event.image || "/images/events/default-event.webp"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        {event.featured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-blue-600">Highlight</Badge>
                          </div>
                        )}
                        {event.category && (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-white/80 text-gray-800">{event.category}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <CalendarIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                          <span>{formatDate(event.date)}</span>
                          {event.time && (
                            <>
                              <span className="mx-1">•</span>
                              <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                              <span>{event.time}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-start text-sm text-gray-500 mb-3">
                          <MapPin className="h-4 w-4 mr-1.5 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                        
                        <div className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">
                          Mehr erfahren →
                        </div>
                      </div>
                    </Link>
                  </motion.div>
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
            <div className="mb-6 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Veranstaltungen im Kalender</h3>
              <p className="text-gray-600 mb-4">
                Wählen Sie einen Tag, um Veranstaltungen für diesen Tag zu sehen, oder markieren Sie einen Zeitraum, 
                um alle Veranstaltungen in diesem Zeitraum anzuzeigen.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange(range as { from: Date; to: Date });
                          setSelectedDate(undefined);
                        } else if (range?.from) {
                          setSelectedDate(range.from);
                          setDateRange(undefined);
                        } else {
                          resetDateSelection();
                        }
                      }}
                      modifiers={{
                        hasEvent: (date) => hasEventOnDate(date)
                      }}
                      modifiersClassNames={{
                        hasEvent: "bg-blue-100 font-bold text-blue-600"
                      }}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div className="md:w-1/2 flex flex-col">
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-2">Ausgewählter Zeitraum</h4>
                      {selectedDate ? (
                        <p className="text-gray-700">
                          {format(selectedDate, 'dd.MM.yyyy')}
                        </p>
                      ) : dateRange?.from && dateRange?.to ? (
                        <p className="text-gray-700">
                          {format(dateRange.from, 'dd.MM.yyyy')} bis {format(dateRange.to, 'dd.MM.yyyy')}
                        </p>
                      ) : (
                        <p className="text-gray-500 italic">Kein Zeitraum ausgewählt</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg mb-2">Gefundene Veranstaltungen</h4>
                      <p className="text-gray-700">
                        {filteredEvents.length} Veranstaltung{filteredEvents.length !== 1 ? 'en' : ''}
                      </p>
                    </div>
                    
                    {(selectedDate || (dateRange && dateRange.from && dateRange.to)) && (
                      <div className="mt-auto pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full" 
                          onClick={resetDateSelection}
                        >
                          Auswahl zurücksetzen
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Liste der Events im ausgewählten Zeitraum */}
            {(selectedDate || (dateRange && dateRange.from && dateRange.to)) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedDate 
                    ? `Veranstaltungen am ${format(selectedDate, 'dd.MM.yyyy')}`
                    : dateRange?.from && dateRange?.to 
                      ? `Veranstaltungen vom ${format(dateRange.from, 'dd.MM.yyyy')} bis ${format(dateRange.to, 'dd.MM.yyyy')}`
                      : 'Gefundene Veranstaltungen'}
                </h3>
                
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <Link key={event.id} href={`/events/${event.id}`}>
                        <div className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 flex flex-col md:flex-row gap-4 transition-shadow">
                          <div className="md:w-1/4 relative h-32 md:h-auto rounded-md overflow-hidden">
                            <Image
                              src={event.image || "/images/events/default-event.webp"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="md:w-3/4">
                            <h4 className="text-lg font-bold mb-2">{event.title}</h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              {event.time && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                                <span>{event.location}</span>
                              </div>
                              {event.category && (
                                <div className="flex items-center">
                                  <Tag className="h-4 w-4 mr-1.5 text-blue-600" />
                                  <span>{event.category}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 line-clamp-2 mb-3">{event.description}</p>
                            <div className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">
                              Mehr erfahren →
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <p className="text-gray-700">
                      Für den ausgewählten Zeitraum sind keine Veranstaltungen verfügbar.
                    </p>
                  </div>
                )}
              </div>
            )}
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