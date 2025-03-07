"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Users, Phone, Mail, Globe, Baby, ChevronRight, Bike, Gamepad2, Search } from "lucide-react";
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

// Öffnungszeiten AmrumBadeland
const badelandOpeningHours = [
  { day: "Montag", wellenbad: "Ruhetag", sauna: "Ruhetag", note: "" },
  { day: "Dienstag", wellenbad: "Ruhetag", sauna: "Ruhetag", note: "" },
  { day: "Mittwoch", wellenbad: "13:00 - 18:00 Uhr", sauna: "13:00 - 20:00 Uhr", note: "" },
  { day: "Donnerstag", wellenbad: "13:00 - 18:00 Uhr", sauna: "13:00 - 20:00 Uhr", note: "Familiensauna" },
  { day: "Freitag", wellenbad: "13:00 - 18:00 Uhr", sauna: "13:00 - 20:00 Uhr", note: "" },
  { day: "Samstag", wellenbad: "12:00 - 18:00 Uhr", sauna: "12:00 - 18:00 Uhr", note: "" },
  { day: "Sonntag", wellenbad: "12:00 - 18:00 Uhr", sauna: "12:00 - 18:00 Uhr", note: "Familiensauna" }
];

// Preisliste AmrumBadeland (Wellenbad)
const badelandPrices = [
  { category: "Erwachsene (ab 18 Jahre)", type: "Erste Stunde", price: "8,50 €", price_reduced: "6,90 €" },
  { category: "Erwachsene (ab 18 Jahre)", type: "Je weitere Stunde", price: "3,50 €", price_reduced: "2,80 €" },
  { category: "Erwachsene (ab 18 Jahre)", type: "Tageskarte", price: "19,00 €", price_reduced: "15,50 €" },
  { category: "Kinder (3-18 Jahre)", type: "Erste Stunde", price: "6,50 €", price_reduced: "5,50 €" },
  { category: "Kinder (3-18 Jahre)", type: "Je weitere Stunde", price: "2,50 €", price_reduced: "2,00 €" },
  { category: "Kinder (3-18 Jahre)", type: "Tageskarte", price: "14,00 €", price_reduced: "11,50 €" },
  { category: "Familie (Eltern + 1 Kind)", type: "Erste Stunde", price: "21,50 €", price_reduced: "18,10 €" },
  { category: "Familie (Eltern + 1 Kind)", type: "Je weitere Stunde", price: "8,50 €", price_reduced: "6,80 €" },
  { category: "Familie (Eltern + 1 Kind)", type: "Tageskarte", price: "47,00 €", price_reduced: "38,50 €" },
  { category: "Familie (Eltern + 2 Kinder)", type: "Erste Stunde", price: "23,00 €", price_reduced: "19,60 €" },
  { category: "Familie (Eltern + 2 Kinder)", type: "Je weitere Stunde", price: "8,50 €", price_reduced: "6,80 €" },
  { category: "Familie (Eltern + 2 Kinder)", type: "Tageskarte", price: "48,50 €", price_reduced: "40,00 €" }
];

// Familienaktivitäten-Liste
const familyActivities = [
  {
    id: "abenteuerland",
    title: "Abenteuerland - Indoorspielplatz",
    shortDescription: "Der Indoor-Spielplatz mit 1000 qm Spielfläche für Kinder jeden Alters - ideal bei Regenwetter!",
    image: "/images/activities/amrum-abenteuerland-norddorf.webp",
    location: "Strunwai 2, Norddorf auf Amrum"
  },
  {
    id: "badeland",
    title: "Amrum Badeland - Spaß für die ganze Familie",
    shortDescription: "Wellenbad mit 28-30°C Wassertemperatur, Massagedüsen, Kinderbecken und Rutsche für Badespaß bei jedem Wetter.",
    image: "/images/badeland.webp",
    location: "Am Schwimmbad 1, Wittdün auf Amrum"
  },
  {
    id: "naturzentrum",
    title: "Naturzentrum Amrum",
    shortDescription: "Interaktive Ausstellungen zum Wattenmeer und zur Natur Amrums mit speziellen Veranstaltungen für Kinder.",
    image: "/images/activities/amrum-naturschutzzentrum.webp",
    location: "Strunwai 31, Norddorf auf Amrum"
  }
];

