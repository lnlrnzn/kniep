"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ChevronRight, ClockIcon, Wind, Sailboat, Ship, Wind as WindIcon, Waves, Droplets, Palmtree } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Wassersportangebote
const wassersportAngebote = [
  {
    id: "windsurfing",
    title: "Windsurfing",
    description: "Das Revier am Norddorfer Strand bietet ideale Bedingungen für Anfänger und Fortgeschrittene.",
    icon: <Waves className="h-6 w-6" />,
    image: "/images/activities/windsurfing.webp",
  },
  {
    id: "kiten",
    title: "Kiten",
    description: "Perfekte Wellen, starker Wind und unendliche Weiten: Das ist Kiten auf Amrum.",
    icon: <Wind className="h-6 w-6" />,
    image: "/images/activities/kiten.webp",
  },
  {
    id: "segeln",
    title: "Segeln",
    description: "Schulungen für Anfänger und Umsteiger. Segler ab 14 Jahren können eine Prüfung für den Katamaranschein machen.",
    icon: <Sailboat className="h-6 w-6" />,
    image: "/images/activities/segeln.webp",
  },
  {
    id: "sup",
    title: "SUP Stand Up Paddle",
    description: "Stand Up Paddling wird immer beliebter. Miete SUP Boards inklusive Anzug und Schuhe.",
    icon: <Ship className="h-6 w-6" />,
    image: "/images/activities/sup.webp",
  },
  {
    id: "materiallagerung",
    title: "Materiallagerung",
    description: "Du kannst dein eigenes Material bei uns lagern und musst es nicht am Ende des Tages wieder mitnehmen!",
    icon: <Droplets className="h-6 w-6" />,
    image: "/images/activities/materiallagerung.webp",
  }
];

// Surfclub Amrum Angebote
const surfclubAngebote = [
  {
    title: "Schnupperkurs",
    description: "Bekomme eine kleine Intro und mache deine ersten Erfahrungen mit dem Trainerkite am Strand. Ideal für Neugierige und Anfänger."
  },
  {
    title: "Kitekurs Anfänger",
    description: "Lerne die Grundlagen des Kitens und mache deine ersten Erfahrungen auf dem Wasser."
  },
  {
    title: "Kitekurs Aufsteiger",
    description: "Verbessere deine Technik und lerne neue Tricks für Fortgeschrittene."
  },
  {
    title: "Kitecamp",
    description: "Mehrtägige intensive Kite-Erfahrung mit Gleichgesinnten."
  },
  {
    title: "Surfclub Specials",
    description: "Downwinder, Wavekiten, Big Air, Unhooked - für fortgeschrittene Kiter, die die besondere Herausforderung suchen."
  },
  {
    title: "VDWS Kitelizenz",
    description: "Bereite dich auf die offizielle VDWS Kitelizenz vor und vertiefe dein theoretisches Wissen."
  }
];

