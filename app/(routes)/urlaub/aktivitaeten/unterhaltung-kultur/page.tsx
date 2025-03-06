"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ChevronRight, Film, Clock, Calendar, Music, Ticket, Info } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

// Unterhaltungs- und Kulturangebote
const kulturAngebote = [
  {
    id: "kino",
    title: "Kino Amrum",
    description: "Modernes Kino mit zwei klimatisierten Sälen und neuestem Filmprogramm. Ein besonderes Filmerlebnis im Herzen von Norddorf.",
    icon: <Film className="h-6 w-6" />,
    image: "/images/activities/kino-aussen.webp",
    address: "Triihuk 1, 25946 Norddorf auf Amrum",
    phone: "04682-96200",
    website: "https://kino-amrum.de/",
    details: [
      "Modernste digitale Projektionstechnik, auch für 3D-Filme",
      "Zwei klimatisierte Kinosäle mit 102 und 57 Sitzplätzen",
      "Gemütliche Doppelsessel für Paare",
      "Einladendes Foyer mit Bistrotischen",
      "Frisches Popcorn, edle Weine und Erfrischungen",
      "Wöchentlich aktualisiertes Filmprogramm"
    ]
  },
  // Platzhalter für weitere Angebote (können später ergänzt werden)
  {
    id: "veranstaltungen",
    title: "Veranstaltungen",
    description: "Konzerte, Lesungen, Ausstellungen und mehr - auf Amrum gibt es das ganze Jahr über ein vielfältiges Kulturprogramm.",
    icon: <Calendar className="h-6 w-6" />,
    image: "/images/activities/veranstaltungen.webp",
    details: [
      "Regelmäßige kulturelle Veranstaltungen in den Gemeinden",
      "Saisonale Feste und traditionelle Feiern",
      "Live-Musik in ausgewählten Lokalen",
      "Kunstausstellungen lokaler und überregionaler Künstler",
      "Vorträge zu Inselthemen und Naturschutz"
    ]
  },
  {
    id: "musik",
    title: "Musik & Theater",
    description: "Von klassischen Konzerten bis hin zu modernen Theaterinszenierungen - auf Amrum erleben Sie kulturelle Vielfalt in einzigartiger Atmosphäre.",
    icon: <Music className="h-6 w-6" />,
    image: "/images/activities/musik-theater.webp",
    details: [
      "Konzerte in historischen Kirchen mit besonderer Akustik",
      "Freilichtveranstaltungen in den Sommermonaten",
      "Aufführungen lokaler Theatergruppen",
      "Gastspiele bekannter Künstler",
      "Familienfreundliche Programme für alle Altersgruppen"
    ]
  }
];

