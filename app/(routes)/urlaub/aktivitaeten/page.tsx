"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Compass, Waves, Bike, LandPlot, Wind, Calendar, Clock, MapPin, Users, Tag, Footprints } from "lucide-react";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentContainer } from "../../../components/ui/content-container";
import ActivityListWithFilters from "@/app/components/activities/ActivityListWithFilters";

// Define activity type
interface Activity {
  id: number;
  name: string;
  type: "nature" | "water" | "culture" | "active";
  season: string[];
  location: string;
  description: string;
  image: string;
  duration: string;
  suitable: string[];
  features: string[];
  booking: string;
  pricing: string;
}

// Sample data - would be replaced with actual data from a CMS or API
const activities: Activity[] = [
  {
    id: 1,
    name: "Geführte Wattwanderung",
    type: "nature",
    season: ["Frühling", "Sommer", "Herbst"],
    location: "Wattenmeer",
    description: "Entdecken Sie die faszinierende Welt des Wattenmeers mit einem erfahrenen Guide. Lernen Sie die einzigartige Flora und Fauna dieses UNESCO-Weltnaturerbes kennen.",
    image: "/images/activities/wattwanderung.jpg",
    duration: "ca. 2-3 Stunden",
    suitable: ["Familien", "Naturliebhaber", "Fotografen"],
    features: ["Geführt", "Lehrreich", "Naturerlebnis"],
    booking: "Voranmeldung erforderlich",
    pricing: "Erwachsene: 12€, Kinder (6-14): 6€"
  },
  {
    id: 2,
    name: "Fahrradtour um die Insel",
    type: "active",
    season: ["Frühling", "Sommer", "Herbst"],
    location: "Ganz Amrum",
    description: "Erkunden Sie Amrum auf zwei Rädern. Die gut ausgebauten Radwege führen Sie durch Dünenlandschaften, Wälder und idyllische Dörfer.",
    image: "/images/activities/fahrradtour.jpg",
    duration: "Halbtags oder ganztags",
    suitable: ["Alle Altersgruppen", "Aktive", "Familien"],
    features: ["Flexibel", "Naturerlebnis", "Sportlich"],
    booking: "Fahrradverleih vor Ort möglich",
    pricing: "Fahrradverleih ab 10€/Tag"
  },
  {
    id: 3,
    name: "Leuchtturm Besichtigung",
    type: "culture",
    season: ["Ganzjährig"],
    location: "Amrum-Leuchtturm",
    description: "Besteigen Sie den 41,8 Meter hohen Leuchtturm und genießen Sie einen atemberaubenden Panoramablick über die gesamte Insel und das Wattenmeer.",
    image: "/images/activities/leuchtturm.jpg",
    duration: "ca. 1 Stunde",
    suitable: ["Alle Altersgruppen", "Fotografen"],
    features: ["Historisch", "Aussichtspunkt", "Fotomotiv"],
    booking: "Keine Voranmeldung nötig",
    pricing: "Erwachsene: 4€, Kinder: 2€"
  },
  {
    id: 4,
    name: "Kitesurfen am Kniepsand",
    type: "water",
    season: ["Frühling", "Sommer", "Herbst"],
    location: "Kniepsand",
    description: "Erleben Sie den Adrenalinkick beim Kitesurfen an einem der besten Spots Deutschlands. Für Anfänger und Fortgeschrittene geeignet.",
    image: "/images/activities/kitesurfen.jpg",
    duration: "Kurse: 2-3 Stunden, Verleih: nach Bedarf",
    suitable: ["Sportbegeisterte", "Abenteuerlustige"],
    features: ["Actionreich", "Wassersport", "Kurse verfügbar"],
    booking: "Kurse mit Voranmeldung, Verleih vor Ort",
    pricing: "Schnupperkurs: 89€, Verleih: ab 50€/Tag"
  },
  {
    id: 5,
    name: "Vogelbeobachtung im Naturschutzgebiet",
    type: "nature",
    season: ["Ganzjährig", "besonders im Frühjahr und Herbst"],
    location: "Naturschutzgebiet Amrum",
    description: "Beobachten Sie seltene Vogelarten in ihrem natürlichen Lebensraum. Amrum ist ein wichtiger Rastplatz für Zugvögel und Heimat vieler Brutvögel.",
    image: "/images/activities/vogelbeobachtung.jpg",
    duration: "Individuell, geführte Touren: ca. 3 Stunden",
    suitable: ["Naturliebhaber", "Vogelkundler", "Fotografen"],
    features: ["Ruhig", "Naturerlebnis", "Lehrreich"],
    booking: "Geführte Touren mit Voranmeldung",
    pricing: "Geführte Tour: 15€/Person"
  },
  {
    id: 6,
    name: "Bernstein suchen am Strand",
    type: "nature",
    season: ["Ganzjährig", "besonders nach Stürmen"],
    location: "Strände von Amrum",
    description: "Machen Sie sich auf die Suche nach dem 'Gold der Ostsee'. Nach Stürmen und bei Ebbe haben Sie besonders gute Chancen, Bernstein zu finden.",
    image: "/images/activities/bernstein.jpg",
    duration: "Individuell",
    suitable: ["Alle Altersgruppen", "Familien", "Sammler"],
    features: ["Kostenlos", "Naturerlebnis", "Sammlerstück"],
    booking: "Keine Buchung erforderlich",
    pricing: "Kostenlos"
  },
  {
    id: 7,
    name: "Besuch des Öömrang Hüs",
    type: "culture",
    season: ["Ganzjährig"],
    location: "Nebel",
    description: "Tauchen Sie ein in die Geschichte und Kultur Amrums. Das Heimatmuseum zeigt traditionelle friesische Wohnkultur und Inselgeschichte.",
    image: "/images/activities/museum.jpg",
    duration: "ca. 1-2 Stunden",
    suitable: ["Kulturinteressierte", "Familien", "Regentage"],
    features: ["Kulturell", "Historisch", "Lehrreich"],
    booking: "Keine Voranmeldung nötig",
    pricing: "Erwachsene: 5€, Kinder: 2€"
  },
  {
    id: 8,
    name: "Segeltörn um Amrum",
    type: "water",
    season: ["Frühling", "Sommer", "Herbst"],
    location: "Nordsee um Amrum",
    description: "Erleben Sie Amrum vom Wasser aus. Segeln Sie um die Insel und genießen Sie die maritime Atmosphäre und die frische Nordseeluft.",
    image: "/images/activities/segeln.jpg",
    duration: "Halbtags oder ganztags",
    suitable: ["Alle Altersgruppen", "Meerliebhaber"],
    features: ["Maritim", "Entspannend", "Naturerlebnis"],
    booking: "Voranmeldung erforderlich",
    pricing: "Ab 60€/Person für Halbtagestouren"
  }
];

