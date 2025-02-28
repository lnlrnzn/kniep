"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, History, Leaf, CloudSun, Info, ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InteractiveMap from "../../components/map/InteractiveMap";
import { ContentContainer } from "../../components/ui/content-container";

// Fakten über Amrum
const amrumFacts = [
  { value: "20,46", label: "Quadratkilometer Fläche", icon: <Compass className="h-5 w-5 mb-1" /> },
  { value: "~1.300", label: "Einwohner", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
  { value: "~10 km", label: "Länge der Insel", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 6H3"></path><path d="M21 12H3"></path><path d="M21 18H3"></path></svg> },
  { value: "~2,5 km", label: "Breite der Insel", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"></path><path d="M6 9l6-6 6 6"></path><path d="M6 15l6 6 6-6"></path></svg> },
  { value: "5", label: "Dörfer auf der Insel", icon: <MapPin className="h-5 w-5 mb-1" /> },
  { value: "1890", label: "Erbaut wurde der Leuchtturm", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="m8 6 4-4 4 4"></path><path d="M16 18a4 4 0 0 0-8 0"></path></svg> }
];

export default function UeberAmrumPage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <ContentContainer className="py-12">
        <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Über Amrum</span>
        </div>

        {/* Hero Section with improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1.5 border-primary/30 bg-primary/5 text-primary-foreground">
              Nordfriesische Insel
            </Badge>
            <h1 className="text-4xl font-bold mb-6 leading-tight">Entdecken Sie die <span className="text-primary italic">Perle der Nordsee</span></h1>
            <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
              Amrum ist eine der Nordfriesischen Inseln im Wattenmeer der Nordsee und gehört zum 
              Kreis Nordfriesland in Schleswig-Holstein. Mit ihren ausgedehnten Sandstränden, 
              malerischen Dörfern und einzigartiger Natur ist sie ein beliebtes Urlaubsziel für 
              Naturliebhaber und Erholungssuchende.
            </p>
            <p className="mb-8 text-muted-foreground">
              Die Insel besticht durch ihre Vielfalt: Im Westen erstreckt sich der Kniepsand, 
              einer der breitesten Sandstrände Europas. Im Osten liegt das Wattenmeer, das zum 
              UNESCO-Weltnaturerbe gehört. Dazwischen finden Sie charmante Dörfer mit 
              typisch friesischer Architektur, ausgedehnte Dünenlandschaften und 
              artenreiche Naturschutzgebiete.
            </p>
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link href="/ueber-amrum/geschichte" className="flex items-center">
                  Geschichte entdecken
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link href="/ueber-amrum/karte">Zur interaktiven Karte</Link>
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
              src="/amrum-luftaufnahme.jpg"
              alt="Luftaufnahme von Amrum"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-sm font-medium mb-1">Blick auf Amrum</div>
              <div className="text-xs opacity-80">Foto: © Amrum Tourismus</div>
            </div>
          </motion.div>
        </div>

        {/* Amrum Fakten - improved with icons and better responsive design */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Amrum in Zahlen</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entdecken Sie interessante Fakten über die Nordseeinsel Amrum
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {amrumFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-muted/40 p-5 text-center flex flex-col items-center justify-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
              >
                <div className="text-primary">
                  {fact.icon}
                </div>
                <div className="text-2xl font-bold text-primary mt-2">{fact.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Entdecken-Tabs - improved visuals and responsiveness */}
        <div className="mb-20 bg-white rounded-2xl p-8 shadow-sm border border-muted/40">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Entdecken Sie Amrum</h2>
          <p className="text-muted-foreground mb-8">Tauchen Sie ein in die verschiedenen Facetten unserer Nordseeinsel</p>
          <Tabs defaultValue="natur" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-2 sm:grid-cols-4 mb-10 bg-white rounded-full shadow-sm overflow-hidden">
              <TabsTrigger 
                value="natur" 
                className="flex flex-col items-center justify-center py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-primary relative"
              >
                <Leaf className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">Natur</span>
              </TabsTrigger>
              <TabsTrigger 
                value="klima" 
                className="flex flex-col items-center justify-center py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-primary relative"
              >
                <CloudSun className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">Klima</span>
              </TabsTrigger>
              <TabsTrigger 
                value="orte" 
                className="flex flex-col items-center justify-center py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-primary relative"
              >
                <MapPin className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">Orte</span>
              </TabsTrigger>
              <TabsTrigger 
                value="geschichte" 
                className="flex flex-col items-center justify-center py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-primary relative"
              >
                <History className="h-5 w-5 mb-1" />
                <span className="text-sm font-medium">Geschichte</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="natur">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/amrum-duenen.jpg"
                    alt="Dünenlandschaft auf Amrum"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 text-xs px-2 py-0.5 border-green-500/30 bg-green-50 text-green-800 font-medium">
                    UNESCO Weltnaturerbe
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">Einzigartige Natur</h3>
                  <p className="mb-4 text-muted-foreground">
                    Amrum begeistert mit einer beeindruckenden Naturlandschaft. Die Insel ist bekannt für ihre 
                    ausgedehnten Dünenlandschaften, die zu den größten Nordeuropas zählen. Hier finden zahlreiche 
                    seltene Pflanzen- und Tierarten ein geschütztes Zuhause.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    Der &quot;Kniepsand&quot; im Westen der Insel ist mit einer Breite von bis zu zwei Kilometern 
                    einer der breitesten Sandstrände Europas und lädt zu ausgedehnten Spaziergängen ein.
                  </p>
                  <p className="text-muted-foreground">
                    Im Osten erstreckt sich das UNESCO-Weltnaturerbe Wattenmeer, das bei Ebbe 
                    faszinierende Einblicke in einen einzigartigen Lebensraum bietet. Geführte Wattwanderungen 
                    ermöglichen es, diese besondere Welt zu entdecken.
                  </p>
                  <Button asChild variant="link" className="mt-6 p-0 text-primary">
                    <Link href="/ueber-amrum/natur" className="flex items-center">
                      Mehr über Amrums Natur erfahren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="klima">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-2 text-xs px-2 py-0.5 border-blue-500/30 bg-blue-50 text-blue-800 font-medium">
                    Heilsames Klima
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">Nordseeklima</h3>
                  <p className="mb-4 text-muted-foreground">
                    Amrum genießt ein typisches Nordseeklima mit milden Temperaturen und hoher Luftqualität.
                    Die Sommer sind angenehm warm mit Durchschnittstemperaturen von 17-20°C, 
                    während die Winter mit etwa 1-3°C vergleichsweise mild ausfallen.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    Charakteristisch für das Inselklima ist der stetige Wind, der für frische, 
                    sauerstoffreiche Luft sorgt. Die Nordseeluft ist besonders allergenarm und 
                    reich an Aerosolen, was sie besonders heilsam bei Atemwegserkrankungen macht.
                  </p>
                  <p className="text-muted-foreground">
                    Mit durchschnittlich 1.700 Sonnenstunden pro Jahr gehört Amrum zu den 
                    sonnenreichsten Regionen in Norddeutschland. Die beste Reisezeit liegt 
                    zwischen Mai und September, wobei auch die Nebensaison mit ihrer Ruhe 
                    und besonderen Stimmung einen Besuch wert ist.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/amrum-wetter.jpg"
                    alt="Wetter auf Amrum"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orte">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src="/orte/nebel.jpg" 
                      alt="Nebel auf Amrum" 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      Nebel
                    </CardTitle>
                    <CardDescription>Historisches Zentrum</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Das zentral gelegene Dorf mit der St. Clemens-Kirche aus dem 13. Jahrhundert 
                      und dem Öömrang Hüs, einem Friesenhaus-Museum, gibt Einblicke in die Geschichte 
                      der Insel.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src="/orte/norddorf.jpg" 
                      alt="Norddorf auf Amrum" 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      Norddorf
                    </CardTitle>
                    <CardDescription>Wellness & Erholung</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Das nördlichste Dorf bietet einen beschaulichen Ortskern und ist bekannt für seine 
                      Wellness- und Gesundheitsangebote sowie die Nähe zu den schönsten Dünenlandschaften.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src="/orte/wittduen.jpg" 
                      alt="Wittdün auf Amrum" 
                      fill 
                      className="object-cover transition-transform duration-500 hover:scale-105" 
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      Wittdün
                    </CardTitle>
                    <CardDescription>Haupthafen & Promenade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Der Hauptfährhafen im Süden der Insel empfängt die Besucher mit seiner 
                      Promenade, zahlreichen Geschäften und Restaurants sowie direktem Zugang 
                      zum Kniepsand.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-8">
                <Button asChild size="lg" className="font-medium">
                  <Link href="/ueber-amrum/orte" className="flex items-center">
                    Alle Orte entdecken
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="geschichte">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/amrum-geschichte.jpg"
                    alt="Historisches Amrum"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2 text-xs px-2 py-0.5 border-amber-500/30 bg-amber-50 text-amber-800 font-medium">
                    Seit der Steinzeit besiedelt
                  </Badge>
                  <h3 className="text-xl font-bold mb-4">Reiche Geschichte</h3>
                  <p className="mb-4 text-muted-foreground">
                    Die Besiedlungsgeschichte Amrums reicht bis in die Steinzeit zurück. 
                    Zahlreiche archäologische Funde wie Hügelgräber und Steinzeitdolmen zeugen 
                    von der frühen Besiedlung der Insel.
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    Im Mittelalter war Amrum Teil des friesischen Siedlungsgebiets und wurde 
                    später vom dänischen Königreich regiert. Die Bevölkerung lebte hauptsächlich 
                    vom Fischfang, der Seefahrt und später vom Walfang.
                  </p>
                  <p className="text-muted-foreground">
                    Seit dem 19. Jahrhundert entwickelte sich der Tourismus zu einem wichtigen 
                    Wirtschaftszweig. Heute ist Amrum ein beliebtes Urlaubsziel, das seine friesische 
                    Kultur und Traditionen bewahrt hat.
                  </p>
                  <Button asChild variant="link" className="mt-6 p-0 text-primary">
                    <Link href="/ueber-amrum/geschichte" className="flex items-center">
                      Die Geschichte Amrums erkunden
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Interaktive Karte mit verbessertem Styling */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Interaktive Karte</h2>
              <p className="text-muted-foreground mt-1">Erkunden Sie Amrum und entdecken Sie interessante Orte</p>
            </div>
            <Button asChild variant="outline" size="lg" className="font-medium">
              <Link href="/ueber-amrum/karte" className="flex items-center">
                Zur Vollbild-Karte
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-muted/40">
            <InteractiveMap />
          </div>
        </div>

        {/* FAQ-Teaser mit besserer Gestaltung */}
        <Card className="bg-white shadow-md border border-muted/40 mb-6 overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full -mt-10 -mr-10"></div>
          <div className="absolute left-0 bottom-0 w-24 h-24 bg-primary/5 rounded-full -mb-8 -ml-8"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Häufig gestellte Fragen</CardTitle>
            </div>
            <CardDescription className="mt-1">Informationen rund um Ihren Aufenthalt auf Amrum</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2 font-bold">Q</span>
                  Wie komme ich nach Amrum?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Amrum ist per Fähre von Dagebüll auf dem Festland zu erreichen. In der Hauptsaison 
                  gibt es mehrere Fährverbindungen täglich. Alternativ können Sie auch über Föhr anreisen.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2 font-bold">Q</span>
                  Wann ist die beste Reisezeit?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Die Hauptsaison liegt zwischen Mai und September. Für Ruhesuchende empfehlen sich die 
                  Nebensaisonmonate April, Mai, September und Oktober.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2 font-bold">Q</span>
                  Gibt es Fahrräder zu mieten?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ja, in allen Orten auf Amrum gibt es Fahrradverleihstationen. Fahrräder sind das 
                  ideale Verkehrsmittel, um die Insel zu erkunden.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-2 font-bold">Q</span>
                  Ist Amrum für Kinder geeignet?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Absolut! Die flachen Strände, zahlreichen Freizeitangebote und die sichere Umgebung 
                  machen Amrum zu einem perfekten Familienurlaubsziel.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button asChild size="lg" className="font-medium">
              <Link href="/ueber-amrum/faq" className="flex items-center">
                Alle FAQs ansehen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </ContentContainer>
    </div>
  );
} 