"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Users, Phone, Mail, Globe, Baby, ChevronRight, Bike, Gamepad2 } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Preisliste Abenteuerland
const abenteuerlandPrices = [
  { category: "Kinder", type: "Tageskarte", price: "12,50€" },
  { category: "Kinder", type: "3er Karte*", price: "25,00€" },
  { category: "Erwachsene", type: "Tageskarte", price: "6,50€" },
  { category: "Erwachsene", type: "3er Karte", price: "13,00€" }
];

// Öffnungszeiten Abenteuerland 2025
const abenteuerlandOpeningHours = [
  { dates: "01.03.25, 15.03.25, 29.03.25", times: "13:00 Uhr bis 17:00 Uhr", description: "an den Tagen" },
  { dates: "05.04.25 bis zum 27.04.25", times: "12:00 Uhr bis 17:00 Uhr", description: "täglich" },
  { dates: "04.05.25 + 05.05.25", times: "12:00 Uhr bis 17:00 Uhr", description: "" },
  { dates: "10.05.25 + 11.05.25", times: "12:00 Uhr bis 17:00 Uhr", description: "" },
  { dates: "17.05.25 + 18.05.25", times: "12:00 Uhr bis 17:00 Uhr", description: "" },
  { dates: "24.05.25 + 25.05.25", times: "12:00 Uhr bis 17:00 Uhr", description: "" },
  { dates: "28.05.25 bis zum 01.06.25", times: "12:00 Uhr bis 17:00 Uhr", description: "täglich" },
  { dates: "07.06.25 bis zum 22.06.25", times: "12:00 Uhr bis 17:00 Uhr", description: "täglich" }
];

// Weitere Familienaktivitäten (Beispiele)
const moreActivities = [
  {
    title: "Naturzentrum Amrum",
    description: "Das Naturzentrum bietet interaktive Ausstellungen zum Wattenmeer und zur Natur Amrums. Regelmäßige Veranstaltungen speziell für Kinder machen diesen Ort zum idealen Ausflugsziel für Familien.",
    image: "/images/activities/naturzentrum-familie.webp"
  },
  {
    title: "Strandspaß für Familien",
    description: "Die weitläufigen Strände von Amrum bieten den perfekten Raum für Sandburgenbauen, Muschelsuchen und gemeinsame Spaziergänge.",
    image: "/images/activities/strand-familie.webp"
  },
  {
    title: "Wattwanderungen für Kinder",
    description: "Speziell auf Kinder zugeschnittene Wattwanderungen mit erfahrenen Guides, die spannende Einblicke in die Tierwelt des Wattenmeers geben.",
    image: "/images/activities/watt-kinder.webp"
  },
  {
    title: "Fahrradtouren mit der Familie",
    description: "Kinderfreundliche Fahrradtouren auf gut ausgebauten Radwegen durch die abwechslungsreiche Landschaft Amrums.",
    image: "/images/activities/fahrrad-familie.webp"
  }
];

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