export default function AktivitaetenPage() {
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
        <span className="text-foreground">Aktivitäten</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="inline-flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary" />
            Aktivitäten auf Amrum
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Entdecken Sie die vielfältigen Freizeitmöglichkeiten auf Amrum – von entspannten 
          Naturerlebnissen bis hin zu aufregenden Wassersportaktivitäten ist für jeden etwas dabei.
        </p>
      </motion.div>

      <ActivityListWithFilters activities={activities} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-muted/30 rounded-lg p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Aktivitäten nach Jahreszeit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-background rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Frühling
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Vogelbeobachtung während der Zugzeit</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Erste Wattwanderungen der Saison</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Radtouren durch blühende Landschaften</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-background rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Sommer
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Wassersport aller Art (Kiten, Surfen, Segeln)</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Strandwanderungen und Sonnenbaden</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Abendliche Veranstaltungen und Konzerte</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-background rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Herbst
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Drachensteigen bei frischer Brise</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Bernsteinsuche nach Herbststürmen</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Vogelzug-Beobachtung</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-background rounded-lg p-5 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" /> Winter
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Winterwanderungen am menschenleeren Strand</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Wellness und Entspannung</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-4 w-4 text-primary mt-1" />
                <span>Kulturelle Angebote und Museumsbesuche</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Familienfreundliche Aktivitäten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3">Für die Kleinen</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Muscheln sammeln am Kniepsand</span>
                  <p className="text-sm text-muted-foreground">Ein zeitloser Spaß für Kinder jeden Alters. Sammeln Sie gemeinsam Muscheln und andere Schätze am weitläufigen Strand.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Besuch der Amrumer Windmühle</span>
                  <p className="text-sm text-muted-foreground">Die historische Windmühle in Nebel bietet spannende Einblicke für die ganze Familie.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Kinderprogramm der Amrum Touristik</span>
                  <p className="text-sm text-muted-foreground">Regelmäßige Veranstaltungen speziell für Kinder, von Bastelworkshops bis zu geführten Entdeckungstouren.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-3">Für die ganze Familie</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Fahrradtouren auf kindgerechten Wegen</span>
                  <p className="text-sm text-muted-foreground">Die flache Insel bietet ideale Bedingungen für Familienradtouren. Kinderfahrräder und Anhänger können vor Ort gemietet werden.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Gemeinsame Wattwanderung</span>
                  <p className="text-sm text-muted-foreground">Spezielle Familien-Wattwanderungen vermitteln Wissen über das Wattenmeer auf kindgerechte Weise.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="font-medium">Ausflug zur Seehundbank</span>
                  <p className="text-sm text-muted-foreground">Beobachten Sie Seehunde in ihrem natürlichen Lebensraum – ein unvergessliches Erlebnis für Kinder.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="bg-muted/20 rounded-lg p-6 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold mb-2 text-foreground">Praktische Informationen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">Buchung & Reservierung</h3>
            <p className="mb-2">
              Viele Aktivitäten können direkt über die Amrum Touristik gebucht werden. In der Hauptsaison 
              empfehlen wir eine frühzeitige Reservierung, besonders für geführte Touren und Wassersportaktivitäten.
            </p>
            <p>
              Kontakt: Amrum Touristik, Tel: +49 (0)4682 94030, E-Mail: info@amrum.de
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Ausrüstung & Vorbereitung</h3>
            <p className="mb-2">
              Für die meisten Outdoor-Aktivitäten empfehlen wir wetterfeste Kleidung und robustes Schuhwerk. 
              Sonnenschutz ist auch bei bewölktem Himmel wichtig, da die UV-Strahlung am Meer intensiver ist.
            </p>
            <p>
              Für Wassersportaktivitäten kann die nötige Ausrüstung in der Regel vor Ort ausgeliehen werden.
            </p>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={activity.image}
            alt={activity.name}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant={
                activity.type === "nature" ? "outline" : 
                activity.type === "water" ? "secondary" : 
                activity.type === "culture" ? "default" : "destructive"
              }
              className="font-medium"
            >
              {activity.type === "nature" ? "Natur" : 
               activity.type === "water" ? "Wassersport" : 
               activity.type === "culture" ? "Kultur" : "Aktiv"}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{activity.name}</CardTitle>
          </div>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {activity.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{activity.season.join(", ")}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full space-y-2">
            <div>
              <p className="text-xs font-medium mb-1">Geeignet für:</p>
              <div className="flex flex-wrap gap-1">
                {activity.suitable.map((suitableFor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {suitableFor}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{activity.booking}</span>
              <span className="font-medium">{activity.pricing}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 