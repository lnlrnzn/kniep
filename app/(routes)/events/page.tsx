"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar as CalendarIcon, Filter, MapPin } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentContainer } from "../../components/ui/content-container";

// Mock Daten für Events
const mockEvents = [
  {
    id: "1",
    title: "Amrumer Muscheltage",
    date: new Date(2025, 4, 15), // Mai 15, 2025
    endDate: new Date(2025, 4, 17), // Mai 17, 2025
    location: "Strandpromenade Wittdün",
    description: "Dreitägiges Festival rund um Muscheln mit kulinarischen Highlights und Musikprogramm.",
    category: "Kulinarik",
    image: "/events/muscheltage.jpg"
  },
  {
    id: "2",
    title: "Amrum Marathon",
    date: new Date(2025, 8, 5), // September 5, 2025
    endDate: new Date(2025, 8, 5), // September 5, 2025
    location: "Start: Sportplatz Norddorf",
    description: "Laufevent durch die atemberaubende Dünenlandschaft und am Strand entlang.",
    category: "Sport",
    image: "/events/marathon.jpg"
  },
  {
    id: "3",
    title: "Kunsthandwerkermarkt",
    date: new Date(2025, 6, 20), // Juli 20, 2025
    endDate: new Date(2025, 6, 25), // Juli 25, 2025
    location: "Dorfplatz Nebel",
    description: "Lokale Künstler und Handwerker präsentieren ihre Werke und bieten Workshops an.",
    category: "Kunst & Kultur",
    image: "/events/kunstmarkt.jpg"
  },
  {
    id: "4",
    title: "Inselführung: Naturschutzgebiet",
    date: new Date(2025, 5, 10), // Juni 10, 2025
    endDate: new Date(2025, 5, 10), // Juni 10, 2025
    location: "Treffpunkt: Leuchtturm",
    description: "Geführte Wanderung durch die einzigartige Flora und Fauna des Naturschutzgebiets.",
    category: "Natur",
    image: "/events/inselfuehrung.jpg"
  },
  {
    id: "5",
    title: "Amrumer Jazztage",
    date: new Date(2025, 7, 8), // August 8, 2025
    endDate: new Date(2025, 7, 10), // August 10, 2025
    location: "Verschiedene Locations auf der Insel",
    description: "Internationales Jazzfestival mit Konzerten in gemütlicher Atmosphäre.",
    category: "Musik",
    image: "/events/jazztage.jpg"
  }
];

const categories = ["Alle", "Kulinarik", "Sport", "Kunst & Kultur", "Natur", "Musik"];

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  // Filtern der Events basierend auf Datum und Kategorie
  const filteredEvents = mockEvents.filter(event => {
    // Datum-Filter
    if (date) {
      const eventStart = new Date(event.date);
      const eventEnd = new Date(event.endDate);
      const selectedDate = new Date(date);
      
      // Prüfen, ob das ausgewählte Datum innerhalb des Event-Zeitraums liegt
      const isDateInRange = 
        selectedDate.getFullYear() >= eventStart.getFullYear() && 
        selectedDate.getFullYear() <= eventEnd.getFullYear() &&
        selectedDate.getMonth() >= eventStart.getMonth() && 
        selectedDate.getMonth() <= eventEnd.getMonth() &&
        selectedDate.getDate() >= eventStart.getDate() && 
        selectedDate.getDate() <= eventEnd.getDate();
        
      if (!isDateInRange) return false;
    }
    
    // Kategorie-Filter
    if (selectedCategory !== "Alle" && event.category !== selectedCategory) {
      return false;
    }
    
    return true;
  });

  return (
    <ContentContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Events auf Amrum</h1>
        <p className="text-lg text-muted-foreground">
          Entdecken Sie die vielfältigen Veranstaltungen auf unserer wunderschönen Insel.
          Von kulturellen Highlights bis zu sportlichen Aktivitäten ist für jeden etwas dabei.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar mit Filtern */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 lg:col-span-4 space-y-6"
        >
          <div className="border rounded-lg p-6 shadow-sm bg-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Filter className="mr-2 h-5 w-5" /> Filter
            </h2>
            
            <div className="space-y-4">
              {/* Datumsfilter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Datum</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md"
                  locale={de}
                />
                
                {date && (
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm">
                      Ausgewählt: {format(date, "dd.MM.yyyy", { locale: de })}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDate(undefined)}
                    >
                      Zurücksetzen
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Kategorienfilter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Kategorie</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Button
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Eventliste */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 lg:col-span-8"
        >
          <Tabs defaultValue="list">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Veranstaltungen</h2>
              <TabsList>
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="calendar">Kalender</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(event.date, "dd. MMMM yyyy", { locale: de })}
                          {event.date.getTime() !== event.endDate.getTime() && (
                            <> - {format(event.endDate, "dd. MMMM yyyy", { locale: de })}</>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>{event.location}</span>
                        </div>
                        <p>{event.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm">
                          <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {event.category}
                          </span>
                        </div>
                        <Button asChild variant="outline">
                          <Link href={`/events/${event.id}`}>Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    Keine Veranstaltungen für die ausgewählten Filter gefunden.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setDate(undefined);
                      setSelectedCategory("Alle");
                    }}
                  >
                    Filter zurücksetzen
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="border rounded-lg p-6">
                <p className="text-center text-muted-foreground">
                  Kalenderansicht ist in Entwicklung.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </ContentContainer>
  );
} 