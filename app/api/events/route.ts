import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase Konfiguration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://reaozizszypvthyptnjx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlYW96aXpzenlwdnRoeXB0bmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMzU0MTEsImV4cCI6MjA1NjkxMTQxMX0.wKy-eZOmweYMiHYw9HKC0NkP-Avz7FeLHVHzeAGE8B0';

// Erstellen des Supabase-Clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Hilfsfunktion für einheitliche Fehlerbehandlung
function errorResponse(message: string, error: any, status: number = 500) {
  console.error(`API Fehler: ${message}`, error);
  
  // Stelle sicher, dass wir keine Zirkelreferenzen haben, die JSON.stringify problematisch machen
  let errorDetails = error?.message || 'Unbekannter Fehler';
  
  try {
    // Versuche eine JSON-Antwort zu erstellen
    return NextResponse.json(
      { 
        error: message,
        details: errorDetails,
        status
      },
      { status }
    );
  } catch (jsonError) {
    // Wenn JSON.stringify fehlschlägt, sende einen einfachen String zurück
    console.error('Fehler beim Erstellen der JSON-Antwort:', jsonError);
    return new NextResponse(
      `{"error":"${message}","details":"Fehler beim Verarbeiten der Fehlerantwort"}`,
      { 
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Types für die Datenstrukturen
interface OpeningPeriod {
  id?: number;
  location_id: string;
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
  periods?: OpeningPeriod[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  image?: string;
  category?: string;
  organizer?: string;
  featured?: boolean;
  link?: string;
}

// Events aus Supabase abrufen
async function getEvents() {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return events || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Events:', error);
    throw error;
  }
}

// Locations und Opening Periods aus Supabase abrufen
async function getLocations() {
  try {
    // Zuerst alle Locations abrufen
    const { data: locations, error: locationsError } = await supabase
      .from('locations')
      .select('*');
    
    if (locationsError) throw locationsError;
    
    // Dann für jede Location die zugehörigen Opening Periods abrufen
    if (locations && locations.length > 0) {
      for (const location of locations) {
        const { data: periods, error: periodsError } = await supabase
          .from('opening_periods')
          .select('*')
          .eq('location_id', location.id);
        
        if (periodsError) throw periodsError;
        location.periods = periods || [];
      }
    }
    
    return locations || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Locations:', error);
    throw error;
  }
}

// Events in Supabase aktualisieren oder erstellen
async function saveEvents(events: Event[]) {
  try {
    // Alle alten Events löschen
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .neq('id', 'dummy'); // Trick, um alle Zeilen zu löschen
    
    if (deleteError) throw deleteError;
    
    // Neue Events einfügen
    if (events && events.length > 0) {
      const { data, error: insertError } = await supabase
        .from('events')
        .insert(events)
        .select();
      
      if (insertError) throw insertError;
      return data;
    }
    
    return [];
  } catch (error) {
    console.error('Fehler beim Speichern der Events:', error);
    throw error;
  }
}

// Locations und Opening Periods in Supabase aktualisieren oder erstellen
async function saveLocations(locations: Location[]) {
  try {
    // Alle alten Locations löschen (kaskadiert zu den Periods durch Foreign Key Constraint)
    const { error: deleteError } = await supabase
      .from('locations')
      .delete()
      .neq('id', 'dummy'); // Trick, um alle Zeilen zu löschen
    
    if (deleteError) throw deleteError;
    
    // Neue Locations einfügen
    if (locations && locations.length > 0) {
      for (const location of locations) {
        const periods = location.periods || [];
        delete location.periods;
        
        // Location einfügen
        const { data: insertedLocation, error: locationError } = await supabase
          .from('locations')
          .insert(location)
          .select()
          .single();
        
        if (locationError) throw locationError;
        
        // Opening Periods für diese Location einfügen
        if (periods.length > 0) {
          const periodsWithLocationId = periods.map((period: OpeningPeriod) => ({
            ...period,
            location_id: insertedLocation.id
          }));
          
          const { error: periodsError } = await supabase
            .from('opening_periods')
            .insert(periodsWithLocationId);
          
          if (periodsError) throw periodsError;
        }
      }
    }
    
    // Alle Locations mit ihren Periods zurückgeben
    return await getLocations();
  } catch (error) {
    console.error('Fehler beim Speichern der Locations:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Parallel Anfragen für Events und Locations
    const [events, locations] = await Promise.all([
      getEvents(),
      getLocations()
    ]);
    
    return NextResponse.json({
      events,
      locations,
      _meta: { source: 'supabase' }
    });
  } catch (error) {
    return errorResponse('Fehler beim Abrufen der Daten aus Supabase', error);
  }
}

export async function POST(request: Request) {
  try {
    // Body der Anfrage abrufen
    const body = await request.json();
    console.log('Empfangene Daten zum Aktualisieren:', Object.keys(body));
    
    const results: { events?: any; locations?: any } = {};
    let saveOperationsPerformed = false;
    
    // Nur die Daten aktualisieren, die im Request enthalten sind
    if (body.events) {
      results.events = await saveEvents(body.events);
      saveOperationsPerformed = true;
    }
    
    if (body.locations) {
      results.locations = await saveLocations(body.locations);
      saveOperationsPerformed = true;
    }
    
    // Wenn keine Daten zum Speichern übergeben wurden
    if (!saveOperationsPerformed) {
      return NextResponse.json({ 
        message: 'Keine Daten zum Aktualisieren übermittelt',
        _meta: { source: 'supabase' }
      });
    }
    
    return NextResponse.json({ 
      ...results,
      _meta: { source: 'supabase' }
    });
  } catch (error) {
    return errorResponse('Fehler beim Speichern der Daten in Supabase', error);
  }
}