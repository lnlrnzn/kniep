"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, ChevronRight, Clock, Anchor, Ship, Info, AlertCircle } from "lucide-react";
import { ContentContainer } from "../../../../components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

// Bootstouren
const boatTours = [
  {
    id: "seehundsbaenke",
    title: "Seehundsbänke",
    duration: "2 Stunden",
    description: "Ausflug zu unseren Haustieren. Auf den Sandbänken zwischen Amrum und Föhr liegen jedes Jahr Seehunde und ziehen ihre Jungen groß. Wir gucken ihnen vom Schiff aus zu. Bei der Weiterfahrt beobachten wir Seetiere, die wir mit einem Netz in unseren Bottich an Bord holen. Lassen wir uns überraschen, was kommt – und natürlich lassen wir sie auf dem Rückweg wieder zurück in die Nordsee.",
    highlight: "Super für kleine Kinder!",
    image: "/images/activities/seehundsbaenke.webp",
    prices: {
      adult: "25,00 €",
      child: "13,00 €",
      family: "70,00 €"
    }
  },
  {
    id: "hooge",
    title: "Hooge – die zweitgrößte der zehn Halligen",
    duration: "5 1/2 Stunden",
    description: "Sturmflutkino, Königspesel und Pferdekutschen: Hooge, acht Seemeilen entfernt von Amrum, ist die bekannteste Hallig im Wattenmeer. Zehn Warften, rund 100 Bewohner, ein Lehrer, eine Bürgermeisterin und unzählige Schafe hinter, vor und auf elf Kilometern Sommerdeich. Die Kirche ist wunderschön und der moderne Markttreff ein zentraler Treffpunkt für die Halligmenschen.",
    highlight: "Als Biosphärenreservat sind die Halligen Teil einer Modellregion, in der erprobt wird, wie der Mensch in der alten Kulturlandschaft auch heute noch nachhaltig wirtschaften und gut leben kann.",
    image: "/images/activities/hooge.webp",
    prices: {
      adult: "26,00 €",
      child: "13,50 €",
      family: "73,00 €"
    }
  },
  {
    id: "langeness",
    title: "Langeneß – große, lange Hallig",
    duration: "6 Stunden",
    description: "Mit zehn Kilometern Länge die größte Hallig. War bis zur Burchardifult 1634 mit Hooge verbunden. 18 Warften und rund 110 Bewohner. Im Sommer kommt täglich ein Schiff und bringt Lebensmittel; im Winter nur zweimal die Woche. Kleines Museum auf der Ketelswarf. Wer mag, fährt mit dem Halligexpress bis ganz rüber zur Kirchhofswarf, mit Stopp zur Einkehr oder zum Spaziergang. Ein Lorendamm verbindet Langeness über die Hallig Oland mit dem Festland.",
    highlight: "Hallig: immer mal wieder überflutetes Land im Meer. Warft: künstlich aufgeschütteter Hügel.",
    image: "/images/activities/langeness.webp",
    prices: {
      adult: "26,00 €",
      child: "13,50 €",
      family: "73,00 €"
    }
  },
  {
    id: "rundumamrum",
    title: "Rund um Amrum",
    duration: "4 Stunden",
    description: "Lieblingsinsel von der Seeseite aus. Die Odde, unsere Nordspitze, bei Hochwasser aus nächster Nähe und ganz anderer Perspektive. Ein kurzer Abstecher nach Hörnum, vielleicht dort kurz mal den Bug auf den Sand. Vorbei an den Sandbänken mit ihren Seehund- und Kegelrobbenkolonien. Die Wattseite mit ihren Dörfern. Rund um den Kniephaken im Süden und Amrums ewig langer Sandstrand in seiner ganzen Pracht.",
    highlight: "Insel: festes Land im Meer",
    image: "/images/activities/rund-um-amrum.webp",
    prices: {
      adult: "29,00 €",
      child: "15,00 €",
      family: "82,00 €"
    }
  },
  {
    id: "krabbenfangfahrt",
    title: "Krabbenfangfahrt",
    duration: "2 Stunden",
    description: "Richtung Südspitze oder Steenodde. Im kleinen Maßstab wie eine echte, große Fahrt raus auf der Suche nach Krabben: Wir fangen welche, kochen sie an Bord und während ihr pult, erzählen wir euch über die Arbeit der Krabbenfischer, über das Leben der kleinen Tierchen, wie sie weiterverarbeitet werden – und wie man sie am geschicktesten pult. Ein Törn mit Spaß für die ganze Familie.",
    highlight: "",
    image: "/images/activities/krabbenfangfahrt.webp",
    prices: {
      adult: "25,00 €",
      child: "13,00 €",
      family: "70,00 €"
    }
  },
  {
    id: "fischmarkt",
    title: "Fischmarkt auf Föhr",
    duration: "5 Stunden (davon 3 Stunden auf Föhr)",
    description: "Einmal Festmeile und zurück. Der Fischmarkt sonntags auf Föhr ist bunt, er swingt und hat diese herrliche Aussicht auf den Wyker Binnenhafen. Die Stände sind voll mit Kunst und Kitsch und regionalen Spezialitäten. Die Zeit reicht auch locker für einen Spaziergang über die Seepromenade und durch Wyks alte Gassen.",
    highlight: "",
    image: "/images/activities/fischmarkt-foehr.webp",
    prices: {
      adult: "16,00 €",
      child: "9,00 €",
      family: "45,00 €"
    }
  },
  {
    id: "groede-oland",
    title: "Halligen Gröde und Oland",
    duration: "6 Stunden",
    description: "Schöner Blick über die See. Gröde ist eine der kleinsten Gemeinden Deutschlands und bei Wahlen immer ruck, zuck fertig mit dem Auszählen. Etwa 9 Bewohner auf zwei Warften, eine sehr schöne Kirche und im Winterhalbjahr rund 50 Mal 'Landunter'. Im Sommer stehen hier Festlandskühe, man ist von überall in drei Minuten am Meer und muss einmal bei Monikas Kiosk die selbstgebackenen Knerken probiert haben. Winziges Oland: zwei Quadratkilometer groß, zwischen Langeness und Festland. Mit Kirche und reetgedecktem Leuchtfeuer. Aus der Schule wurde eine Galerie - mit Kunst und schöner Keramik. Die weiten Salzwiesen sind beliebtes Brutgebiet. Den Damm nach Dagebüll (5 km) befahren die zwanzig Bewohner mit ihren eigenen Loren.",
    highlight: "Auf jeder Hallig ist ein Landgang von 1 Stunde mit Führung geplant.",
    image: "/images/activities/groede-oland.webp",
    prices: {
      adult: "29,00 €",
      child: "15,00 €",
      family: "82,00 €"
    }
  }
];

