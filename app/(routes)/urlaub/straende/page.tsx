"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Umbrella, Sun, Wind, Trees, Fish, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentContainer } from "../../../components/ui/content-container";

// Strand-Informationen mit Features
interface Beach {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  location: string;
  image: string;
  features: {
    icon: React.ReactNode;
    label: string;
  }[];
  highlights: string[];
  bestTime: string;
}

const beaches: Beach[] = [
  {
    id: "kniepsand",
    name: "Kniepsand",
    description: "Einer der breitesten Sandstrände Europas mit feinem, weißem Sand und Dünenlandschaft.",
    longDescription: "Der Kniepsand ist die Hauptattraktion von Amrum und erstreckt sich über die gesamte Westküste der Insel. Mit einer Breite von bis zu 2 Kilometern ist er einer der breitesten Sandstrände Europas. Der feine, weiße Sand lädt zum Sonnenbaden, Spazierengehen und Entspannen ein. Die Weite des Strandes bietet auch an stark besuchten Tagen genug Platz für jeden Besucher. Die vorgelagerten Dünen bieten Windschutz und sind ein wichtiges Naturschutzgebiet mit einzigartiger Flora und Fauna.",
    location: "Westseite der Insel, von Norddorf bis Wittdün",
    image: "/straende/kniepsand.jpg",
    features: [
      { icon: <Sun className="h-5 w-5" />, label: "Sonnenbaden" },
      { icon: <Umbrella className="h-5 w-5" />, label: "Strandkörbe" },
      { icon: <Wind className="h-5 w-5" />, label: "Wassersport" },
      { icon: <Trees className="h-5 w-5" />, label: "Dünenlandschaft" }
    ],
    highlights: [
      "Bewachter Badebereich mit DLRG",
      "Strandkorbvermietung",
      "Barrierefreie Zugänge in Wittdün",
      "Gastronomie in Strandnähe"
    ],
    bestTime: "Mai bis September"
  },
  {
    id: "suedufer",
    name: "Südufer bei Wittdün",
    description: "Ruhiger Strand mit Blick auf das Watt und die Nachbarinsel Föhr.",
    longDescription: "Das Südufer bei Wittdün bietet einen völlig anderen Strandtyp als die Westküste. Hier erleben Sie das Wattenmeer mit seinen charakteristischen Ebbe- und Flutphasen. Bei Ebbe können Sie weit ins Watt hinauswandern und die faszinierende Unterwasserwelt entdecken. Der Strand ist besonders bei Familien mit kleinen Kindern beliebt, da das Wasser bei Flut sehr flach und ruhig ist. Von hier aus haben Sie auch einen wunderbaren Blick auf die Nachbarinsel Föhr.",
    location: "Südküste bei Wittdün",
    image: "/straende/suedufer.jpg",
    features: [
      { icon: <Fish className="h-5 w-5" />, label: "Wattwandern" },
      { icon: <Sun className="h-5 w-5" />, label: "Sonnenbaden" },
      { icon: <Umbrella className="h-5 w-5" />, label: "Strandkörbe" }
    ],
    highlights: [
      "Ideal für Familien mit kleinen Kindern",
      "Wattwanderungen möglich",
      "Ruhigeres Wasser als an der Westküste",
      "Nähe zum Ortskern von Wittdün"
    ],
    bestTime: "April bis Oktober"
  },
  {
    id: "norddorfer-strand",
    name: "Norddorfer Strand",
    description: "Beliebter Strandabschnitt im Norden mit guter Infrastruktur und Wassersportmöglichkeiten.",
    longDescription: "Der Norddorfer Strand ist der nördliche Teil des Kniepsandes und zeichnet sich durch seine besonders gute Infrastruktur aus. Hier finden Sie zahlreiche Strandkörbe, eine Strandbar und verschiedene Wassersportangebote. Der Strand ist besonders bei aktiven Urlaubern beliebt, die Windsurfen, Kitesurfen oder Stand-Up-Paddling ausprobieren möchten. Die Strandkorbvermietung, Toiletten und Duschen sowie die Rettungsschwimmer sorgen für einen komfortablen und sicheren Strandtag.",
    location: "Nordwestküste bei Norddorf",
    image: "/straende/norddorfer-strand.jpg",
    features: [
      { icon: <Sun className="h-5 w-5" />, label: "Sonnenbaden" },
      { icon: <Umbrella className="h-5 w-5" />, label: "Strandkörbe" },
      { icon: <Wind className="h-5 w-5" />, label: "Wassersport" },
      { icon: <Waves className="h-5 w-5" />, label: "Wellenreiten" }
    ],
    highlights: [
      "Surfschule und Materialverleih",
      "Strandkiosk und -bar",
      "Regelmäßige Beachvolleyball-Turniere im Sommer",
      "Gute Anbindung an den Ort Norddorf"
    ],
    bestTime: "Mai bis September"
  }
];