export default function FamilyActivitiesPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/abenteuerland-hero.webp" // Idealerweise ein Bild vom Abenteuerland
          alt="Familienaktivitäten auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Familienaktivitäten auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie spannende Aktivitäten für die ganze Familie und unvergessliche Erlebnisse für Ihre Kinder
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
          <Link href="/urlaub" className="hover:text-gray-800 transition-colors">
            Urlaub
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/urlaub/aktivitaeten" className="hover:text-gray-800 transition-colors">
            Aktivitäten
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-800">Familienaktivitäten</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Urlaub mit Kindern auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Amrum ist ein ideales Urlaubsziel für Familien mit Kindern. Die Insel bietet zahlreiche Aktivitäten, 
            die sowohl bei Sonnenschein als auch bei Regenwetter für Spaß und Abwechslung sorgen. Von weitläufigen 
            Stränden über spannende Wattwanderungen bis hin zum großen Indoor-Spielplatz – hier ist für jede Altersgruppe etwas dabei.
          </p>
        </div>

        {/* Abenteuerland Amrum Feature Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-[350px] md:h-auto">
              <Image
                src="/images/activities/abenteuerland.webp"
                alt="Abenteuerland Amrum"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <Badge className="bg-green-100 text-green-800 mb-3">Highlight für Kinder</Badge>
              <h2 className="text-3xl font-bold mb-3">Abenteuerland Amrum</h2>
              <p className="text-gray-600 mb-6">
                Das Abenteuerland ist einer der größten und schönsten Indoor-Spielplätze in Nordfriesland. 
                Sport, Spiel und Spaß bei jedem Wetter für Kinder und Erwachsene von 1 bis mindestens 77 Jahren. 
                Tolle Spielgeräte zum Toben und Klettern erwarten euch auf über 1300qm Hallenfläche. 
                Alle Spielgeräte dürfen auch von Erwachsenen benutzt werden.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Gewerbegebiet Norddorf, 25946 Norddorf auf Amrum</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p>Telefon: 04682-968664</p>
                    <p>Handy: 0171-4849316</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <a href="mailto:abenteuerland@boyens-amrum.de" className="text-green-600 hover:underline">
                    abenteuerland@boyens-amrum.de
                  </a>
                </div>
                <div className="flex items-start">
                  <Gamepad2 className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Einmal Eintritt, alle Spielgeräte frei nutzen</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="https://boyens-amrum.de/abenteuerland-amrum/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    Website besuchen
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Abenteuerland Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Preisliste */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Preise Abenteuerland</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eintrittskarte</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preis</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {abenteuerlandPrices.map((item, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>*3er-Karten sind nicht übertragbar (Eine Person an 3 verschiedenen Tagen)</p>
              <p className="mt-2">Sonderrabatte für Schulklassen oder andere Gruppen auf Anfrage.</p>
              <p>Freier Eintritt für Geburtstagskinder und Kinder unter 2 Jahre.</p>
              <p className="mt-2 font-medium">Keine Kartenzahlung möglich!</p>
              <p className="mt-2">Autoscooter kosten extra: 3 Fahrten für 2,50 Euro.</p>
            </div>
          </div>
          
          {/* Besonderheiten & Hinweise */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Gut zu wissen</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Angebote vor Ort</h4>
                <p className="mb-2">Unser Kiosk hält kleine Snacks bereit.</p>
                <p>Schaut doch mal rein, und lasst euch überraschen. Einmal Eintritt bezahlen und alle Spielgeräte so oft ihr wollt frei benutzen.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Wichtiger Hinweis!</h4>
                <p>Das Abenteuerland ist ein überdachter Spielplatz. Unsere Heizung läuft auf Hochtouren, dennoch ist sie nicht dafür ausgelegt die Halle auf Wohnzimmertemperatur zu heizen. Gerade in den Wintermonaten bleibt es frisch in der Halle. Bitte dementsprechende Kleidung mitnehmen.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Öffnungszeiten */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h3 className="text-xl font-bold mb-6">Öffnungszeiten 2025</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zeitraum</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Öffnungszeiten</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hinweis</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {abenteuerlandOpeningHours.map((item, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dates}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.times}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weitere Familienaktivitäten */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Weitere Aktivitäten für Familien</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {moreActivities.map((activity, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{activity.title}</h4>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Naturzentrum Info */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Naturzentrum Amrum</h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="/images/activities/naturzentrum.webp"
                  alt="Naturzentrum Amrum"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <h3 className="text-xl font-bold mb-3">Familienfreundliches Naturerlebnis</h3>
                <p className="text-gray-700 mb-4">
                  Das Naturzentrum Amrum bietet für Familien mit Kindern spannende Einblicke in die vielfältige 
                  Tier- und Pflanzenwelt der Insel. Mit interaktiven Ausstellungen, kindgerechten Führungen 
                  und speziellen Veranstaltungen ist es der ideale Ort, um die Natur Amrums zu entdecken.
                </p>
                <p className="text-gray-700 mb-4">
                  Regelmäßig finden hier Workshops und Aktivitäten speziell für Kinder statt, bei denen 
                  sie spielerisch die Umwelt erforschen können. Ein Besuch im Naturzentrum ist besonders 
                  an Regentagen eine tolle Alternative zum Strand.
                </p>
                
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <span><strong>April bis Oktober:</strong> täglich außer Do, 10:00 - 17:00 Uhr</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <span><strong>November bis März:</strong> Mi | Fr | Sa | So, 12:00 - 16:00 Uhr</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <span>Strunwai 31, 25946 Norddorf auf Amrum</span>
                  </div>
                </div>
                
                <Button asChild>
                  <Link href="/urlaub/aktivitaeten/natur">Mehr erfahren</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Planen Sie Ihren Familienurlaub auf Amrum</h3>
          <p className="text-gray-600 mb-4">
            Amrum bietet eine Vielzahl an Aktivitäten für Familien mit Kindern jeden Alters. 
            Das Abenteuerland ist besonders bei Regenwetter eine hervorragende Option für gemeinsames Spielen und Toben.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/urlaub/unterkuenfte">Familienunterkünfte entdecken</Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 