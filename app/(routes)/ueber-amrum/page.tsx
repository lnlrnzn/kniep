"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, History, Leaf, CloudSun, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveMap from "../../components/map/InteractiveMap";
import { ContentContainer } from "../../components/ui/content-container";

// Fakten über Amrum
const amrumFacts = [
  { value: "20,46", label: "Quadratkilometer Fläche" },
  { value: "~1.300", label: "Einwohner" },
  { value: "~10 km", label: "Länge der Insel" },
  { value: "~2,5 km", label: "Breite der Insel" },
  { value: "5", label: "Dörfer auf der Insel" },
  { value: "1890", label: "Erbaut wurde der Leuchtturm" }
];

export default function UeberAmrumPage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Über Amrum</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6">Entdecken Sie Amrum</h1>
          <p className="text-lg mb-6">
            Amrum ist eine der Nordfriesischen Inseln im Wattenmeer der Nordsee und gehört zum 
            Kreis Nordfriesland in Schleswig-Holstein. Mit ihren ausgedehnten Sandstränden, 
            malerischen Dörfern und einzigartiger Natur ist sie ein beliebtes Urlaubsziel für 
            Naturliebhaber und Erholungssuchende.
          </p>
          <p className="mb-8">
            Die Insel besticht durch ihre Vielfalt: Im Westen erstreckt sich der Kniepsand, 
            einer der breitesten Sandstrände Europas. Im Osten liegt das Wattenmeer, das zum 
            UNESCO-Weltnaturerbe gehört. Dazwischen finden Sie charmante Dörfer mit 
            typisch friesischer Architektur, ausgedehnte Dünenlandschaften und 
            artenreiche Naturschutzgebiete.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/ueber-amrum/geschichte">Geschichte entdecken</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/ueber-amrum/karte">Zur interaktiven Karte</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
        >
          <Image
            src="/amrum-luftaufnahme.jpg"
            alt="Luftaufnahme von Amrum"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Amrum Fakten */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Amrum in Zahlen</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {amrumFacts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary/5 p-4 rounded-lg text-center"
            >
              <div className="text-2xl font-bold text-primary">{fact.value}</div>
              <div className="text-sm text-muted-foreground">{fact.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Entdecken-Tabs */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Entdecken Sie Amrum</h2>
        <Tabs defaultValue="natur" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
            <TabsTrigger value="natur" className="flex flex-col items-center gap-1">
              <Leaf className="h-5 w-5" />
              <span className="text-xs">Natur</span>
            </TabsTrigger>
            <TabsTrigger value="klima" className="flex flex-col items-center gap-1">
              <CloudSun className="h-5 w-5" />
              <span className="text-xs">Klima</span>
            </TabsTrigger>
            <TabsTrigger value="orte" className="flex flex-col items-center gap-1">
              <MapPin className="h-5 w-5" />
              <span className="text-xs">Orte</span>
            </TabsTrigger>
            <TabsTrigger value="geschichte" className="flex flex-col items-center gap-1">
              <History className="h-5 w-5" />
              <span className="text-xs">Geschichte</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="natur">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/amrum-duenen.jpg"
                  alt="Dünenlandschaft auf Amrum"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Einzigartige Natur</h3>
                <p className="mb-4">
                  Amrum begeistert mit einer beeindruckenden Naturlandschaft. Die Insel ist bekannt für ihre 
                  ausgedehnten Dünenlandschaften, die zu den größten Nordeuropas zählen. Hier finden zahlreiche 
                  seltene Pflanzen- und Tierarten ein geschütztes Zuhause.
                </p>
                <p className="mb-4">
                  Der "Kniepsand" im Westen der Insel ist mit einer Breite von bis zu zwei Kilometern 
                  einer der breitesten Sandstrände Europas und lädt zu ausgedehnten Spaziergängen ein.
                </p>
                <p>
                  Im Osten erstreckt sich das UNESCO-Weltnaturerbe Wattenmeer, das bei Ebbe 
                  faszinierende Einblicke in einen einzigartigen Lebensraum bietet. Geführte Wattwanderungen 
                  ermöglichen es, diese besondere Welt zu entdecken.
                </p>
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/ueber-amrum/natur">Mehr über Amrums Natur erfahren</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="klima">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">Nordseeklima</h3>
                <p className="mb-4">
                  Amrum genießt ein typisches Nordseeklima mit milden Temperaturen und hoher Luftqualität.
                  Die Sommer sind angenehm warm mit Durchschnittstemperaturen von 17-20°C, 
                  während die Winter mit etwa 1-3°C vergleichsweise mild ausfallen.
                </p>
                <p className="mb-4">
                  Charakteristisch für das Inselklima ist der stetige Wind, der für frische, 
                  sauerstoffreiche Luft sorgt. Die Nordseeluft ist besonders allergenarm und 
                  reich an Aerosolen, was sie besonders heilsam bei Atemwegserkrankungen macht.
                </p>
                <p>
                  Mit durchschnittlich 1.700 Sonnenstunden pro Jahr gehört Amrum zu den 
                  sonnenreichsten Regionen in Norddeutschland. Die beste Reisezeit liegt 
                  zwischen Mai und September, wobei auch die Nebensaison mit ihrer Ruhe 
                  und besonderen Stimmung einen Besuch wert ist.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/amrum-wetter.jpg"
                  alt="Wetter auf Amrum"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orte">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/orte/nebel.jpg" 
                    alt="Nebel auf Amrum" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardHeader>
                  <CardTitle>Nebel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Das zentral gelegene Dorf mit der St. Clemens-Kirche aus dem 13. Jahrhundert 
                    und dem Öömrang Hüs, einem Friesenhaus-Museum, gibt Einblicke in die Geschichte 
                    der Insel.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/orte/norddorf.jpg" 
                    alt="Norddorf auf Amrum" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardHeader>
                  <CardTitle>Norddorf</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Das nördlichste Dorf bietet einen beschaulichen Ortskern und ist bekannt für seine 
                    Wellness- und Gesundheitsangebote sowie die Nähe zu den schönsten Dünenlandschaften.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src="/orte/wittduen.jpg" 
                    alt="Wittdün auf Amrum" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <CardHeader>
                  <CardTitle>Wittdün</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Der Hauptfährhafen im Süden der Insel empfängt die Besucher mit seiner 
                    Promenade, zahlreichen Geschäften und Restaurants sowie direktem Zugang 
                    zum Kniepsand.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-6">
              <Button asChild variant="link">
                <Link href="/ueber-amrum/orte">Alle Orte entdecken</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="geschichte">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/amrum-geschichte.jpg"
                  alt="Historisches Amrum"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Reiche Geschichte</h3>
                <p className="mb-4">
                  Die Besiedlungsgeschichte Amrums reicht bis in die Steinzeit zurück. 
                  Zahlreiche archäologische Funde wie Hügelgräber und Steinzeitdolmen zeugen 
                  von der frühen Besiedlung der Insel.
                </p>
                <p className="mb-4">
                  Im Mittelalter war Amrum Teil des friesischen Siedlungsgebiets und wurde 
                  später vom dänischen Königreich regiert. Die Bevölkerung lebte hauptsächlich 
                  vom Fischfang, der Seefahrt und später vom Walfang.
                </p>
                <p>
                  Seit dem 19. Jahrhundert entwickelte sich der Tourismus zu einem wichtigen 
                  Wirtschaftszweig. Heute ist Amrum ein beliebtes Urlaubsziel, das seine friesische 
                  Kultur und Traditionen bewahrt hat.
                </p>
                <Button asChild variant="link" className="mt-4 p-0">
                  <Link href="/ueber-amrum/geschichte">Die Geschichte Amrums erkunden</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Interaktive Karte */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Interaktive Karte</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/ueber-amrum/karte">Zur Vollbild-Karte</Link>
          </Button>
        </div>
        <InteractiveMap />
      </div>

      {/* FAQ-Teaser */}
      <Card className="bg-muted/30 mb-16">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle>Häufig gestellte Fragen</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-1">Wie komme ich nach Amrum?</h3>
              <p className="text-sm text-muted-foreground">
                Amrum ist per Fähre von Dagebüll auf dem Festland zu erreichen. In der Hauptsaison 
                gibt es mehrere Fährverbindungen täglich. Alternativ können Sie auch über Föhr anreisen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Wann ist die beste Reisezeit?</h3>
              <p className="text-sm text-muted-foreground">
                Die Hauptsaison liegt zwischen Mai und September. Für Ruhesuchende empfehlen sich die 
                Nebensaisonmonate April, Mai, September und Oktober.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Gibt es Fahrräder zu mieten?</h3>
              <p className="text-sm text-muted-foreground">
                Ja, in allen Orten auf Amrum gibt es Fahrradverleihstationen. Fahrräder sind das 
                ideale Verkehrsmittel, um die Insel zu erkunden.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Ist Amrum für Kinder geeignet?</h3>
              <p className="text-sm text-muted-foreground">
                Absolut! Die flachen Strände, zahlreichen Freizeitangebote und die sichere Umgebung 
                machen Amrum zu einem perfekten Familienurlaubsziel.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/ueber-amrum/faq">Alle FAQs ansehen</Link>
          </Button>
        </CardFooter>
      </Card>
    </ContentContainer>
  );
} 