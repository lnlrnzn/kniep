// Event-Typdefinition
export interface Event {
  id: string;            // Eindeutige ID für Routing
  title: string;         // Event-Titel
  date: string;          // Datum im Format "YYYY-MM-DD"
  time?: string;         // Uhrzeit (optional)
  location: string;      // Ort
  description: string;   // Beschreibung
  image?: string;        // Bild-URL (optional)
  category?: string;     // Kategorie (optional)
  link?: string;         // Externe Link (optional)
  organizer?: string;    // Veranstalter (optional)
  featured?: boolean;    // Hervorgehoben (optional)
}

// Event-Daten
export const events: Event[] = [
  {
    id: "sommerfest-2025",
    title: "Sommerfest Amrum",
    date: "2025-07-15",
    time: "14:00 - 22:00 Uhr",
    location: "Kurplatz Nebel",
    description: "Das jährliche Sommerfest in Nebel mit Live-Musik, regionalen Spezialitäten und einem bunten Programm für die ganze Familie. Erleben Sie traditionelle friesische Tänze, probieren Sie lokale Köstlichkeiten und genießen Sie die einzigartige Atmosphäre auf Amrum.",
    image: "/images/events/sommerfest.webp",
    category: "Fest",
    organizer: "Gemeinde Nebel",
    featured: true
  },
  {
    id: "wattwanderung-juli",
    title: "Geführte Wattwanderung",
    date: "2025-07-20",
    time: "10:30 - 12:30 Uhr",
    location: "Treffpunkt: Wittdün Fähranleger",
    description: "Entdecken Sie das Wattenmeer bei einer fachkundigen Führung. Lernen Sie die einzigartige Flora und Fauna des UNESCO-Weltnaturerbes kennen und erfahren Sie mehr über Ebbe und Flut. Bitte denken Sie an festes Schuhwerk und wetterfeste Kleidung.",
    image: "/images/events/wattwanderung.webp",
    category: "Natur",
    organizer: "Naturschutzverein Amrum",
    link: "https://www.naturschutzverein-amrum.de/wattwanderungen"
  },
  {
    id: "konzert-norddorf",
    title: "Kammerkonzert in der St. Clemens Kirche",
    date: "2025-08-05",
    time: "19:00 Uhr",
    location: "St. Clemens Kirche, Norddorf",
    description: "Ein besonderer Abend mit klassischer Musik in der historischen St. Clemens Kirche. Das Hamburger Streichquartett präsentiert Werke von Beethoven, Mozart und Brahms. Die ausgezeichnete Akustik der Kirche verspricht ein unvergessliches Klangerlebnis.",
    image: "/images/events/konzert.webp",
    category: "Kultur",
    organizer: "Kulturverein Amrum",
    link: "https://www.kulturverein-amrum.de/konzerte"
  },
  {
    id: "leuchtturmtag",
    title: "Tag des offenen Leuchtturms",
    date: "2025-08-18",
    time: "11:00 - 16:00 Uhr",
    location: "Leuchtturm Amrum",
    description: "Besuchen Sie den Amrumer Leuchtturm und genießen Sie einen atemberaubenden Blick über die Insel und das Wattenmeer. Erfahren Sie mehr über die Geschichte des Leuchtturms und seine Bedeutung für die Schifffahrt. Führungen werden stündlich angeboten.",
    image: "/images/events/leuchtturm.webp",
    category: "Besichtigung",
    featured: true
  }
];

// Hilfsfunktion zum Finden eines Events anhand seiner ID
export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

// Hilfsfunktion zum Filtern von Events nach Kategorie
export function getEventsByCategory(category: string): Event[] {
  return events.filter(event => event.category === category);
}

// Hilfsfunktion zum Abrufen hervorgehobener Events
export function getFeaturedEvents(): Event[] {
  return events.filter(event => event.featured);
}

// Hilfsfunktion zum Sortieren von Events nach Datum
export function getSortedEvents(): Event[] {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
} 