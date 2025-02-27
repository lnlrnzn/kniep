# Kniep Haus auf Amrum Website

Eine moderne Website für das Kniep Haus auf Amrum, entwickelt mit Next.js, React und Tailwind CSS.

## Funktionen

- Responsive Design für alle Geräte
- Moderne UI mit Animationen
- Blog-System mit JSON-Daten
- Restaurant-Verzeichnis mit JSON-Daten
- SEO-optimiert
- Barrierefreiheit nach WCAG-Richtlinien

## Technologien

- [Next.js 14](https://nextjs.org/) - React Framework
- [React 19](https://react.dev/) - JavaScript-Bibliothek
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animationsbibliothek
- [Radix UI](https://www.radix-ui.com/) - Barrierefreie UI-Komponenten

## Erste Schritte

### Voraussetzungen

- Node.js 18.17 oder höher
- npm oder yarn

### Installation

1. Repository klonen
   ```bash
   git clone <repository-url>
   cd kniepwebsite
   ```

2. Abhängigkeiten installieren
   ```bash
   npm install
   # oder
   yarn install
   ```

3. Umgebungsvariablen konfigurieren (optional)
   - Kopieren Sie `.env.example` zu `.env.local`
   - Passen Sie die Werte nach Bedarf an

4. Entwicklungsserver starten
   ```bash
   npm run dev
   # oder
   yarn dev
   ```

5. Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser

## Content-Management

Die Website verwendet einfache JSON-Dateien zur Speicherung von Inhalten, was eine leichte Verwaltung ohne externe Dienste ermöglicht.

### Datenstruktur

Die Inhalte sind in den folgenden Dateien organisiert:

- `app/data/restaurants.json` - Restaurantdaten
- `app/data/blog-posts.json` - Blog-Beiträge

### Restaurant-Daten bearbeiten

Um Restaurantinformationen zu bearbeiten oder hinzuzufügen:

1. Öffnen Sie die Datei `app/data/restaurants.json`
2. Folgen Sie der bestehenden Struktur für neue Einträge
3. Speichern Sie Bilder im Verzeichnis `public/images/restaurants/`

### Blog-Beiträge bearbeiten

Um Blog-Beiträge zu bearbeiten oder hinzuzufügen:

1. Öffnen Sie die Datei `app/data/blog-posts.json`
2. Folgen Sie der bestehenden Struktur für neue Einträge
3. Speichern Sie Bilder im Verzeichnis `public/images/blog/`
4. Verwenden Sie Markdown-Syntax für den Beitragsinhalt

## Deployment

Die Website kann auf verschiedenen Plattformen bereitgestellt werden:

### Vercel (empfohlen)

1. Pushen Sie Ihren Code zu GitHub
2. Importieren Sie das Repository in [Vercel](https://vercel.com)
3. Vercel erkennt automatisch Next.js und konfiguriert die Build-Einstellungen
4. Fügen Sie bei Bedarf die Umgebungsvariablen in den Vercel-Projekteinstellungen hinzu

### Netlify

1. Pushen Sie Ihren Code zu GitHub
2. Importieren Sie das Repository in [Netlify](https://netlify.com)
3. Konfigurieren Sie die Build-Einstellungen:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Fügen Sie bei Bedarf die Umgebungsvariablen in den Netlify-Projekteinstellungen hinzu

## Wartung und Updates

- Regelmäßig `npm update` ausführen, um Abhängigkeiten zu aktualisieren
- Inhalte direkt in den JSON-Dateien aktualisieren
- Änderungen über Git verfolgen
- Neue Funktionen in separaten Branches entwickeln und über Pull Requests zusammenführen

## Lizenz

Dieses Projekt ist urheberrechtlich geschützt. Alle Rechte vorbehalten.