export default function UnterhaltungKulturPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/kultur-hero.webp"
          alt="Unterhaltung auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Unterhaltung</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie die vielfältigen kulturellen Angebote und Unterhaltungsmöglichkeiten auf Amrum
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
          <span className="text-gray-800">Unterhaltung</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Kulturelles Erleben auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Auch wenn Amrum vor allem für seine natürliche Schönheit bekannt ist, bietet die Insel ein 
            vielfältiges kulturelles Angebot. Von modernem Kino über traditionelle Veranstaltungen bis hin zu 
            Konzerten und Theateraufführungen – hier finden Sie zahlreiche Möglichkeiten, Ihre Freizeit zu gestalten 
            und in das kulturelle Leben der Insel einzutauchen.
          </p>
          <p className="text-gray-600">
            Besonders an Regentagen bieten die kulturellen Einrichtungen eine willkommene Abwechslung und sorgen 
            für unvergessliche Erlebnisse für die ganze Familie.
          </p>
        </div>

        {/* Kino Feature Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-[350px] md:h-auto">
              <Image
                src="/images/activities/kino-aussen.webp"
                alt="Kino Amrum"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <Badge className="bg-purple-100 text-purple-800 mb-3">Kinoerlebnis auf Amrum</Badge>
              <h2 className="text-3xl font-bold mb-3">Kino Amrum</h2>
              <p className="text-gray-600 mb-6">
                Mitten in Norddorf, nur 100 Meter von der Bushaltestelle entfernt, mit Blick auf den idyllischen 
                Dorfplatz, lädt das Kino Amrum zu einem besonderen Filmerlebnis ein. Im Inneren erwartet Sie modernste 
                digitale Projektionstechnik, die selbst 3D-Filme in höchster Qualität erstrahlen lässt, sowie ein 
                beeindruckendes Soundsystem, das für ein immersives Hörerlebnis sorgt.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Triihuk 1, 25946 Norddorf auf Amrum</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>04682-96200</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Öffnet 30 Min. vor der ersten Vorstellung</span>
                </div>
                <div className="flex items-start">
                  <Film className="h-5 w-5 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Zwei Säle mit 102 und 57 Sitzplätzen</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="bg-purple-50 hover:bg-purple-100 border-purple-200">
                  <a href="https://kino-amrum.de/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    Website besuchen
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="kino-details">
                <AccordionTrigger>Weitere Informationen zum Kino Amrum</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Die Kinosäle</h4>
                      <p className="text-gray-600 mb-4">
                        Die zwei klimatisierten Kinosäle bieten Platz für insgesamt 159 Gäste. Einige der Sitze 
                        sind als komfortable, loungige Doppelsessel gestaltet, die besonders für Paare ein angenehmes 
                        Kinoerlebnis ermöglichen.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-purple-600 mt-2 mr-2"></div>
                          <span>Kino 1: 102 Sitzplätze, modernste Projektionstechnik</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-purple-600 mt-2 mr-2"></div>
                          <span>Kino 2: 57 Sitzplätze, gemütliche Atmosphäre</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Gastronomisches Angebot</h4>
                      <p className="text-gray-600 mb-4">
                        Das großzügige, lichtdurchflutete Foyer mit einer ansprechenden Theke und gemütlichen 
                        Bistrotischen lädt zum Verweilen ein. Das kulinarische Angebot umfasst eine Auswahl an edlen Weinen, 
                        frisch gebrühten Kaffee, erfrischende Säfte, köstliches Eis und natürlich frisches Popcorn.
                      </p>
                      <p className="text-gray-600">
                        Das Kinoprogramm wird wöchentlich aktualisiert und umfasst die neuesten Blockbuster, 
                        Familienfavoriten und ausgesuchte Arthouse-Filme.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Kultur & Unterhaltungsangebote */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Weitere Unterhaltungsangebote</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {kulturAngebote.slice(1).map((angebot, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="relative h-48">
                  <Image
                    src={angebot.image}
                    alt={angebot.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 bg-purple-100 rounded-full text-purple-700">
                      {angebot.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{angebot.title}</h4>
                  </div>
                  <p className="text-gray-600 mb-4">{angebot.description}</p>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`details-${angebot.id}`}>
                      <AccordionTrigger className="text-sm text-purple-700">Mehr erfahren</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 mt-2">
                          {angebot.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <div className="h-2 w-2 rounded-full bg-purple-600 mt-2 mr-2"></div>
                              <span className="text-gray-600 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Infobox */}
        <div className="bg-purple-50 rounded-xl p-6 mb-12">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2">Aktuelle Informationen</h3>
              <p className="text-gray-600 mb-3">
                Aktuelle Veranstaltungen und Programme finden Sie in den Veranstaltungskalendern der Gemeinden 
                oder in den Touristeninformationen auf Amrum.
              </p>
              <p className="text-gray-600">
                Besonders in der Hauptsaison empfiehlt sich für beliebte Veranstaltungen eine frühzeitige Reservierung.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Kultur erleben auf Amrum</h3>
          <p className="text-gray-600 mb-4">
            Tauchen Sie ein in die kulturelle Vielfalt der Insel und lassen Sie sich von den verschiedenen 
            Angeboten begeistern. Ob Kino, Konzert oder Ausstellung – auf Amrum wird Kultur lebendig!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://kino-amrum.de/" target="_blank" rel="noopener noreferrer">
                Kinoprogramm ansehen
              </a>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 