export default function StrandePage() {
  const [selectedBeach, setSelectedBeach] = useState<string>(beaches[0].id);
  
  // Finden des ausgewählten Strandes
  const currentBeach = beaches.find(beach => beach.id === selectedBeach) || beaches[0];

  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/urlaub" className="hover:text-foreground transition-colors">
          Urlaub
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Strände</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Die traumhaften Strände von Amrum</h1>
        <p className="text-lg text-muted-foreground">
          Entdecken Sie die atemberaubenden Strände unserer Insel. Von endlosen Sandstränden 
          an der Westküste bis zu ruhigen Buchten am Wattenmeer – Amrum bietet für jeden 
          Geschmack das perfekte Strandvergnügen.
        </p>
      </motion.div>

      {/* Hero mit großem Bild */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-[50vh] min-h-[400px] rounded-xl overflow-hidden mb-16"
      >
        <Image
          src="/straende/hero.jpg"
          alt="Traumstrände auf Amrum"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="px-4 sm:px-6 lg:px-8 w-full pb-10 text-white">
            <h2 className="text-3xl font-bold mb-2">Kniepsand - Der Stolz Amrums</h2>
            <p className="max-w-2xl">
              Mit einer Breite von bis zu 2 Kilometern gehört er zu den breitesten Sandstränden Europas
              und bietet einzigartige Naturerlebnisse.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs für die verschiedenen Strände */}
      <Tabs
        value={selectedBeach}
        onValueChange={setSelectedBeach}
        className="mb-12"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Unsere Strandempfehlungen</h2>
          <div className="overflow-hidden">
            <TabsList className="flex flex-wrap justify-start gap-2 p-1">
              {beaches.map((beach) => (
                <TabsTrigger 
                  key={beach.id} 
                  value={beach.id}
                  className="px-4"
                >
                  {beach.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {beaches.map((beach) => (
          <TabsContent key={beach.id} value={beach.id} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={beach.image}
                  alt={beach.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{beach.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    <span className="font-medium">Lage:</span> {beach.location}
                  </p>
                  <p>{beach.longDescription}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ausstattung und Angebote:</h4>
                  <div className="flex flex-wrap gap-2">
                    {beach.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                        {feature.icon}
                        <span>{feature.label}</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Highlights:</h4>
                  <ul className="space-y-1">
                    {beach.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-primary mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Beste Reisezeit:</h4>
                  <p>{beach.bestTime}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Tipps für den Strandbesuch */}
      <Card className="bg-primary/5 border-primary/10">
        <CardHeader>
          <CardTitle>Tipps für Ihren Strandbesuch</CardTitle>
          <CardDescription>
            Damit Ihr Tag am Strand unvergesslich wird
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Sonnenschutz nicht vergessen</h3>
            <p className="text-sm text-muted-foreground">
              Die Sonneneinstrahlung am Meer ist intensiv. Denken Sie an ausreichend Sonnencreme, 
              eine Kopfbedeckung und eventuell einen Sonnenschirm.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Strandkorbmiete frühzeitig planen</h3>
            <p className="text-sm text-muted-foreground">
              In der Hauptsaison sind Strandkörbe sehr begehrt. Reservieren Sie am besten 
              schon vor Ihrem Urlaub oder direkt am ersten Urlaubstag.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Gezeitenkalender beachten</h3>
            <p className="text-sm text-muted-foreground">
              Besonders an der Wattseite sollten Sie die Gezeiten im Blick haben. 
              Informieren Sie sich vor Strandwanderungen über Ebbe und Flut.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Naturschutz respektieren</h3>
            <p className="text-sm text-muted-foreground">
              Viele Bereiche der Strände sind Naturschutzgebiete. Bitte bleiben Sie auf 
              den markierten Wegen und respektieren Sie die Dünenvegetation.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">Für alle Wetterbedingungen gerüstet sein</h3>
            <p className="text-sm text-muted-foreground">
              Das Wetter an der Nordsee kann schnell umschlagen. Packen Sie auch bei 
              Sonnenschein immer eine leichte Jacke ein.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-medium">FKK-Bereiche beachten</h3>
            <p className="text-sm text-muted-foreground">
              Amrum hat ausgewiesene FKK-Bereiche. Diese sind gut gekennzeichnet und 
              befinden sich meist in ruhigeren Strandabschnitten.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/kontakt">Weitere Strandtipps anfragen</Link>
          </Button>
        </CardFooter>
      </Card>
    </ContentContainer>
  );
} 