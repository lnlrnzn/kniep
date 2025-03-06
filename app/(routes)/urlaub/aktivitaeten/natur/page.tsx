"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Users, Phone, Mail, Globe, ChevronRight, Leaf, Bird, Compass, Waves } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

// Führungsarten
const tourTypes = [
  {
    title: "Geführte Wattwanderung",
    description: "Erleben Sie den einzigartigen Lebensraum des Wattenmeers. Erfahrene Guides führen Sie durch diese faszinierende Landschaft und erklären die vielfältige Flora und Fauna.",
    icon: <Waves className="w-8 h-8 text-blue-600" />,
    image: "/images/activities/wattwanderung.webp"
  },
  {
    title: "Dünenführung",
    description: "Entdecken Sie die beeindruckende Dünenlandschaft Amrums und erfahren Sie mehr über dieses empfindliche Ökosystem und seine Bewohner.",
    icon: <Compass className="w-8 h-8 text-amber-600" />,
    image: "/images/activities/duenen.webp"
  },
  {
    title: "Vogelbeobachtung",
    description: "Amrum ist ein Paradies für Vogelbeobachter. Begleiten Sie unsere Ornithologen zu den besten Beobachtungsstellen der Insel.",
    icon: <Bird className="w-8 h-8 text-green-600" />,
    image: "/images/activities/vogelbeobachtung.webp"
  },
  {
    title: "Naturschutzgebietstouren",
    description: "Erfahren Sie mehr über die Schutzgebiete Amrums und ihre Bedeutung für den Erhalt der einzigartigen Natur der Insel.",
    icon: <Leaf className="w-8 h-8 text-emerald-600" />,
    image: "/images/activities/naturschutz.webp"
  }
];

