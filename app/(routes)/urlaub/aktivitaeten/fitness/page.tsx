"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Users, Phone, Mail, Globe, Dumbbell, ChevronRight, Flame, ArrowRight } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// AmrumSpa Angebote
const amrumSpaServices = [
  {
    category: "Krankengymnastik & Physiotherapie",
    items: [
      "Krankengymnastik",
      "Physiotherapie nach Bobath",
      "Krankengymnastik am Gerät",
      "Krankengymnastik/Atemtherapie für Patienten mit Mucoviszidose",
      "Manuelle Therapie",
      "Schlingentischtherapie",
      "Krankengymnastik im Bewegungsbad / Wassergymnastik"
    ]
  },
  {
    category: "Massagetherapie",
    items: [
      "Klassische Massagetherapie",
      "Manuelle Lymphdrainage",
      "Bindegewebsmassage"
    ]
  },
  {
    category: "Physikalische Therapie",
    items: [
      "Rotlichttherapie",
      "Kältetherapie",
      "Elektro- und Ultraschalltherapie",
      "Solebäder",
      "Amrumer Heilschlick-Packungen",
      "Inhalationstherapie"
    ]
  }
];

// AmrumSpa Preisliste (Auszug)
const amrumSpaPrices = {
  physiotherapy: [
    { name: "Krankengymnastik/Physiotherapie/Atemtherapie", price: "25-30€", duration: "25 Min." },
    { name: "Manuelle Therapie", price: "25-32€", duration: "25 Min." },
    { name: "Schlingentischbehandlung, aktiv", price: "25-26€", duration: "25 Min." },
    { name: "Schlingentischbehandlung, passiv", price: "25-15€", duration: "25 Min." },
    { name: "Krankengymnastik Neuro (Bobath, PNF)", price: "25-32€", duration: "25 Min." },
    { name: "Krankengymnastik bei Mukoviszidose", price: "50-55€", duration: "50 Min." },
    { name: "Krankengymnastik am Gerät", price: "25-35€", duration: "25 Min." }
  ],
  massage: [
    { name: "Klassische Massage", price: "25-28€", duration: "25 Min." },
    { name: "Großmassage/Ganzkörpermassage", price: "50-56€", duration: "50 Min." },
    { name: "Manuelle Lymphdrainage (Teilbehandlung)", price: "25-28€", duration: "25 Min." },
    { name: "Manuelle Lymphdrainage (Ganzbehandlung)", price: "50-56€", duration: "50 Min." },
    { name: "Manuelle Lymphdrainage (Komplexbehandlung)", price: "75-84€", duration: "75 Min." }
  ],
  physicalTherapy: [
    { name: "Amrumer Heilschlickpackung", price: "17,50€", duration: "25 Min." },
    { name: "Eis oder kalte Packung mit Amrumer Heilschlick", price: "12,50€", duration: "pro Anwendung" },
    { name: "Heiße Rolle", price: "15,00€", duration: "pro Anwendung" },
    { name: "Rotlichttherapie", price: "12,50€", duration: "pro Anwendung" },
    { name: "Elektrotherapie", price: "12,50€", duration: "pro Anwendung" },
    { name: "Ultraschall", price: "12,50€", duration: "pro Anwendung" },
    { name: "Inhalationstherapie Vernebler", price: "10,00€", duration: "pro Anwendung" }
  ]
};

// Eilun Fit Angebote
const eilunFitFeatures = [
  "Kraft-Gerätepark",
  "Cardio-Gerätepark",
  "Freihantel-Bereich",
  "Functionaltraining-Bereich",
  "Finnische Sauna",
  "Gruppentraining",
  "Personaltraining"
];

