"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ChevronRight, Clock, Bike, Check, Zap, CalendarClock, ParkingSquare, PlugZap, Truck, Sparkles } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Fahrradverleih-Anbieter
const bikeRentalProviders = [
  {
    id: "eldorado",
    name: "Eldorado Fahrradverleih",
    location: "Norddorf",
    description: "Moderner Fahrradverleih mit hochwertigen Rädern und E-Bikes, die maximal drei Jahre alt und bestens gepflegt sind. Online-Buchung möglich.",
    address: "Taft 15, 25946 Norddorf auf Amrum",
    phone: "+49 4682 9618861",
    email: "info@eldorado-amrum.de",
    website: "https://eldorado-amrum.de/",
    image: "/images/activities/eldorado-fahrradverleih.webp",
    logo: "/images/activities/eldorado-logo.webp",
    highlights: [
      "Online-Buchung mit Echtzeit-Verfügbarkeit",
      "Moderne Fahrräder und E-Bikes (max. 3 Jahre alt)",
      "Citybikes, E-Bikes, Trekkingräder, Mountainbikes, Lastenräder",
      "Kostenfreie Lieferung bei Online-Buchung (Wittdün bis Norddorf)",
      "Flexible Rückgabe außerhalb der Öffnungszeiten möglich",
      "Helme, Körbe und Schlösser im Preis enthalten"
    ]
  },
  {
    id: "stefans",
    name: "Stefan's Fahrradverleih",
    location: "Nebel",
    description: "Ihr Fahrradverleih für die ganze Insel Amrum mit durchgehenden Öffnungszeiten und umfassendem Service. Kostenloser Bring- und Abholservice.",
    address: "Postwai 1, 25946 Nebel auf Amrum",
    phone: "04682 96262",
    email: "info@stefansfahrradverleih.de",
    website: "https://www.stefansfahrradverleih.de/",
    image: "/images/activities/stefans-fahrradverleih.webp",
    logo: "/images/activities/stefans-logo.webp",
    highlights: [
      "Durchgehende Öffnungszeiten: täglich von 9 bis 18 Uhr",
      "Kostenloser Bring- und Abholservice (ab 3 Tage Miete)",
      "Markenräder: Conway, Gazelle, Stevens, Giant, Kettler, u.a.",
      "Tauschoptionen bei Nichtgefallen",
      "Gratis-Zubehör: Helme, Körbe, Schlösser, Sattelüberzüge",
      "Kostenloser Pannendienst (15 Min. Reaktionszeit)"
    ]
  },
  {
    id: "marcs",
    name: "Marc's Fahrradverleih",
    location: "Wittdün",
    description: "Direkt am Fähranleger in Wittdün finden Sie Marc's Fahrradverleih - mit neuen und gut gewarteten Fahrrädern, Online-Buchung und kostenlosem Pannenservice.",
    address: "Inselstr. 12, 25946 Wittdün auf Amrum",
    phone: "",
    email: "",
    website: "https://www.marcsfahrradverleih.de/",
    image: "/images/activities/marcs-fahrradverleih.webp",
    logo: "/images/activities/marcs-logo.webp",
    highlights: [
      "Direkt am Fähranleger in Wittdün",
      "Neue und gut gewartete Fahrräder",
      "Online-Buchung möglich",
      "Liefer- und Abholservice auf ganz Amrum",
      "Kostenloser Pannenservice",
      "Kostenloser Korb und Schloss an jedem Rad"
    ]
  },
  {
    id: "norddorfer",
    name: "Norddorfer Fahrradverleih",
    location: "Norddorf",
    description: "Spezialisiert auf moderne E-Bikes aus der Fahrradmanufaktur Bötcher. Erleben Sie die Annehmlichkeiten eines E-Bikes und machen Sie Ihren Fahrradausflug unvergesslich.",
    address: "Lunstruat 9, 25946 Norddorf auf Amrum",
    phone: "",
    email: "",
    website: "https://norddorfer-fahrradverleih.de/",
    image: "/images/activities/norddorfer-fahrradverleih.webp",
    logo: "/images/activities/norddorfer-logo.webp",
    highlights: [
      "E-Bike Spezialist",
      "Neueste Generation E-Bikes",
      "Hochleistungs-Akkus",
      "Gratis Ladestation",
      "Kostenfreier Hol- und Bringservice"
    ]
  }
];

// Liste von häufigen Serviceleistungen der Fahrradverleih-Anbieter
const commonServices = [
  { icon: <Bike className="h-5 w-5" />, title: "Große Auswahl", description: "Von Cityrädern über E-Bikes bis zu Spezialrädern" },
  { icon: <Truck className="h-5 w-5" />, title: "Bringservice", description: "Lieferung der Räder zu Ihrer Unterkunft" },
  { icon: <ParkingSquare className="h-5 w-5" />, title: "Abstellservice", description: "Flexible Rückgabe auch außerhalb der Öffnungszeiten" },
  { icon: <Sparkles className="h-5 w-5" />, title: "Qualitätscheck", description: "Regelmäßige Wartung und Überprüfung der Räder" },
  { icon: <CalendarClock className="h-5 w-5" />, title: "Pannendienst", description: "Schnelle Hilfe bei Problemen auf der ganzen Insel" },
  { icon: <Zap className="h-5 w-5" />, title: "E-Bikes", description: "Moderne Elektrofahrräder mit hoher Reichweite" }
];

