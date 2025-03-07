"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Settings, Plus, List, Clock, ChevronRight } from "lucide-react";
import { ContentContainer } from "../../../components/ui/content-container";
import { Button } from "@/components/ui/button";

export default function ManageDashboardPage() {
  // Verhindere Server-Rendering während des Builds
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Wenn nicht Client-seitig, zeige eine einfache Ladeseite
  if (!isClient) {
    return (
      <ContentContainer>
        <div className="min-h-screen flex items-center justify-center">
          <p>Lädt Dashboard...</p>
        </div>
      </ContentContainer>
    );
  }
  
  return (
    <div className="bg-gray-50 py-8">
      <ContentContainer>
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-800 transition-colors">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/events" className="hover:text-gray-800 transition-colors">
            Veranstaltungen
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">Verwaltung</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Inhalte verwalten</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Veranstaltungen verwalten */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Veranstaltungen</h2>
            <p className="text-gray-600 mb-6">
              Hier können Sie Veranstaltungen erstellen, bearbeiten und löschen. Alle Veranstaltungen werden im Kalender angezeigt.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild>
                <Link href="/events/manage/page" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Neue Veranstaltung
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/events" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  Alle anzeigen
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Öffnungszeiten verwalten */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Öffnungszeiten</h2>
            <p className="text-gray-600 mb-6">
              Verwalten Sie Öffnungszeiten und Kontaktinformationen für verschiedene Standorte. Diese Informationen werden auf der Website angezeigt.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild variant="outline">
                <Link href="/events/manage/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Einstellungen bearbeiten
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Hinweis zur Inhaltsbearbeitung</h2>
          <p className="text-gray-700 mb-4">
            Alle Änderungen an Veranstaltungen und Öffnungszeiten werden sofort auf der Website übernommen. 
            Bitte prüfen Sie daher Ihre Eingaben sorgfältig, bevor Sie sie speichern.
          </p>
          <div className="flex items-center text-blue-800 text-sm">
            <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
            <span>Die Daten werden in JSONbin gespeichert und sind jederzeit bearbeitbar.</span>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
} 