// Eilun Fit Preise
const eilunFitPrices = [
  { name: "Tageskarte Fitness (Studio & Kurse)", price: "12,50€" },
  { name: "Tageskarte (inkl. Sauna & Kursen)", price: "15€" },
  { name: "5er Karte Fitness (Studio & Kurse)", price: "50€" },
  { name: "10er Karte Fitness (Studio & Kurse)", price: "85€" },
  { name: "Monatskarte", price: "60€" },
  { name: "Mitgliedschaft ab 12 Monate/mtl.", price: "35€" }
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

export default function FitnessPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/fitness-hero.webp" // Spezifisches Fitness-Hero-Bild
          alt="Fitness & Wellness auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fitness & Wellness auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie die Fitness- und Wellnessangebote auf Amrum für einen aktiven und erholsamen Urlaub
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
          <span className="text-gray-800">Fitness & Wellness</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Fitnessstudios und Wellness auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Auf Amrum finden Sie verschiedene Möglichkeiten, um während Ihres Urlaubs fit zu bleiben oder sich zu entspannen. 
            Von voll ausgestatteten Fitnessstudios über Physiotherapie bis hin zu Wellness-Angeboten - hier ist für jeden etwas dabei.
          </p>
        </div>

        {/* Anbieterübersicht */}
        <Tabs defaultValue="eilunFit" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="eilunFit">Eilun Fit</TabsTrigger>
            <TabsTrigger value="amrumSpa">AmrumSpa Gesundheitszentrum</TabsTrigger>
          </TabsList>
          
          {/* Eilun Fit */}
          <TabsContent value="eilunFit">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-[300px] md:h-auto">
                  <Image
                    src="/images/activities/fitness.webp"
                    alt="Eilun Fit Fitnessstudio"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <h2 className="text-3xl font-bold mb-3">Eilun Fit</h2>
                  <p className="text-gray-600 mb-6">
                    Das Eilun Fit ist ein modernes Fitnessstudio in Norddorf mit umfangreichem Gerätepark, 
                    Freihantelbereich, Gruppenkursen und einer finnischen Sauna.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Gewerbegebiet 7, 25946 Norddorf/Amrum</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p>Mo-Fr: 08:00-20:00</p>
                        <p>Sa-So: 10:00-14:00</p>
                        <p className="text-sm mt-1">Sauna: Mo-Fr 16:30-19:45</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>04682-9983475</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <a href="mailto:info@eilunfit.de" className="text-blue-600 hover:underline">
                        info@eilunfit.de
                      </a>
                    </div>
                  </div>
                  
                  <Button asChild>
                    <a href="https://www.eilunfit.de" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Website besuchen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Eilun Fit Angebote & Preise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Angebote & Ausstattung</h3>
                <ul className="space-y-2">
                  {eilunFitFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Preise (Auswahl)</h3>
                <div className="space-y-3">
                  {eilunFitPrices.map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Weitere Preise und Sonderangebote finden Sie auf der Website oder vor Ort.
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* AmrumSpa */}
          <TabsContent value="amrumSpa">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-[300px] md:h-auto">
                  <Image
                    src="/images/activities/amrumspa.webp"
                    alt="AmrumSpa Gesundheitszentrum"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <h2 className="text-3xl font-bold mb-3">AmrumSpa Gesundheitszentrum</h2>
                  <p className="text-gray-600 mb-6">
                    Das AmrumSpa Gesundheitszentrum in Wittdün bietet neben einem Fitnessstudio umfangreiche Therapieangebote 
                    wie Krankengymnastik, Physiotherapie, Massagen und Wellness-Anwendungen an.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Am Schwimmbad 1, 25946 Wittdün auf Amrum</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p>Mo-Fr: 08:00-12:00 & 14:00-20:00</p>
                        <p>Sa, So, Feiertage: 09:00-13:00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <span>04682-9615888</span>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <a href="mailto:info@amrumspa.de" className="text-blue-600 hover:underline">
                        info@amrumspa.de
                      </a>
                    </div>
                  </div>
                  
                  <Button asChild>
                    <a href="https://www.amrumspa.de" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Website besuchen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* AmrumSpa Schwerpunkte */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Schwerpunkte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Krankengymnastik</h4>
                  <p>Ob in der Rehabilitation nach Krankheiten und Unfällen oder nach einer Operation: Finden Sie mit dem AmrumSpa wieder zu Ihrer alten Stärke zurück.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Massagetherapie</h4>
                  <p>Massagen gehören zu den ältesten Heilmitteln der Menschheit und beugen den unterschiedlichsten Beschwerden vor.</p>
                </div>
              </div>
            </div>
            
            {/* AmrumSpa Angebote */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Angebote</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {amrumSpaServices.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <h4 className="font-semibold text-lg mb-3">{service.category}</h4>
                    <ul className="space-y-2">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-blue-500 mr-3"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AmrumSpa Preise */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Preise (Auszug)</h3>
              <Tabs defaultValue="physiotherapy">
                <TabsList className="mb-4">
                  <TabsTrigger value="physiotherapy">Physiotherapie</TabsTrigger>
                  <TabsTrigger value="massage">Massagen</TabsTrigger>
                  <TabsTrigger value="physicalTherapy">Physikalische Therapie</TabsTrigger>
                </TabsList>
                
                <TabsContent value="physiotherapy">
                  <div className="space-y-3">
                    {amrumSpaPrices.physiotherapy.map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <span>{item.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({item.duration})</span>
                        </div>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="massage">
                  <div className="space-y-3">
                    {amrumSpaPrices.massage.map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <span>{item.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({item.duration})</span>
                        </div>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="physicalTherapy">
                  <div className="space-y-3">
                    {amrumSpaPrices.physicalTherapy.map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <span>{item.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({item.duration})</span>
                        </div>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-4 text-sm text-gray-500">
                Hinweis: Die Preisliste zeigt einen Auszug der Privatpreise. Genauere Informationen erhalten Sie direkt im AmrumSpa.
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Planen Sie Ihre Fitness- und Wellness-Aktivitäten</h3>
          <p className="text-gray-600 mb-4">
            Buchen Sie Ihre Termine im Voraus, besonders in der Hauptsaison, um Enttäuschungen zu vermeiden. 
            Beide Einrichtungen bieten auch spezielle Angebote für Urlauber an.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/kontakt">Beratung anfragen</Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 