export default function MobilitaetPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/mobilitaet-hero.webp"
          alt="Fahrradfahren auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mobilität auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Mit dem Fahrrad die Insel erkunden - bequem, umweltfreundlich und flexibel
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
          <span className="text-gray-800">Mobilität</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Fahrradverleih auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Das Fahrrad ist das wichtigste Fortbewegungsmittel auf Amrum – umweltfreundlich, flexibel und perfekt, 
            um alle Ecken der Insel zu erkunden. Mit gut ausgebauten Radwegen und kurzen Distanzen ist Amrum 
            ein ideales Terrain für Radfahrer jeden Alters.
          </p>
          <p className="text-gray-600">
            Auf Amrum finden Sie mehrere Fahrradverleih-Anbieter, die mit modernen Rädern, umfangreichem Service 
            und fairen Preisen überzeugen. Viele Anbieter liefern die Räder direkt zu Ihrer Unterkunft und 
            holen sie am Ende Ihres Aufenthalts auch wieder ab – bequemer geht es nicht!
          </p>
        </div>

        {/* Service-Vorteile */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-5">Was Sie auf Amrum vom Fahrradverleih erwarten können:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {commonServices.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3 flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-base">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fahrradverleih-Tabs */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold mb-6">Fahrradverleih-Anbieter auf Amrum</h3>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Übersicht</TabsTrigger>
              <TabsTrigger value="map">Karte</TabsTrigger>
            </TabsList>
            
            {/* Übersicht Tab */}
            <TabsContent value="overview" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {bikeRentalProviders.map((provider, index) => (
                  <motion.div
                    key={provider.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                    variants={itemVariants}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative h-[200px] md:h-auto">
                        <Image
                          src={provider.image}
                          alt={provider.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Badge className="bg-green-100 text-green-800 mb-2">{provider.location}</Badge>
                            <h3 className="text-2xl font-bold">{provider.name}</h3>
                          </div>
                          {/* Logo könnte hier angezeigt werden */}
                        </div>
                        
                        <p className="text-gray-600 mb-4">{provider.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{provider.address}</span>
                          </div>
                          {provider.phone && (
                            <div className="flex items-start">
                              <Phone className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-sm">{provider.phone}</span>
                            </div>
                          )}
                          {provider.email && (
                            <div className="flex items-start">
                              <Mail className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                              <a href={`mailto:${provider.email}`} className="text-sm text-green-600 hover:underline">
                                {provider.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-start">
                            <Globe className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <a href={provider.website} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline">
                              Website besuchen
                            </a>
                          </div>
                        </div>
                        
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value={`highlights-${provider.id}`}>
                            <AccordionTrigger className="text-green-700 font-medium">
                              Besondere Leistungen und Highlights
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {provider.highlights.map((highlight, i) => (
                                  <li key={i} className="flex items-start text-sm">
                                    <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <div className="mt-4">
                          <Button asChild className="bg-green-600 hover:bg-green-700">
                            <a href={provider.website} target="_blank" rel="noopener noreferrer">
                              Jetzt Fahrrad mieten
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Karte Tab */}
            <TabsContent value="map" className="mt-0">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-6">
                  <Image
                    src="/images/activities/amrum-map-bikes.webp"
                    alt="Karte von Amrum mit Fahrradverleih-Standorten"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold mb-4">Standorte der Fahrradverleih-Anbieter</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bikeRentalProviders.map((provider) => (
                    <div key={provider.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 p-1.5 rounded-full text-green-600 mr-2 flex-shrink-0">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{provider.name}</h4>
                        <p className="text-xs text-gray-500">{provider.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Hinweis: Viele Anbieter liefern die Fahrräder direkt zu Ihrer Unterkunft – 
                  fragen Sie nach diesem Service bei der Buchung!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Tipps für Radfahrer */}
        <div className="bg-green-50 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">Tipps für Radfahrer auf Amrum</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Radwege auf Amrum</h4>
              <p className="text-gray-600 text-sm mb-4">
                Amrum verfügt über ein gut ausgebautes Netz an Radwegen, die alle Orte der Insel miteinander 
                verbinden. Die Wege führen durch malerische Dünenlandschaften, entlang des Strandes und durch 
                idyllische Dörfer. Mit insgesamt über 50 km Radwegen können Sie die Insel bequem erkunden.
              </p>
              
              <h4 className="font-semibold mb-2">Welches Fahrrad für Amrum?</h4>
              <p className="text-gray-600 text-sm">
                Für Amrum eignen sich besonders Citybikes und Trekkingräder. Die Strecken sind überwiegend flach, 
                aber bei Wind kann ein E-Bike sehr angenehm sein. Für Familien mit Kindern bieten die Verleiher 
                auch Kinderfahrräder, Kinderanhänger und Tandems an.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Vorschriften und Regeln</h4>
              <ul className="text-gray-600 text-sm space-y-2 mb-4">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Halten Sie sich an die ausgewiesenen Radwege, insbesondere in den Dünen</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Die Straßenverkehrsordnung gilt auch auf Amrum</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Schließen Sie Ihr Fahrrad immer ab, auch wenn Sie nur kurz anhalten</span>
                </li>
              </ul>
              
              <h4 className="font-semibold mb-2">Fahrradkarten</h4>
              <p className="text-gray-600 text-sm">
                Fahrradkarten erhalten Sie bei den Fahrradverleihern, in den Tourist-Informationen 
                oder in lokalen Geschäften. Viele Verleiher geben auch gerne Tipps zu besonders 
                schönen Radrouten auf Amrum.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Bereit für Ihr Rad-Abenteuer auf Amrum?</h3>
          <p className="text-gray-600 mb-4">
            Mit dem Fahrrad erkunden Sie Amrum auf eine besonders schöne und umweltfreundliche Weise. 
            Buchen Sie Ihr Wunschrad direkt bei einem der Anbieter und erleben Sie die Freiheit auf zwei Rädern!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/urlaub/unterkuenfte">Unterkünfte entdecken</Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 