export default function NatureExperiencePage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/naturerlebnis-hero.webp"
          alt="Naturerlebnisse auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Naturerlebnisse auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie die einzigartige Natur der Insel mit dem Öömrang Ferian
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
          <span className="text-gray-800">Naturerlebnisse</span>
        </div>

        {/* Öömrang Ferian Info */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Öömrang Ferian - Erleben Sie die Natur Amrums</h2>
              <p className="text-gray-700 mb-4">
                Seit 1983 betreut der Öömrang Ferian das Naturschutzgebiet "Amrumer Dünen" und das 
                "Landschaftsschutzgebiet Amrum". Seit 2001 betreut der Öömrang Ferian zusammen 
                mit dem Verein Jordsand und der Schutzstation Wattenmeer einen Teil des Nationalparks 
                Schleswig-Holsteinisches Wattenmeer.
              </p>
              <p className="text-gray-700 mb-4">
                Der Rhythmus von Ebbe und Flut und "die Freiheit der Grenzen" sind weit mehr als ein 
                bildschöner Horizont und gute Luft: Unsere öffentlichen Führungen, die Ausstellung im 
                Naturzentrum und einmalige Erlebnisse in einer spannenden und reizvollen Landschaft 
                bringen euch die Amrumer Natur näher.
              </p>
              <p className="text-gray-700 mb-5">
                Gruppen wie beispielsweise Schulklassen können bei uns gerne telefonisch speziell auf sie 
                zugeschnittene Führungen vereinbaren.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="#fuehrungen">Führungen entdecken</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.oeoemrang-ferian.de/" target="_blank" rel="noopener noreferrer">
                    Website besuchen
                  </a>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="relative w-full h-72 md:h-full rounded-lg overflow-hidden">
                <Image
                  src="/images/activities/oemrang-logo.webp"
                  alt="Öömrang Ferian"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Naturzentrum Info */}
        <div className="mb-12" id="naturzentrum">
          <h2 className="text-2xl font-bold mb-6">Das Naturzentrum Amrum</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
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
                <h3 className="text-xl font-bold mb-3">Öffnungszeiten & Kontakt</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">April bis Oktober</p>
                      <p className="text-gray-600">täglich außer Do</p>
                      <p className="text-gray-600">10:00 - 17:00 Uhr</p>
                      <p className="font-medium mt-2">November bis März</p>
                      <p className="text-gray-600">Mi | Fr | Sa | So</p>
                      <p className="text-gray-600">12:00 - 16:00 Uhr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">Strunwai 31</p>
                      <p className="text-gray-600">25946 Norddorf auf Amrum</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Telefon & Fax</p>
                      <p className="text-gray-600">T 04682 1635</p>
                      <p className="text-gray-600">F 04682 968532</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <p className="text-gray-600 break-all">veranstaltungen@naturzentrum-amrum.de</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" asChild>
                  <a href="https://www.oeoemrang-ferian.de/" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Über das Naturzentrum</h3>
              <p className="text-gray-700 mb-4">
                Das Naturzentrum Amrum bietet faszinierende Einblicke in die vielfältige Natur der Insel. 
                In der Ausstellung können Sie die Besonderheiten des Nationalparks Schleswig-Holsteinisches 
                Wattenmeer entdecken und mehr über den lokalen Naturschutz erfahren.
              </p>
              <p className="text-gray-700 mb-4">
                Das Zentrum dient als Ausgangspunkt für zahlreiche geführte Touren und bietet 
                regelmäßig wechselnde Ausstellungen und Informationsveranstaltungen. Es ist der 
                ideale Ort, um mehr über die einzigartige Tier- und Pflanzenwelt Amrums zu erfahren.
              </p>
              <div className="flex items-center text-gray-600 mb-2">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span>Ideal für Familien und Naturinteressierte</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Globe className="w-5 h-5 text-blue-600 mr-2" />
                <span>Teil des Nationalpark Schleswig-Holsteinisches Wattenmeer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Führungen */}
        <div className="mb-12" id="fuehrungen">
          <h2 className="text-2xl font-bold mb-6">Führungen & Naturerlebnisse</h2>
          
          <p className="text-gray-700 mb-6">
            Die Termine für unsere Führungen veröffentlichen wir an Aushängen auf der Insel und im 
            Faltblatt AMRUM aktuell. Besuchen Sie auch unsere Website oder das Naturzentrum für 
            aktuelle Informationen zu den Führungsterminen.
          </p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tourTypes.map((tour, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="relative h-48">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    {tour.icon}
                    <h3 className="text-xl font-bold ml-3">{tour.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-green-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-3">Gruppenführungen</h3>
            <p className="text-gray-700 mb-4">
              Schulklassen und Gruppen können spezielle, maßgeschneiderte Führungen buchen. 
              Bitte kontaktieren Sie uns für weitere Informationen und zur Terminvereinbarung.
            </p>
            <div className="flex items-center text-gray-700 mb-3">
              <Phone className="w-5 h-5 text-green-600 mr-2" />
              <span>Telefonische Anfragen unter: 04682 1635</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 text-green-600 mr-2" />
              <span>E-Mail: veranstaltungen@naturzentrum-amrum.de</span>
            </div>
          </div>
        </div>

        {/* Öömrang Hüs */}
        <div className="mb-12" id="oemrang-hues">
          <h2 className="text-2xl font-bold mb-6">Öömrang Hüs - Amrumer Archiv & Museum</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-6">
                <h3 className="text-xl font-bold mb-3">Öffnungszeiten & Führungen</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Aktuelle Öffnungszeiten Februar/März</p>
                      <p className="text-gray-600">Montag 14.00 Uhr Führung</p>
                      <p className="text-gray-600">Mittwoch 14.00 Uhr Führung</p>
                      <p className="text-gray-600">Freitag 14.00 Uhr Führung</p>
                      <p className="font-medium mt-2">ab 03.03.2025</p>
                      <p className="text-gray-600">montags - samstags täglich 11.00 - 13.30 Uhr mit Führung</p>
                      <p className="text-gray-600 mt-2">Die Führung dauert 1,5 bis 2 Stunden</p>
                      <p className="text-gray-600">Eintritt frei — um Spenden wird gebeten</p>
                      <p className="text-gray-600 mt-2">Gruppen nur auf Anmeldung: Tel. 04682 - 4120</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">Waaswai 1</p>
                      <p className="text-gray-600">25946 Nebel auf Amrum</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-gray-600">T 04682 4153</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <p className="text-gray-600">info@oeoemrang-ferian.de</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" asChild>
                  <a href="https://www.oeoemrang-ferian.de/" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren
                  </a>
                </Button>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="/images/activities/oemrang-hues.webp"
                  alt="Öömrang Hüs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Über das Öömrang Hüs</h3>
              <p className="text-gray-700 mb-4">
                Das Öömrang Hüs in Nebel ist ein historisches Friesenhaus, das heute als Archiv und Museum 
                dient. Hier wird die Geschichte und Kultur der Insel Amrum lebendig. Erfahren Sie mehr 
                über die traditionelle Lebensweise der Amrumer, ihre Sprache und ihre Bräuche.
              </p>
              <p className="text-gray-700 mb-4">
                Bei einer Führung durch das Museum erhalten Sie spannende Einblicke in das Leben 
                auf der Insel in vergangenen Zeiten und entdecken zahlreiche historische Artefakte 
                und Dokumente, die die reiche Geschichte Amrums dokumentieren.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mitmachen */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Mitarbeiten & Fördern</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Mitarbeiten</h3>
              <p className="text-gray-700 mb-4">
                Unser Freiwilligenteam freut sich auf deine Unterstützung als (halbjährige*r) BFDler*in 
                oder FJÖler*in. Die BFD- und FÖJler*innen bleiben ab Juli und August für ein Jahr auf 
                Amrum. HBFDler*in beginnen den Dienst zwischen März und April. Das Interesse an 
                Naturschutz ist natürlich Voraussetzung für die Mitarbeit.
              </p>
              <Button asChild>
                <a href="https://www.oeoemrang-ferian.de/" target="_blank" rel="noopener noreferrer">
                  Bewirb dich jetzt
                </a>
              </Button>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Fördern</h3>
              <p className="text-gray-700 mb-4">
                Unterstütze uns durch eine Spende - einmalig oder regelmäßig. Wir statten davon unsere 
                Mitarbeitenden mit gutem Werkzeug und Arbeitsgerät aus und gestalten unsere Projekte 
                zum Erhalt der Amrumer Natur langfristig.
              </p>
              <Button variant="outline" asChild>
                <a href="https://www.oeoemrang-ferian.de/" target="_blank" rel="noopener noreferrer">
                  Nimm Kontakt auf
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Erleben Sie die Natur Amrums</h3>
          <p className="text-gray-600 mb-4">
            Die vielfältigen Naturerlebnisse auf Amrum bieten Ihnen die Möglichkeit, die einzigartige 
            Flora und Fauna der Insel kennenzulernen. Der Öömrang Ferian und seine engagierten Mitarbeiter 
            freuen sich darauf, Ihnen die Naturschätze Amrums näherzubringen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events">Aktuelle Führungstermine</Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 