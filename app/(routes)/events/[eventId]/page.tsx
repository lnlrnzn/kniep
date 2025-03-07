"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Tag, User, Globe, ChevronRight, ArrowLeft } from "lucide-react";
import { ContentContainer } from "../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "../data/events"; // Nur den Typen importieren

// API-URL für Events
const API_URL = '/api/events';

export default function EventPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // API-Anfrage für alle Events
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Suche das Event mit der entsprechenden ID
        const foundEvent = data.events?.find((e: Event) => e.id === eventId);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          // Wenn kein Event gefunden wurde, setzen wir event auf null
          setEvent(null);
        }
      } catch (error) {
        console.error("Fehler beim Laden des Events:", error);
        setError("Event konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [eventId]);

  // Wenn kein Event gefunden wurde, zeigen wir die 404-Seite
  if (!loading && !event) {
    notFound();
  }

  // Formatiert das Datum in ein lesbares Format (DD.MM.YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Während des Ladens zeigen wir einen Ladeindikator
  if (loading) {
    return (
      <ContentContainer className="py-20">
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-pulse text-xl text-gray-500">Lade Veranstaltungsdetails...</div>
        </div>
      </ContentContainer>
    );
  }

  // Falls ein Fehler aufgetreten ist
  if (error) {
    return (
      <ContentContainer className="py-20">
        <div className="flex flex-col justify-center items-center min-h-[40vh]">
          <div className="text-xl text-red-500 mb-4">{error}</div>
          <Button asChild>
            <Link href="/events">Zurück zur Übersicht</Link>
          </Button>
        </div>
      </ContentContainer>
    );
  }

  return (
    <>
      {/* Hero-Bereich mit Event-Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={event?.image || "/images/events/default-event.webp"}
          alt={event?.title || "Veranstaltung"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="mb-3">
              {event?.category && (
                <Badge className="bg-white/20 backdrop-blur-sm text-white">
                  {event.category}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event?.title}</h1>
            <div className="flex flex-wrap justify-center gap-4 items-center text-lg">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(event?.date || "")}</span>
              </div>
              {event?.time && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event?.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContentContainer className="py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 relative z-10">
          <Link href="/" className="hover:text-gray-800 transition-colors">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/events" className="hover:text-gray-800 transition-colors">
            Veranstaltungen
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">{event?.title}</span>
        </div>

        {/* Zurück-Button */}
        <div className="mb-8 relative z-10">
          <Button asChild variant="outline">
            <Link href="/events" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Übersicht
            </Link>
          </Button>
        </div>

        {/* Event-Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="lg:col-span-2 relative z-10">
            <h2 className="text-2xl font-bold mb-6">Über diese Veranstaltung</h2>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">
                  {event?.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative z-20">
            {/* Info-Box */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Veranstaltungsdetails</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Datum</p>
                    <p className="text-gray-600">{formatDate(event?.date || "")}</p>
                  </div>
                </div>
                
                {event?.time && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Uhrzeit</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Ort</p>
                    <p className="text-gray-600">{event?.location}</p>
                  </div>
                </div>
                
                {event?.category && (
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Kategorie</p>
                      <p className="text-gray-600">{event.category}</p>
                    </div>
                  </div>
                )}
                
                {event?.organizer && (
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Veranstalter</p>
                      <p className="text-gray-600">{event.organizer}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {event?.link && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button asChild className="w-full">
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Offizielle Website
                    </a>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Weitere Veranstaltungen */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Mehr entdecken</h3>
              <p className="text-gray-600 mb-4">
                Möchten Sie weitere Veranstaltungen auf Amrum entdecken? Schauen Sie sich unsere 
                Übersicht aller kommenden Events an.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/events">Alle Veranstaltungen anzeigen</Link>
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 