// Stationsmerkmale Boyens
const boyensFeatures = [
  "Kioskbetrieb mit Terrasse",
  "Duschen",
  "Umkleideräume",
  "Lagerungsräume",
  "Werkstatt",
  "Öffentliche Toiletten",
  "Trampolin",
  "Volleyballplätze",
  "Strandfußballplatz",
  "Spielplatz",
  "Spielboot",
  "Slackline"
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

export default function WassersportPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/wassersport-hero.webp"
          alt="Wassersport auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wassersport auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Perfekte Wellen, starker Wind und unendliche Weiten
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
          <span className="text-gray-800">Wassersport</span>
        </div>

        {/* Einführungstext */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Wassersport auf Amrum</h2>
          <p className="text-gray-600 mb-4">
            Amrum ist für Einsteiger und Fortgeschrittene der ideale Ort, um Wassersport zu betreiben. 
            Traumhafte Wassersportbedingungen mit perfekten Wellen, starkem Wind und unendlichen Weiten erwarten Sie hier.
            Die Nordseeinsel mit ihrem besonderen Flair zieht Naturliebhaber in ihren Bann. Weiter, weißer Sandstrand 
            und grüne Dünengräser zeichnen das Inselbild, umgeben von der majestätischen Nordsee.
          </p>
          <p className="text-gray-600">
            Auf Amrum finden Sie verschiedene Anbieter von Wassersportaktivitäten, die Ihnen mit Kursen,
            Equipment und Know-how zur Seite stehen. Entdecken Sie die Vielfalt der Angebote für Windsurfing, 
            Kitesurfen, Segeln, Stand Up Paddling und mehr.
          </p>
        </div>

        {/* Wassersportangebote */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Wassersportangebote auf Amrum</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {wassersportAngebote.map((angebot, index) => (
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
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 p-2 bg-blue-100 rounded-full text-blue-700">
                      {angebot.icon}
                    </div>
                    <h4 className="text-lg font-semibold">{angebot.title}</h4>
                  </div>
                  <p className="text-gray-600">{angebot.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tabs für die beiden Anbieter */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Wassersportschulen auf Amrum</h3>
          
          <Tabs defaultValue="boyens" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="boyens">Boyens Wassersportschule</TabsTrigger>
              <TabsTrigger value="surfclub">Surfclub Amrum</TabsTrigger>
            </TabsList>
            
            {/* Boyens Wassersportschule Tab */}
            <TabsContent value="boyens" className="mt-0">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-[350px] md:h-auto">
                    <Image
                      src="/images/activities/wassersportschule.webp"
                      alt="Boyens Wassersportschule Amrum"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <Badge className="bg-blue-100 text-blue-800 mb-3">Norddorf auf Amrum</Badge>
                    <h2 className="text-3xl font-bold mb-3">Boyens Wassersportschule</h2>
                    <p className="text-gray-600 mb-6">
                      Für alle Wassersportarten bieten wir Schnupperkurse, Aufbaukurse und Fortgeschrittenenkurse an. 
                      Alle unsere Schnupperkurse bieten die einzigartige Erfahrung, direkt nach einer kurzen Landeinführung, 
                      Unterricht auf dem Wasser zu erleben. Für die Schulung und den Verleih steht dir Top Material von 
                      Core, Duotone und Naish zur Verfügung.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Norddorfer Badestrand, 25946 Norddorf auf Amrum</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p>Station: 0170-9355594</p>
                          <p>Handy: 0171-4849316</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <a href="mailto:surfschule@boyens-amrum.de" className="text-blue-600 hover:underline">
                          surfschule@boyens-amrum.de
                        </a>
                      </div>
                      <div className="flex items-start">
                        <ClockIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Anfang April bis Ende Oktober<br />täglich 8 Uhr bis 18 Uhr</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button asChild>
                        <a href="https://boyens-amrum.de/wassersport/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Website besuchen
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fair Play Hinweis */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Badge className="mr-2 bg-blue-700">Fair Play</Badge>
                  Die Boyens Wassersportschule garantiert
                </h3>
                <p className="text-gray-600 mb-4">
                  Sollten gebuchte Stunden oder Kurse wegen Windmangel nicht stattfinden können, bekommt ihr euer Geld zurück!
                </p>
                <p className="text-gray-600">
                  Unsere Schule ist Mitglied im VDWS (Verband deutscher Wassersportschulen). Der VDWS ist bekannt für seine anspruchsvolle 
                  Aus- und Weiterbildung seiner Lehrkräfte. Der Unterricht entspricht den Richtlinien des VDWS und die Prüfungen für die Scheine 
                  sind international anerkannt.
                </p>
              </div>

              {/* Zusätzliche Angebote */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-6">Unsere Station bietet mehr als nur Wassersport</h3>
                <p className="text-gray-600 mb-6">
                  Auch für "Nicht-Wasserratten" ist viel los an unserer Station und es gibt Spaß für jedermann. An unserer 
                  Station befinden sich zahlreiche Einrichtungen und Aktivitäten für die ganze Familie.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {boyensFeatures.map((feature, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Besonderheiten für Kinder */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Wassersport für Kinder</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <p className="text-gray-600 mb-4">
                      Die Kinder lernen spielend bei uns Wassersport (ab 7 Jahren). Die Betreuung und das Material ist kindgerecht. 
                      Außerdem verfügen wir über langjährige Erfahrung in der Kinder- und Gruppenschulung.
                    </p>
                    <p className="text-gray-600">
                      Unsere Kurse starten täglich und eine Voranmeldung ist nicht nötig. Wegen den Startzeiten bitte an der 
                      Station melden, wenn ihr vor Ort seid oder telefonisch anrufen.
                    </p>
                  </div>
                  <div className="md:w-1/2 relative h-60 rounded-xl overflow-hidden">
                    <Image
                      src="/images/activities/kinder-wassersport.webp"
                      alt="Wassersport für Kinder"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Surfclub Amrum Tab */}
            <TabsContent value="surfclub" className="mt-0">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/2 relative h-[350px] md:h-auto">
                    <Image
                      src="/images/activities/surfclub-amrum.webp"
                      alt="Surfclub Amrum"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8">
                    <Badge className="bg-blue-100 text-blue-800 mb-3">Wittdün auf Amrum</Badge>
                    <h2 className="text-3xl font-bold mb-3">Surfclub Amrum</h2>
                    <p className="text-gray-600 mb-6">
                      Perfekte Wellen, starker Wind und unendliche Weiten: Das ist Surfurlaub auf Amrum. 
                      Im Surfclub Amrum tun wir alles dafür, dass du die perfekte Kite-Erfahrung machen kannst. 
                      Bei uns kannst du individuelle Kitekurse belegen, die dich Schritt für Schritt näher an dein Ziel 
                      bringen und auf dein Können abgestimmt sind.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Am Dünencamping Amrum<br />Inselstraße 125<br />25946 Wittdün auf Amrum</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>04682/511 97 71</span>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <a href="mailto:info@surfclub-amrum.de" className="text-blue-600 hover:underline">
                          info@surfclub-amrum.de
                        </a>
                      </div>
                      <div className="flex items-start">
                        <Wind className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Spezialisiert auf Kitesurfen</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button asChild>
                        <a href="https://www.surfclub-amrum.de/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Website besuchen
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kiten auf Amrum */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-3">Der Wind ruft, lerne Kiten!</h3>
                <p className="text-gray-600 mb-4">
                  Surfen und Kiten auf Amrum ist ein ganz besonderes Erlebnis: Die Nordseeinsel mit ihrem ganz besonderen Flair 
                  zieht Naturliebhaber in ihren Bann. Weiter, weißer Sandstrand und grüne Dünengräser zeichnen das Inselbild, 
                  umgeben von der majestätischen Nordsee.
                </p>
                <p className="text-gray-600">
                  Kiten auf Amrum ist auch eine Herausforderung: In unseren Kitekursen lernst du dich und dein Material in den Gezeiten 
                  und wechselnden Windrichtungen der Nordsee richtig einzuschätzen und einzusetzen. Finde das passende Angebot für dich: 
                  Vielleicht ein Einsteigerkurs für den Anfang oder gleich ein Kite Intensivkurs? Finde das, was für dich passt!
                </p>
              </div>

              {/* Angebote */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold mb-6">Unsere Kite-Kurse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {surfclubAngebote.map((angebot, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">{angebot.title}</h4>
                      <p className="text-gray-600">{angebot.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schnupperkurs Highlight */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Du willst mal reinschnuppern?</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <p className="text-gray-600 mb-4">
                      Dann melde Dich für einen Schnupperkurs an! Ihr bekommt eine kleine Intro, was vorab wichtig ist und am Strand 
                      kannst du schon deine ersten Erfahrungen und Flugübungen mit dem Trainerkite machen.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Wir sind zeitlich flexibel, also melde dich einfach! Für Fortgeschrittene bieten wir auch Surfclub Specials an: 
                      Downwinder, Wavekiten, Big Air, Unhooked - für alle, die die besondere Herausforderung suchen.
                    </p>
                    <Button asChild>
                      <a href="https://www.surfclub-amrum.de/kurse-buchen/kitesurf-schnupperkurs/" target="_blank" rel="noopener noreferrer">
                        Schnupperkurs buchen
                      </a>
                    </Button>
                  </div>
                  <div className="md:w-1/2 relative h-60 rounded-xl overflow-hidden">
                    <Image
                      src="/images/activities/kite-schnupperkurs.webp"
                      alt="Kite Schnupperkurs"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Wind und Wetter Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h3 className="text-xl font-bold mb-4">Wind und Wetter auf Amrum</h3>
          <p className="text-gray-600 mb-4">
            Das wichtigste für jeden Wassersportler: Wie sieht's mit dem Wind aus und wann ist Hochwasser oder Niedrigwasser?
          </p>
          <p className="text-gray-600 mb-4">
            Bei Niedrigwasser und mäßigem Wind ist der Norddorfer Strand ein perfektes Stehrevier für Anfänger und fortgeschrittene 
            Windsurfer und Kiter. Bei starkem Nordwestwind und kurz vor Hochwasser sind die größten Wellen am Norddorfer Strand.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <WindIcon className="h-5 w-5 mr-2 text-blue-600" />
                Windvorhersagen für Amrum
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Dänischer Wetterdienst: für die Deutsche Bucht</li>
                <li>Windfinder.com: für den Norddorfer Strand</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <Waves className="h-5 w-5 mr-2 text-blue-600" />
                Gezeitenvorausberechnung
              </h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>BSH: für die Amrumer Odde (Nordspitze)</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Machen Sie sich bereit für ein Wassersportabenteuer auf Amrum</h3>
          <p className="text-gray-600 mb-4">
            Egal ob Anfänger oder Fortgeschrittener, auf Amrum finden Sie das passende Wassersportangebot. 
            Traut euch und erlebt den Wassersport in einem der schönsten Reviere Deutschlands!
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