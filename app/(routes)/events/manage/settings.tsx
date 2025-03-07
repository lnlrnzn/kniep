"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Save, Clock, CalendarRange, Map, Phone, Mail, Globe, AlertCircle } from "lucide-react";
import { ContentContainer } from "../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// API-Route Konfiguration
const API_URL = '/api/events';

// Typdefinitionen
interface OpeningPeriod {
  name: string;
  days: string;
  hours: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  periods: OpeningPeriod[];
}

interface SettingsData {
  locations: Location[];
}

// Beispiel-Daten für Öffnungszeiten (werden nur verwendet, wenn keine Daten in der API vorhanden sind)
const initialOpeningHours: SettingsData = {
  locations: [
    {
      id: "naturzentrum",
      name: "Naturzentrum Amrum",
      address: "Strunwai 31, 25946 Norddorf auf Amrum",
      phone: "04682 1635",
      email: "veranstaltungen@naturzentrum-amrum.de",
      website: "https://www.oeoemrang-ferian.de/",
      periods: [
        {
          name: "April bis Oktober",
          days: "täglich außer Do",
          hours: "10:00 - 17:00 Uhr"
        },
        {
          name: "November bis März",
          days: "Mi | Fr | Sa | So",
          hours: "12:00 - 16:00 Uhr"
        }
      ]
    },
    {
      id: "badeland",
      name: "Amrum Badeland",
      address: "Am Schwimmbad 1, 25946 Wittdün auf Amrum",
      phone: "04682-943431",
      email: "info@amrum-badeland.de",
      website: "https://amrum-badeland.de",
      periods: [
        {
          name: "06.01.2025 bis 12.04.2025 (Mittwoch)",
          days: "Mittwoch",
          hours: "13:00 - 18:00 Uhr"
        },
        {
          name: "06.01.2025 bis 12.04.2025 (Donnerstag)",
          days: "Donnerstag",
          hours: "13:00 - 18:00 Uhr"
        },
        {
          name: "06.01.2025 bis 12.04.2025 (Freitag)",
          days: "Freitag",
          hours: "13:00 - 18:00 Uhr"
        },
        {
          name: "06.01.2025 bis 12.04.2025 (Wochenende)",
          days: "Samstag, Sonntag",
          hours: "12:00 - 18:00 Uhr"
        }
      ]
    }
  ]
};