// Wichtige Hinweise
const importantNotes = [
  "Wir starten am Fähranleger in Wittdün.",
  "Mit dem Bus kommen Sie bis zur Endstation und steigen direkt am Anleger aus.",
  "Fahrräder können Sie auf der Hafenmole anschließen. Fahrradanhänger können leider nicht mitgenommen werden.",
  "Für Autos gibt es rechts auf der Mole den kostenfreien Inselparkplatz.",
  "Ihren Hund dürfen Sie gerne mitnehmen.",
  "Während der Fahrt erzählen wir Ihnen gerne Geschichten zu Sturmfluten und dem Tierleben."
];

export default function AusfluegePage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/activities/ausflug-hero.webp"
          alt="Ausflüge und Touren auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ausflüge & Touren</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie die faszinierende Welt des Wattenmeers mit der MS Eilun
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
          <span className="text-gray-800">Ausflüge & Touren</span>
        </div>

        {/* Einführungstext mit Schiffsinformationen */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <Ship className="h-7 w-7 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold">MS Eilun - Bootstouren im Wattenmeer</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-[350px] md:h-auto">
                <Image
                  src="/images/activities/ms-eilun.webp"
                  alt="MS Eilun"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <Badge className="bg-blue-100 text-blue-800 mb-3">Bootstouren ab Wittdün</Badge>
                <h3 className="text-2xl font-bold mb-3">Willkommen an Bord der MS Eilun</h3>
                <p className="text-gray-600 mb-4">
                  Seit 1997 fährt der Amrumer Bandix Tadsen mit seiner Eilun zu Ausflugsfahrten: Sieben verschiedene Touren durch das nordfriesische Wattenmeer, rund um Amrum, zu den Halligen, den Seehundsbänken und nach Föhr.
                </p>
                <p className="text-gray-600 mb-6">
                  In Seemeilen gemessen, ist die MS Eilun schon zweimal um die Welt gefahren. Aber kein Ozean ist so abwechslungsreich wie das Wattenmeer: Jeden Tag ist das Wetter anders, Seehunde werden geboren, Sandbänke verschwinden, Wracks tauchen auf.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Fähranleger Wittdün, Amrum</span>
                  </div>
                  <div className="flex items-start">
                    <Anchor className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Touren von 2 bis 6 Stunden</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href="https://www.eilun.de/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Website besuchen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wichtige Hinweise */}
          <div className="bg-amber-50 rounded-xl p-6 mb-10 border border-amber-100">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-3">Wichtige Hinweise zur Anreise</h3>
                <ul className="space-y-2">
                  {importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bootstouren */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Unsere Bootstouren</h3>
          
          <motion.div 
            className="grid grid-cols-1 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {boatTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                variants={itemVariants}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-[240px] md:h-auto">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                      <h4 className="text-xl font-bold">{tour.title}</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {tour.duration}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{tour.description}</p>
                    
                    {tour.highlight && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm text-gray-700">
                        <Info className="h-4 w-4 text-blue-600 inline-block mr-1.5 mb-0.5" />
                        {tour.highlight}
                      </div>
                    )}
                    
                    <div className="border-t border-gray-100 pt-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500 mb-1">Erwachsene</p>
                          <p className="font-semibold">{tour.prices.adult}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500 mb-1">Kinder</p>
                          <p className="font-semibold">{tour.prices.child}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500 mb-1">Familienkarte</p>
                          <p className="font-semibold">{tour.prices.family}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Familienkarte gilt nur für eigene Kinder von 4-14 Jahren</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Preisübersicht Tabelle */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Preisübersicht aller Touren</h3>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <Table>
              <TableCaption>
                Familienkarte gilt nur für eigene Kinder von 4-14 Jahren
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Tour</TableHead>
                  <TableHead>Dauer</TableHead>
                  <TableHead>Erwachsene</TableHead>
                  <TableHead>Kinder</TableHead>
                  <TableHead>Familienkarte</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boatTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="font-medium">{tour.title}</TableCell>
                    <TableCell>{tour.duration}</TableCell>
                    <TableCell>{tour.prices.adult}</TableCell>
                    <TableCell>{tour.prices.child}</TableCell>
                    <TableCell>{tour.prices.family}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Weitere Informationen */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Ship className="h-5 w-5 mr-2 text-blue-600" />
            Erlebnisse an Bord der MS Eilun
          </h3>
          <p className="text-gray-600 mb-4">
            Die Touren mit der MS Eilun sind mehr als nur eine Fahrt auf dem Wasser. Erleben Sie die 
            einzigartige Natur des Wattenmeers, beobachten Sie Seehunde in ihrer natürlichen Umgebung 
            und entdecken Sie die faszinierenden Halligen mit ihrer besonderen Lebensweise.
          </p>
          <p className="text-gray-600 mb-4">
            Während der Fahrt erzählt die Crew spannende Geschichten über alte Sturmfluten und 
            das moderne Tierleben. Jede Tour bietet einzigartige Einblicke in das UNESCO-Weltnaturerbe 
            Wattenmeer und seine Bewohner.
          </p>
          <p className="text-gray-600">
            Für Fragen steht die freundliche Besatzung der MS Eilun jederzeit zur Verfügung - 
            fragen Sie einfach!
          </p>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Bereit für Ihr Wattenmeer-Abenteuer?</h3>
          <p className="text-gray-600 mb-4">
            Erleben Sie unvergessliche Ausflüge zu den Seehundsbänken, den Halligen oder rund um Amrum. 
            Informieren Sie sich auf der offiziellen Website der MS Eilun über aktuelle Termine und Abfahrtszeiten.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/urlaub/aktivitaeten">Zurück zur Übersicht</Link>
            </Button>
            <Button variant="outline" asChild className="border-blue-200 bg-blue-50 hover:bg-blue-100">
              <a href="https://www.eilun.de/" target="_blank" rel="noopener noreferrer">
                Fahrplan & Termine
              </a>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 