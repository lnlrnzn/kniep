"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Leaf, Trees, Fish, Bird, Camera, Map, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentContainer } from "../../../components/ui/content-container";

// Naturschutzgebiete auf Amrum
const natureReserves = [
  {
    name: "Amrumer Dünen",
    area: "ca. 600 Hektar",
    description: "Ausgedehnte Dünenlandschaft im Westen der Insel mit seltenen Pflanzen und einer vielfältigen Insektenfauna.",
    image: "/natur/duenen.jpg"
  },
  {
    name: "Amrumer Wattenmeer",
    area: "Teil des Nationalparks Schleswig-Holsteinisches Wattenmeer",
    description: "UNESCO-Weltnaturerbe mit einzigartigen Lebensräumen für Meeresorganismen, Fische und Wasservögel.",
    image: "/natur/wattenmeer.jpg"
  },
  {
    name: "Vogelschutzgebiet Amrum",
    area: "Mehrere Bereiche, insgesamt ca. 400 Hektar",
    description: "Wichtige Brut- und Rastplätze für Strand- und Seevögel wie Austernfischer, Möwen und Seeschwalben.",
    image: "/natur/vogelschutz.jpg"
  }
];

export default function NaturPage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <ContentContainer className="py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/ueber-amrum" className="hover:text-foreground transition-colors">
            Über Amrum
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Natur</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 border-green-500/30 bg-green-50 text-green-800">
              UNESCO Weltnaturerbe
            </Badge>
            <h1 className="text-4xl font-bold mb-6 leading-tight">Die <span className="text-green-600 italic">einzigartige Natur</span> von Amrum</h1>
            <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
              Amrum begeistert mit einer beeindruckenden Naturlandschaft aus weitläufigen Dünen, dem Wattenmeer
              und artenreichen Tier- und Pflanzenwelten. Entdecken Sie ein einzigartiges Naturparadies, das
              Ihnen unvergessliche Eindrücke und Erlebnisse bietet.
            </p>
            <p className="mb-8 text-muted-foreground">
              Die Insel ist ein bedeutender Teil des Nationalparks Schleswig-Holsteinisches Wattenmeer
              und UNESCO-Weltnaturerbe. Hier finden zahlreiche seltene und bedrohte Arten einen geschützten Lebensraum,
              während Besucher die Schönheit der ursprünglichen Natur erleben können.
            </p>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="font-medium bg-green-600 hover:bg-green-700">
                <Link href="#naturschutz" className="flex items-center">
                  Naturschutzgebiete erkunden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium border-green-600/20 text-green-700">
                <Link href="#aktivitaeten">Naturaktivitäten</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/natur/amrum-natur-hero.jpg"
              alt="Naturlandschaft auf Amrum"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-sm font-medium mb-1">Dünenlandschaft auf Amrum</div>
              <div className="text-xs opacity-80">Foto: © Amrum Tourismus</div>
            </div>
          </motion.div>
        </div>

        {/* Highlights der Natur */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Highlights der Amrumer Natur</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entdecken Sie die beeindruckende Vielfalt der natürlichen Umgebung Amrums
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-muted/40 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src="/natur/kniepsand.jpg" 
                  alt="Kniepsand Strand auf Amrum" 
                  fill 
                  className="object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trees className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-lg">Kniepsand & Dünen</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Der bis zu 2 km breite Kniepsand ist einer der breitesten Sandstrände Europas. Die dahinterliegende 
                  Dünenlandschaft beherbergt seltene Pflanzenarten und bietet Lebensraum für zahlreiche Tiere.
                </p>
                <Button asChild variant="link" className="mt-4 p-0 text-green-600">
                  <Link href="#" className="flex items-center">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-muted/40 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src="/natur/wattenmeer.jpg" 
                  alt="Wattenmeer bei Amrum" 
                  fill 
                  className="object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Fish className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-lg">Wattenmeer</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Das UNESCO-Weltnaturerbe Wattenmeer an der Ostseite Amrums bietet bei Ebbe faszinierende Einblicke 
                  in eine einzigartige Unterwasserwelt mit Krebsen, Muscheln und Wattwürmern.
                </p>
                <Button asChild variant="link" className="mt-4 p-0 text-green-600">
                  <Link href="#" className="flex items-center">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-muted/40 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src="/natur/vogelwelt.jpg" 
                  alt="Vogelwelt auf Amrum" 
                  fill 
                  className="object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bird className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-lg">Vogelwelt</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Amrum ist ein Paradies für Vogelbeobachter. Über 120 Vogelarten brüten hier, darunter Austernfischer,
                  Brandgänse und Seeschwalben. Zur Zugzeit rasten tausende von Zugvögeln auf der Insel.
                </p>
                <Button asChild variant="link" className="mt-4 p-0 text-green-600">
                  <Link href="#" className="flex items-center">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Flora und Fauna */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Flora & Fauna</h2>
            <p className="text-muted-foreground mb-8">
              Amrum beherbergt eine beeindruckende Vielfalt an Pflanzen und Tieren, die sich perfekt an die besonderen
              Bedingungen der Nordseeküste angepasst haben.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-50 text-green-600">
                    <Leaf className="h-5 w-5" />
                  </div>
                  Pflanzenwelt
                </h3>
                <p className="mb-4 text-muted-foreground">
                  In den Dünen finden Sie spezialisierte Pflanzen wie den Strandhafer, der mit seinen tiefen Wurzeln
                  die Dünen stabilisiert. Die Salzwiesen werden von salztoleranten Arten wie Queller und Strandaster 
                  dominiert, während in geschützten Bereichen sogar seltene Orchideenarten wachsen.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Strandhafer (Ammophila arenaria)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Silberdistel (Carlina vulgaris)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Krähenbeere (Empetrum nigrum)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Strandnelke (Armeria maritima)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-50 text-green-600">
                    <Bird className="h-5 w-5" />
                  </div>
                  Tierwelt
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Die Tierwelt Amrums ist ebenso vielfältig. Im Wattenmeer leben unzählige Kleinstlebewesen, Krebse 
                  und Muscheln. Seehunde können regelmäßig beobachtet werden, und die Vogelwelt ist mit über 120 
                  Brutvogelarten besonders reichhaltig.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Austernfischer (Haematopus ostralegus)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Seehund (Phoca vitulina)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Brandgans (Tadorna tadorna)</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <span>Sanderling (Calidris alba)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <Badge variant="outline" className="mb-2 text-xs px-2 py-0.5 border-amber-500/30 bg-amber-50 text-amber-800 font-medium">
                Wussten Sie schon?
              </Badge>
              <p className="text-sm text-muted-foreground italic">
                Amrum ist eine wichtige Brutkolonie für die Küstenseeschwalbe, die für ihre jährlichen Wanderungen zwischen 
                der Arktis und der Antarktis bekannt ist – die längste Zugstrecke aller Vögel.
              </p>
            </div>
          </div>
        </div>

        {/* Naturschutzgebiete */}
        <div id="naturschutz" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Naturschutzgebiete auf Amrum</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Große Teile der Insel Amrum stehen unter Naturschutz, um die einzigartige Landschaft und die vielfältige 
            Tier- und Pflanzenwelt zu bewahren.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {natureReserves.map((reserve, index) => (
              <Card key={index} className="border border-muted/40 hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={reserve.image} 
                    alt={reserve.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    {reserve.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{reserve.area}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{reserve.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">Mehr erfahren</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Naturaktivitäten */}
        <div id="aktivitaeten" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Naturaktivitäten</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Erleben Sie die Natur Amrums bei verschiedenen geführten oder eigenständigen Aktivitäten.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-muted/40 flex gap-5">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Map className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Geführte Wattwanderungen</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Entdecken Sie die faszinierende Welt des Wattenmeers unter fachkundiger Führung. Erfahren Sie mehr über 
                  dieses einzigartige Ökosystem und seine Bewohner.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary">April-Oktober</Badge>
                  <Badge variant="secondary">ca. 2-3 Stunden</Badge>
                  <Badge variant="secondary">Alle Altersgruppen</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-muted/40 flex gap-5">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Bird className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Vogelbeobachtungstouren</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Mit erfahrenen Ornithologen entdecken Sie die vielfältige Vogelwelt Amrums. Ferngläser werden zur Verfügung 
                  gestellt, eigene können gerne mitgebracht werden.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary">Ganzjährig</Badge>
                  <Badge variant="secondary">ca. 3-4 Stunden</Badge>
                  <Badge variant="secondary">Ab 8 Jahren</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-muted/40 flex gap-5">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Camera className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Natur-Fototouren</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Für Hobbyfotografen und Profis: Entdecken Sie die schönsten Fotomotive der Insel unter professioneller 
                  Anleitung zu den besten Tageszeiten für optimales Licht.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary">März-Oktober</Badge>
                  <Badge variant="secondary">Sonnenauf- oder -untergang</Badge>
                  <Badge variant="secondary">Eigene Kamera erforderlich</Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-muted/40 flex gap-5">
              <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Kräuter- und Pflanzenführungen</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lernen Sie die heimische Pflanzenwelt kennen und erfahren Sie mehr über ihre Verwendung in Küche und 
                  Naturheilkunde. Mit kleiner Verkostung von Wildkräutern.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary">April-September</Badge>
                  <Badge variant="secondary">ca. 2 Stunden</Badge>
                  <Badge variant="secondary">Für Erwachsene und Kinder ab 10</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="font-medium bg-green-600 hover:bg-green-700">
              <Link href="/urlaub/aktivitaeten" className="flex items-center">
                Alle Naturaktivitäten entdecken
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Hinweise für Besucher */}
        <div className="bg-green-50 rounded-xl p-8 shadow-sm border border-green-100 mb-6">
          <h2 className="text-xl font-bold mb-4 text-green-800">Hinweise für Naturliebhaber</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-800 mb-2">Respektieren Sie die Natur</h3>
              <p className="text-sm text-green-700 mb-4">
                Bitte bleiben Sie auf den markierten Wegen und respektieren Sie die Absperrungen zu den Brut- und 
                Rastplätzen der Vögel. Nehmen Sie Ihren Müll wieder mit und vermeiden Sie Lärm in sensiblen Naturgebieten.
              </p>
              <h3 className="font-medium text-green-800 mb-2">Beste Beobachtungszeiten</h3>
              <p className="text-sm text-green-700">
                Die frühen Morgenstunden und die Zeit kurz vor Sonnenuntergang sind ideal für Tierbeobachtungen und 
                bieten zudem das beste Licht für Naturfotografie.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-2">Ausrüstung</h3>
              <p className="text-sm text-green-700 mb-4">
                Für Naturerkundungen empfehlen wir festes Schuhwerk, wetterfeste Kleidung, Sonnenschutz und ein Fernglas. 
                Für Wattwanderungen sind Gummistiefel oder spezielle Wattwanderschuhe unerlässlich.
              </p>
              <h3 className="font-medium text-green-800 mb-2">Führungen & Informationen</h3>
              <p className="text-sm text-green-700">
                Aktuelle Informationen zu Führungen und Naturveranstaltungen erhalten Sie im Naturzentrum Amrum 
                sowie bei der Amrum Touristik. Viele Touren sollten vorab gebucht werden.
              </p>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
} 