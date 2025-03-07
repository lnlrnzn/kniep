import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// Lokaler Pfad als Fallback
const DATA_PATH = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_PATH, 'events.json');

// JSONbin Konfiguration
const JSONBIN_ID = '67ca9911ad19ca34f817f9c8';
const JSONBIN_API = 'https://api.jsonbin.io/v3/b';
const JSONBIN_MASTER_KEY = '$2a$10$gGkZOcIzbQJqiv.k64AGnuHPfZHa4.djTtqtLlKSzVDoHJ7ErzwEq';

// JSONbin ist wieder aktiviert, da wir keine großen Bilder mehr haben
const useLocalOnly = false;

// Stelle sicher, dass das Verzeichnis existiert
async function ensureDirectoryExists() {
  try {
    await fsPromises.mkdir(DATA_PATH, { recursive: true });
    return true;
  } catch (error) {
    console.error('Error creating data directory:', error);
    throw error;
  }
}

// Lade Daten aus Datei (als Fallback)
async function readData() {
  await ensureDirectoryExists();
  
  try {
    // Wenn die Datei existiert, lese sie ein
    if (fs.existsSync(DATA_FILE)) {
      const raw = await fsPromises.readFile(DATA_FILE, 'utf8');
      try {
        return JSON.parse(raw);
      } catch (parseError) {
        console.error('JSON Parse-Fehler:', parseError);
        // Bei beschädigter JSON-Datei erstellen wir eine neue
        const initialData = { events: [], locations: [] };
        await fsPromises.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
      }
    }
    
    // Erstelle leere Datei, falls sie nicht existiert
    const initialData = { events: [], locations: [] };
    await fsPromises.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  } catch (error) {
    console.error('Error reading data file:', error);
    return { events: [], locations: [] };
  }
}

// Speichere Daten in Datei (als Fallback)
async function writeData(data: any) {
  await ensureDirectoryExists();
  
  try {
    // Stelle sicher, dass wir ein valides Datenformat haben
    const validData = {
      events: Array.isArray(data.events) ? data.events : [],
      locations: Array.isArray(data.locations) ? data.locations : []
    };
    
    // Formatiere den JSON-String schön für bessere Lesbarkeit
    await fsPromises.writeFile(DATA_FILE, JSON.stringify(validData, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data file:', error);
    throw error;
  }
}

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

// Zugriff auf JSONbin
async function fetchFromJSONbin() {
  if (useLocalOnly) {
    throw new Error('JSONbin access disabled, using local storage only');
  }
  
  try {
    console.log(`Fetching data from JSONbin: ${JSONBIN_API}/${JSONBIN_ID}/latest`);
    
    const response = await fetch(`${JSONBIN_API}/${JSONBIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY,
        'X-Bin-Meta': 'false' // Wir möchten nur die Daten, nicht die Metadaten
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`JSONbin API returned status ${response.status}: ${errorText}`);
    }
    
    // Wenn X-Bin-Meta: false gesetzt ist, gibt JSONbin direkt die Daten zurück
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching from JSONbin:', error);
    throw error;
  }
}

// Dualer Zugriff: Zuerst versuche JSONbin, dann lokale Datei
async function getData() {
  // Zuerst versuchen, Daten von JSONbin zu holen
  if (!useLocalOnly) {
    try {
      const data = await fetchFromJSONbin();
      // Daten auch lokal speichern für Backup
      await writeData(data);
      return { data, source: 'jsonbin' };
    } catch (error) {
      console.warn('JSONbin access failed, falling back to local storage:', error);
      // Bei Fehlern auf lokale Datei zurückgreifen
    }
  }
  
  // Lokale Datei als Fallback
  const data = await readData();
  return { data, source: 'local' };
}

// Schreibe Daten zu JSONbin
async function saveToJSONbin(data: any) {
  try {
    console.log('Sending data to JSONbin');
    
    const response = await fetch(`${JSONBIN_API}/${JSONBIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_MASTER_KEY,
        'X-Bin-Versioning': 'false' // Keine neuen Versionen erstellen
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`JSONbin update failed with status ${response.status}: ${errorText}`);
      throw new Error(`JSONbin update failed with status ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Update to JSONbin successful');
    return result.record || result;
  } catch (error: any) {
    console.error('Error writing to JSONbin:', error);
    throw error;
  }
}

// Dualer Schreibzugriff: Versuche JSONbin zu aktualisieren, speichere immer lokal
async function saveData(newData: any) {
  // Immer in lokaler Datei speichern (Sicherheit)
  await writeData(newData);
  
  // Wenn JSONbin aktiviert ist, versuchen wir dort auch zu speichern
  if (!useLocalOnly) {
    try {
      const jsonbinData = await saveToJSONbin(newData);
      return { data: jsonbinData, source: 'jsonbin' };
    } catch (error) {
      console.warn('JSONbin update failed, data saved only locally:', error);
      // Bei Fehlern haben wir immer noch die lokale Kopie
    }
  }
  
  // Lokales Speichern als Fallback hat oben bereits stattgefunden
  return { data: newData, source: 'local' };
}

export async function GET() {
  try {
    const { data, source } = await getData();
    return NextResponse.json({
      ...data,
      _meta: { source }
    });
  } catch (error: any) {
    // Wenn wir hier landen, sind beide Methoden fehlgeschlagen
    return errorResponse('Failed to fetch data from any source', error);
  }
}

export async function POST(request: Request) {
  try {
    // Body der Anfrage abrufen
    const body = await request.json();
    console.log('Received data to update:', Object.keys(body));
    
    // Aktuelle Daten abrufen
    let currentData = { events: [], locations: [] };
    try {
      const result = await getData();
      currentData = result.data;
    } catch (error) {
      console.warn('Could not fetch existing data, will create new record');
    }
    
    // Daten zusammenführen
    const mergedData = { 
      // Behalte bestehende Daten bei
      events: Array.isArray(currentData.events) ? [...currentData.events] : [],
      locations: Array.isArray(currentData.locations) ? [...currentData.locations] : [],
      
      // Überschreibe mit neuen Daten, falls vorhanden
      ...(body.events ? { events: body.events } : {}),
      ...(body.locations ? { locations: body.locations } : {})
    };
    
    console.log('Saving data', { 
      source: useLocalOnly ? 'local only' : 'jsonbin+local',
      eventCount: mergedData.events?.length || 0,
      locationCount: mergedData.locations?.length || 0
    });
    
    // Daten speichern
    const { data: savedData, source } = await saveData(mergedData);
    
    return NextResponse.json({ 
      success: true, 
      data: savedData,
      _meta: { 
        source,
        eventCount: savedData.events?.length || 0,
        locationCount: savedData.locations?.length || 0
      }
    });
  } catch (error: any) {
    return errorResponse('Error updating data', error);
  }
}