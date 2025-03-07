"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, MapPin, Tag, Save, Plus, Edit, Trash, Upload, AlertCircle, ChevronLeft } from "lucide-react";
import { ContentContainer } from "../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { events, Event } from "../data/events";

// API-Route statt direkter JSONbin-Zugriff
const API_URL = '/api/events';

// Event-Kategorien
const eventCategories = [
  "Kultur",
  "Sport",
  "Familie",
  "Natur",
  "Musik",
  "Kunst",
  "Kulinarik",
  "Wellness",
  "Workshop",
  "Führung",
  "Sonstiges"
];

export default function EventManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const [formData, setFormData] = useState<Partial<Event>>({
    id: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
    description: '',
    image: '',
    category: '',
    organizer: '',
    featured: false,
    link: ''
  });
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // Lade Events über die API-Route
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        // Wenn events ein Array im Datensatz ist, verwende es, sonst ein leeres Array
        setAllEvents(data.events || []);
      } catch (error) {
        console.error("Fehler beim Laden der Events:", error);
        // Fallback zu lokalen Daten
        setAllEvents(events);
        setError("Daten konnten nicht von der API geladen werden. Lokale Daten werden verwendet.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Lade Event-Daten wenn ID vorhanden ist
  useEffect(() => {
    if (editId && allEvents.length > 0) {
      const eventToEdit = allEvents.find(event => event.id === editId);
      if (eventToEdit) {
        setFormData(eventToEdit);
        if (eventToEdit.image) {
          setImagePreview(eventToEdit.image);
        }
      } else {
        setError(`Event mit ID ${editId} wurde nicht gefunden.`);
      }
    }
  }, [editId, allEvents]);

  // Handle Änderungen in Formularfeldern
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Änderungen bei Select
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Änderungen bei Checkbox
  const handleToggleChange = (name: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Speichere Daten über die API
  const saveToAPI = async (updatedEvents: Event[]) => {
    try {
      // Alle Bilder sollten jetzt URLs sein (keine Base64-Daten)
      console.log("Sende Daten an API:", { events: updatedEvents });
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ events: updatedEvents })
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

  // Handle Formular-Absenden
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaved(false);
    
    try {
      // Generiere eine ID für neue Events
      const eventId = editId || `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Bereite Event-Daten vor
      const eventData: Event = {
        ...formData as Event,
        id: eventId,
      };
      
      // Bild-URL direkt verwenden
      if (imagePreview) {
        eventData.image = imagePreview;
      }
      
      // Event zum Array hinzufügen oder aktualisieren
      let updatedEvents: Event[];
      
      if (editId) {
        // Update existierendes Event
        updatedEvents = allEvents.map(event => 
          event.id === editId ? { ...eventData } : event
        );
      } else {
        // Neues Event hinzufügen
        updatedEvents = [...allEvents, eventData];
      }
      
      // Über die API speichern
      await saveToAPI(updatedEvents);
      
      // UI aktualisieren
      setAllEvents(updatedEvents);
      setSaved(true);
      
      if (!editId) {
        // Bei neuem Event Formular zurücksetzen
        setFormData({
          id: '',
          title: '',
          date: new Date().toISOString().split('T')[0],
          time: '',
          location: '',
          description: '',
          image: '',
          category: '',
          organizer: '',
          featured: false,
          link: ''
        });
        setImagePreview('');
      }
    } catch (err: any) {
      console.error("Fehler beim Speichern:", err);
      // Benutzerfreundliche Fehlermeldung anzeigen
      setError(err.message || 'Es ist ein Fehler beim Speichern aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Angepasste Bild-Input-Funktion nur mit URL-Option
  const renderImageInput = () => (
    <div className="mb-6">
      <Label className="block mb-2">
        Bild (URL)
      </Label>
      
      <div className="space-y-2">
        <Input
          type="url"
          name="image"
          placeholder="https://beispiel.de/bild.jpg"
          value={formData.image || ''}
          onChange={(e) => {
            handleChange(e);
            setImagePreview(e.target.value);
          }}
          className="w-full"
        />
        <div className="text-sm space-y-2">
          <p className="font-medium text-gray-700">
            Wichtig: Verwenden Sie den <span className="text-blue-600 font-bold">direkten Link zum Bild</span>, nicht den Link zur Bildseite.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-md">
            <div className="space-y-1">
              <p className="font-medium text-green-600">✓ Richtige Links (enden mit .jpg, .png, etc.):</p>
              <p className="text-xs bg-gray-100 p-1 rounded break-all">https://i.postimg.cc/8C9CcGCx/beispiel.jpg</p>
              <p className="text-xs bg-gray-100 p-1 rounded break-all">https://i.imgur.com/abcdefg.png</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-red-600">✗ Falsche Links (zur Seite, nicht zum Bild):</p>
              <p className="text-xs bg-gray-100 p-1 rounded break-all">https://postimg.cc/DWQhptLc</p>
              <p className="text-xs bg-gray-100 p-1 rounded break-all">https://imgur.com/gallery/abcdefg</p>
            </div>
          </div>
          
          <p className="text-gray-600 mt-2">
            Sie können kostenlose Dienste wie 
            <a href="https://imgur.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">
              Imgur
            </a>,
            <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">
              ImgBB
            </a> oder
            <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-1">
              PostImages
            </a> verwenden.
          </p>
          
          <p className="text-gray-600">
            <strong>Tipp:</strong> Bei PostImage kopieren Sie den Link unter "<strong>Direct link</strong>", 
            bei Imgur den Link zum "<strong>Direktes Bild</strong>" und bei ImgBB den "<strong>Direct image link</strong>".
          </p>
        </div>
      </div>
      
      {imagePreview && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Vorschau:</p>
          <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden">
            <Image 
              src={imagePreview}
              alt="Bildvorschau"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
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
            <span className="text-gray-800">
              {editId ? 'Veranstaltung bearbeiten' : 'Neue Veranstaltung'}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {editId ? 'Veranstaltung bearbeiten' : 'Neue Veranstaltung erstellen'}
            </h1>
            <Button variant="outline" asChild>
              <Link href="/events/manage">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Zurück zur Übersicht
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
                Die Veranstaltung wurde erfolgreich {editId ? 'aktualisiert' : 'erstellt'}.
              </p>
            </div>
          )}
          
          {/* Event-Formular */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Titel */}
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Titel der Veranstaltung*
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="z.B. Sommerfest Amrum"
                  required
                />
              </div>
              
              {/* Datum und Zeit */}
              <div>
                <Label htmlFor="date" className="text-base font-medium">
                  Datum*
                </Label>
                <Input 
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="time" className="text-base font-medium">
                  Uhrzeit
                </Label>
                <Input 
                  id="time"
                  name="time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="z.B. 14:00 - 18:00 Uhr"
                />
              </div>
              
              {/* Ort und Kategorie */}
              <div>
                <Label htmlFor="location" className="text-base font-medium">
                  Veranstaltungsort*
                </Label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="z.B. Wittdün, Strandpromenade"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Kategorie
                </Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Wählen Sie eine Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Veranstalter und Link */}
              <div>
                <Label htmlFor="organizer" className="text-base font-medium">
                  Veranstalter
                </Label>
                <Input 
                  id="organizer"
                  name="organizer"
                  value={formData.organizer || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Name des Veranstalters"
                />
              </div>
              
              <div>
                <Label htmlFor="link" className="text-base font-medium">
                  Weblink
                </Label>
                <Input 
                  id="link"
                  name="link"
                  value={formData.link || ''}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="https://..."
                  type="url"
                />
              </div>
              
              {/* Beschreibung */}
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Beschreibung*
                </Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="mt-1"
                  rows={6}
                  placeholder="Ausführliche Beschreibung der Veranstaltung..."
                  required
                />
              </div>
              
              {/* Bild-Upload */}
              {renderImageInput()}
              
              {/* Featured */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured || false}
                    onChange={(e) => handleToggleChange('featured', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="featured">
                    Als hervorgehobene Veranstaltung markieren
                  </Label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
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
                ) : editId ? (
                  <div className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Aktualisieren
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    Erstellen
                  </div>
                )}
              </Button>
            </div>
          </form>
        </ContentContainer>
      </div>
    </>
  );
} 