// Weitere Familienaktivitäten (Beispiele)
const moreActivities = [
  {
    title: "Naturzentrum Amrum",
    description: "Das Naturzentrum bietet interaktive Ausstellungen zum Wattenmeer und zur Natur Amrums. Regelmäßige Veranstaltungen speziell für Kinder machen diesen Ort zum idealen Ausflugsziel für Familien.",
    image: "/images/activities/amrum-naturschutzzentrum.webp"
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
          src="/images/activities/familie-hero.webp"
          alt="Familienaktivitäten auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Familienaktivitäten auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie vielfältige Freizeitangebote für Familien mit Kindern jeden Alters
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
          <h2 className="text-2xl font-bold mb-4">Familienfreundliche Aktivitäten auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Amrum bietet eine Vielzahl an Aktivitäten für Familien mit Kindern jeden Alters. 
            Von Indoor-Spielplätzen über Schwimmbäder bis hin zu Naturerlebnissen - hier kommt keine Langeweile auf. 
            Besonders bei schlechtem Wetter sind die vielfältigen Indoor-Angebote eine willkommene Abwechslung zum Strandurlaub.
          </p>
        </div>

        {/* Übersicht der Hauptaktivitäten als Karten */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hauptattraktionen für Familien</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {familyActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                  <div className="flex items-start text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0 text-blue-600" />
                    <span>{activity.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{activity.shortDescription}</p>
                  <Button asChild className="w-full">
                    <a href={`#${activity.id}`}>Details anzeigen</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detaillierte Informationen zu jeder Aktivität */}
        <div className="mb-12">
          <Tabs defaultValue="abenteuerland" className="w-full">
            <div className="sticky top-0 z-10 bg-white py-3 border-b mb-6">
              <h2 className="text-2xl font-bold mb-4">Detaillierte Informationen</h2>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="abenteuerland">Abenteuerland</TabsTrigger>
                <TabsTrigger value="badeland">Amrum Badeland</TabsTrigger>
                <TabsTrigger value="naturzentrum">Naturzentrum</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Abenteuerland */}
            <TabsContent value="abenteuerland" id="abenteuerland">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src="/images/activities/amrum-abenteuerland-norddorf.webp"
                      alt="Abenteuerland Amrum"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-xl font-bold mb-3">Abenteuerland - Indoor-Spielplatz</h3>
                    <p className="text-gray-700 mb-4">
                      Das Abenteuerland auf Amrum ist ein Indoor-Spielplatz, der auf einer Fläche von rund 1000 qm Spielspaß für Kinder jeden Alters bietet. Besonders an Regentagen ist das Abenteuerland ein beliebtes Ausflugsziel für Familien mit Kindern.
                    </p>
                    
                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Strunwai 2, 25946 Norddorf auf Amrum</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Phone className="w-5 h-5 text-blue-600 mr-2" />
                        <span>04682-94290</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Mail className="w-5 h-5 text-blue-600 mr-2" />
                        <span>info@abenteuerland-amrum.de</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Öffnungszeiten & Preise */}
              <Tabs defaultValue="oeffnungszeiten" className="mb-6">
                <TabsList>
                  <TabsTrigger value="oeffnungszeiten">Öffnungszeiten</TabsTrigger>
                  <TabsTrigger value="preise">Preise</TabsTrigger>
                </TabsList>
                
                <TabsContent value="oeffnungszeiten" className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-lg font-semibold mb-4">Öffnungszeiten Abenteuerland 2025</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Zeitraum</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Öffnungszeiten</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Hinweis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {abenteuerlandOpeningHours.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border-b border-gray-200 py-2 px-3">{item.dates}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.times}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="preise" className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-lg font-semibold mb-4">Preisliste Abenteuerland</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Kategorie</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Ticketart</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Preis</th>
                        </tr>
                      </thead>
                      <tbody>
                        {abenteuerlandPrices.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border-b border-gray-200 py-2 px-3">{item.category}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.type}</td>
                            <td className="border-b border-gray-200 py-2 px-3 font-medium">{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* AmrumBadeland */}
            <TabsContent value="badeland" id="badeland">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src="/images/badeland.webp"
                      alt="Amrum Badeland"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-xl font-bold mb-3">Wellenbad mit Wohlfühlgarantie</h3>
                    <p className="text-gray-700 mb-4">
                      Jede halbe Stunde machen wir die Welle. Das ist Badespass pur, bei 28-30 Grad Wassertemperatur.
                      Dazu Massagedüsen, Sitzsprudler, Sprudelliegen und Nackenduschen.
                      Die Kleinen planschen bei 28-30 Grad im Kinderbecken oder sausen durch die Schlangenrutsche.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <p className="text-sm text-blue-800">
                        <strong>Hinweis:</strong> 20% Rabatt bei Vorlage der gültigen Gastkarte (Insulaner Personalausweis) auf die Eintrittspreise.
                        Gilt nicht für Mehrwertkarten oder bereits rabattierte Eintritte.
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                        <span>Am Schwimmbad 1, 25946 Wittdün auf Amrum</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Phone className="w-5 h-5 text-blue-600 mr-2" />
                        <span>04682-943431</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Mail className="w-5 h-5 text-blue-600 mr-2" />
                        <span>info@amrum-badeland.de</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Öffnungszeiten & Preise des Badelands */}
              <Tabs defaultValue="oeffnungszeiten" className="mb-6">
                <TabsList>
                  <TabsTrigger value="oeffnungszeiten">Öffnungszeiten</TabsTrigger>
                  <TabsTrigger value="preise">Preise</TabsTrigger>
                </TabsList>
                
                <TabsContent value="oeffnungszeiten" className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-lg font-semibold mb-4">Öffnungszeiten AmrumBadeland (06.01.2025 bis 12.04.2025)</h4>
                  <p className="text-gray-600 mb-2">Wellenbetrieb von 45min nach Öffnung bis eine Std. vor Schließung. Letzter Einlass: 1 Stunde vor Schließung</p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Wochentag</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Wellenbad</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Saunalandschaft</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Anmerkung</th>
                        </tr>
                      </thead>
                      <tbody>
                        {badelandOpeningHours.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border-b border-gray-200 py-2 px-3 font-medium">{item.day}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.wellenbad}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.sauna}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-500 text-sm mt-3">Änderungen vorbehalten. Bitte beachten Sie die Aushänge an der Kasse.</p>
                </TabsContent>
                
                <TabsContent value="preise" className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-lg font-semibold mb-4">Preisliste AmrumBadeland - Wellenbad</h4>
                  <p className="text-sm text-gray-600 mb-4">Alle Preise inkl. 1,50 € Energiepauschale. Ermäßigte Preise (in Klammern) mit gültiger Gastkarte.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Kategorie</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Ticketart</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Normalpreis</th>
                          <th className="border-b border-gray-200 py-2 px-3 text-left">Ermäßigt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {badelandPrices.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border-b border-gray-200 py-2 px-3">{item.category}</td>
                            <td className="border-b border-gray-200 py-2 px-3 font-medium">{item.type}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.price}</td>
                            <td className="border-b border-gray-200 py-2 px-3">{item.price_reduced}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700"><strong>Kindergruppen:</strong> 8,00 €/2h (6,70 €/2h) pro Kind (Gruppen nur mit Anmeldung)</p>
                    <p className="text-gray-700"><strong>Wellenbad + Sauna:</strong> Für Familien mit Kindern gibt es auch kombinierte Tickets. Kinder nur in Begleitung eines Erwachsenen.</p>
                    <p className="text-gray-500 text-sm mt-2">Änderungen vorbehalten. Aktuelle Preise erhalten Sie an der Kasse.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Naturzentrum */}
            <TabsContent value="naturzentrum" id="naturzentrum">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src="/images/activities/amrum-naturschutzzentrum.webp"
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
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Weitere Aktivitäten */}
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
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Planen Sie Ihren Familienurlaub auf Amrum</h3>
          <p className="text-gray-600 mb-4">
            Amrum bietet eine Vielzahl an Aktivitäten für Familien mit Kindern jeden Alters. 
            Bei schlechtem Wetter sind das Abenteuerland und das Amrum Badeland hervorragende Optionen für gemeinsames Spielen und Toben.
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