export default function SettingsPage() {
  const [openingHours, setOpeningHours] = useState<SettingsData>(initialOpeningHours);
  const [selectedLocation, setSelectedLocation] = useState<string>("naturzentrum");
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Lade Daten aus API beim ersten Laden
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setInitialLoading(true);
        const response = await fetch(API_URL);
        
        if (response.ok) {
          const data = await response.json();
          
          // Prüfe, ob es Standort-Daten gibt
          if (data && data.locations) {
            setOpeningHours({
              locations: data.locations
            });
          } else {
            // Wenn keine locations in der Antwort, initialisiere mit Beispieldaten
            await updateAPI({ locations: initialOpeningHours.locations });
            setOpeningHours(initialOpeningHours);
          }
        } else {
          // Fallback wenn API nicht verfügbar ist
          console.warn("Konnte keine Daten von der API laden, verwende initiale Daten");
          setOpeningHours(initialOpeningHours);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Einstellungen:", error);
        setError("Daten konnten nicht geladen werden. Beispieldaten werden verwendet.");
        setOpeningHours(initialOpeningHours);
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  // Aktualisiere Daten über die API
  const updateAPI = async (data: any) => {
    try {
      console.log("Sende Daten an API:", data);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      // Überprüfe den Response-Status
      if (!response.ok) {
        // Versuche, die Fehlermeldung aus der API zu erhalten
        let errorMessage = `API responded with status ${response.status}`;
        
        try {
          const errorData = await response.json();
          console.error("API Fehlerantwort:", errorData);
          
          // Extrahiere aussagekräftige Fehlermeldung
          if (errorData.error) errorMessage = errorData.error;
          if (errorData.details) errorMessage += `: ${errorData.details}`;
        } catch (jsonError) {
          // Wenn keine JSON-Antwort verfügbar ist, versuche den Textinhalt zu lesen
          const errorText = await response.text().catch(() => '');
          if (errorText) {
            console.error("API Fehlertext:", errorText);
            errorMessage += `: ${errorText.substring(0, 100)}...`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log("API-Antwort:", result);
      
      // Zeige Quelle der gespeicherten Daten an (local oder jsonbin)
      if (result._meta && result._meta.source) {
        console.log(`Daten wurden in '${result._meta.source}' gespeichert`);
      }
      
      return true;
    } catch (error: any) {
      console.error("Fehler beim Speichern über die API:", error);
      // Detailliertere Fehlermeldung werfen
      throw new Error(`Speichern fehlgeschlagen: ${error.message || 'Unbekannter Fehler'}`);
    }
  };

  // Funktion zum Aktualisieren der Standortinformationen
  const handleLocationChange = (id: string, field: string, value: string) => {
    setOpeningHours(prev => ({
      ...prev,
      locations: prev.locations.map(location => 
        location.id === id 
          ? { ...location, [field]: value }
          : location
      )
    }));
  };

  // Funktion zum Aktualisieren der Öffnungszeiten
  const handlePeriodChange = (locationId: string, periodIndex: number, field: string, value: string) => {
    setOpeningHours(prev => ({
      ...prev,
      locations: prev.locations.map(location => 
        location.id === locationId 
          ? { 
              ...location,
              periods: location.periods.map((period, idx) => 
                idx === periodIndex
                  ? { ...period, [field]: value }
                  : period
              )
            }
          : location
      )
    }));
  };

  // Funktion zum Hinzufügen einer neuen Öffnungszeit
  const addPeriod = (locationId: string) => {
    setOpeningHours(prev => ({
      ...prev,
      locations: prev.locations.map(location => 
        location.id === locationId 
          ? { 
              ...location,
              periods: [
                ...location.periods,
                { name: "Neue Öffnungszeit", days: "", hours: "" }
              ]
            }
          : location
      )
    }));
  };

  // Funktion zum Entfernen einer Öffnungszeit
  const removePeriod = (locationId: string, periodIndex: number) => {
    setOpeningHours(prev => ({
      ...prev,
      locations: prev.locations.map(location => 
        location.id === locationId 
          ? { 
              ...location,
              periods: location.periods.filter((_, idx) => idx !== periodIndex)
            }
          : location
      )
    }));
  };

  // Funktion zum Hinzufügen eines neuen Standorts
  const addLocation = () => {
    const newId = `location-${Date.now()}`;
    setOpeningHours(prev => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          id: newId,
          name: "Neuer Standort",
          address: "",
          phone: "",
          email: "",
          website: "",
          periods: [{ name: "Standardzeit", days: "", hours: "" }]
        }
      ]
    }));
    // Selektiere den neuen Standort
    setSelectedLocation(newId);
  };

  // Hauptformular-Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaved(false);
    
    try {
      // Speichere Daten über die API
      await updateAPI({ locations: openingHours.locations });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Erfolgsmeldung nach 3 Sekunden ausblenden
    } catch (err: any) {
      console.error("Fehler beim Speichern:", err);
      setError(err.message || 'Es ist ein Fehler beim Speichern aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  // Finde den aktuell ausgewählten Standort
  const currentLocation = openingHours.locations.find(loc => loc.id === selectedLocation);

  if (initialLoading) {
    return (
      <div className="bg-gray-50 py-8 min-h-screen">
        <ContentContainer>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Daten werden geladen...</p>
            </div>
          </div>
        </ContentContainer>
      </div>
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
          <Link href="/events/manage" className="hover:text-gray-800 transition-colors">
            Verwaltung
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">Einstellungen</span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Website-Einstellungen</h1>
          <Button variant="outline" asChild>
            <Link href="/events/manage">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück zur Verwaltung
            </Link>
          </Button>
        </div>

        {/* Fehler/Erfolg Anzeige */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="font-semibold">Fehler</span>
            </div>
            <p className="ml-6 mt-1">{error}</p>
          </div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              <span className="font-semibold">Gespeichert!</span>
            </div>
            <p className="ml-6 mt-1">
              Die Einstellungen wurden erfolgreich aktualisiert.
            </p>
          </div>
        )}

        <Tabs value={selectedLocation} onValueChange={setSelectedLocation} className="mb-8">
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium">Öffnungszeiten & Kontaktinformationen</h2>
              <p className="text-gray-500 text-sm mt-1">
                Verwalten Sie die Öffnungszeiten und Kontaktinformationen für verschiedene Standorte
              </p>
            </div>
            
            <div className="p-4 border-b flex justify-between items-center">
              <TabsList className="justify-start overflow-x-auto">
                {openingHours.locations.map(location => (
                  <TabsTrigger key={location.id} value={location.id}>
                    {location.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addLocation}
                className="ml-4"
              >
                + Standort hinzufügen
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              {openingHours.locations.map(location => (
                <TabsContent key={location.id} value={location.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Standortinformationen */}
                    <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Map className="h-5 w-5 mr-2 text-gray-600" />
                        Standortinformationen
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`name-${location.id}`} className="text-sm font-medium">
                            Name des Standorts
                          </Label>
                          <Input
                            id={`name-${location.id}`}
                            value={location.name}
                            onChange={(e) => handleLocationChange(location.id, 'name', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`address-${location.id}`} className="text-sm font-medium">
                            Adresse
                          </Label>
                          <Input
                            id={`address-${location.id}`}
                            value={location.address}
                            onChange={(e) => handleLocationChange(location.id, 'address', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`phone-${location.id}`} className="text-sm font-medium">
                            Telefon
                          </Label>
                          <div className="flex items-center mt-1">
                            <Phone className="h-4 w-4 text-gray-500 mr-2" />
                            <Input
                              id={`phone-${location.id}`}
                              value={location.phone}
                              onChange={(e) => handleLocationChange(location.id, 'phone', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`email-${location.id}`} className="text-sm font-medium">
                            E-Mail
                          </Label>
                          <div className="flex items-center mt-1">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            <Input
                              id={`email-${location.id}`}
                              value={location.email}
                              onChange={(e) => handleLocationChange(location.id, 'email', e.target.value)}
                              type="email"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor={`website-${location.id}`} className="text-sm font-medium">
                            Website
                          </Label>
                          <div className="flex items-center mt-1">
                            <Globe className="h-4 w-4 text-gray-500 mr-2" />
                            <Input
                              id={`website-${location.id}`}
                              value={location.website}
                              onChange={(e) => handleLocationChange(location.id, 'website', e.target.value)}
                              type="url"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Öffnungszeiten */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-600" />
                        Öffnungszeiten
                      </h3>
                      
                      {location.periods.map((period, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-700">Öffnungszeit {index + 1}</h4>
                            {location.periods.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePeriod(location.id, index)}
                                className="text-red-500 text-sm hover:text-red-700"
                              >
                                Entfernen
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`period-name-${location.id}-${index}`} className="text-sm font-medium">
                                Bezeichnung
                              </Label>
                              <Input
                                id={`period-name-${location.id}-${index}`}
                                value={period.name}
                                onChange={(e) => handlePeriodChange(location.id, index, 'name', e.target.value)}
                                className="mt-1"
                                placeholder="z.B. Sommersaison"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`period-days-${location.id}-${index}`} className="text-sm font-medium">
                                Wochentage
                              </Label>
                              <Input
                                id={`period-days-${location.id}-${index}`}
                                value={period.days}
                                onChange={(e) => handlePeriodChange(location.id, index, 'days', e.target.value)}
                                className="mt-1"
                                placeholder="z.B. Mo-Fr oder täglich"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`period-hours-${location.id}-${index}`} className="text-sm font-medium">
                                Uhrzeiten
                              </Label>
                              <Input
                                id={`period-hours-${location.id}-${index}`}
                                value={period.hours}
                                onChange={(e) => handlePeriodChange(location.id, index, 'hours', e.target.value)}
                                className="mt-1"
                                placeholder="z.B. 09:00 - 17:00 Uhr"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => addPeriod(location.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        + Weitere Öffnungszeit hinzufügen
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="min-w-[150px]"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                          Speichern...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Save className="mr-2 h-4 w-4" />
                          Änderungen speichern
                        </div>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </form>
          </div>
        </Tabs>
      </ContentContainer>
    </div>
  );
} 