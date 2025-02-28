"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Utensils, Coffee, Waves, Star, Clock, Euro, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentContainer } from "../../../components/ui/content-container";

// Define restaurant type
interface Restaurant {
  id: number;
  name: string;
  type: "restaurant" | "cafe" | "beach-bar";
  cuisine: string;
  priceRange: string;
  location: string;
  description: string;
  image: string;
  openingHours: string;
  features: string[];
  rating: number;
  specialties: string[];
}

// Sample data - would be replaced with actual data from a CMS or API
const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Strandhaus Amrum",
    type: "restaurant",
    cuisine: "Norddeutsch",
    priceRange: "€€-€€€",
    location: "Norddorf",
    description: "Gehobene norddeutsche Küche mit Fokus auf frischen Fisch und Meeresfrüchte in gemütlicher Atmosphäre mit Meerblick.",
    image: "/images/restaurants/restaurant-1.jpg",
    openingHours: "Täglich 12:00-22:00 Uhr",
    features: ["Meerblick", "Terrasse", "Reservierung empfohlen"],
    rating: 4.7,
    specialties: ["Fangfrischer Fisch", "Austernplatte", "Amrumer Lamm"]
  },
  {
    id: 2,
    name: "Café Inselperle",
    type: "cafe",
    cuisine: "Café & Konditorei",
    priceRange: "€-€€",
    location: "Nebel",
    description: "Gemütliches Café mit hausgemachten Kuchen und Torten. Perfekt für eine Pause nach dem Strandspaziergang.",
    image: "/images/restaurants/cafe-1.jpg",
    openingHours: "Mi-Mo 10:00-18:00 Uhr, Di Ruhetag",
    features: ["Hausgemachte Kuchen", "Friesische Spezialitäten", "Fahrradparkplatz"],
    rating: 4.5,
    specialties: ["Friesische Torte", "Pharisäer", "Hausgemachtes Eis"]
  },
  {
    id: 3,
    name: "Strandbar Wittdün",
    type: "beach-bar",
    cuisine: "Snacks & Cocktails",
    priceRange: "€€",
    location: "Wittdün",
    description: "Entspannte Strandbar direkt am Meer. Genießen Sie Cocktails und leichte Snacks mit den Füßen im Sand.",
    image: "/images/restaurants/beach-bar-1.jpg",
    openingHours: "Täglich 11:00-23:00 Uhr (wetterabhängig)",
    features: ["Direkt am Strand", "Sonnenuntergang", "Live-Musik am Wochenende"],
    rating: 4.3,
    specialties: ["Frozen Margarita", "Fischbrötchen", "Beach Bowl"]
  },
  {
    id: 4,
    name: "Inselkoch",
    type: "restaurant",
    cuisine: "Modern Deutsch",
    priceRange: "€€€",
    location: "Süddorf",
    description: "Modernes Restaurant mit kreativer Küche, die traditionelle Gerichte neu interpretiert. Fokus auf regionale und saisonale Zutaten.",
    image: "/images/restaurants/restaurant-2.jpg",
    openingHours: "Mi-So 17:30-22:00 Uhr, Mo-Di Ruhetag",
    features: ["Regionale Produkte", "Wechselnde Karte", "Weinbegleitung"],
    rating: 4.8,
    specialties: ["Tagesfang", "Dry Aged Beef", "Amrumer Käseauswahl"]
  },
  {
    id: 5,
    name: "Hafencafé",
    type: "cafe",
    cuisine: "Café & Bistro",
    priceRange: "€-€€",
    location: "Wittdün",
    description: "Direkt am Hafen gelegen mit Blick auf die ankommenden Fähren. Frühstück, Kuchen und kleine Gerichte in maritimer Atmosphäre.",
    image: "/images/restaurants/cafe-2.jpg",
    openingHours: "Täglich 8:00-18:00 Uhr",
    features: ["Hafenblick", "Frühstück", "Außenterrasse"],
    rating: 4.4,
    specialties: ["Seemannsfrühstück", "Apfelkuchen", "Matjesbrötchen"]
  },
  {
    id: 6,
    name: "Dünenrestaurant",
    type: "restaurant",
    cuisine: "Friesisch-International",
    priceRange: "€€-€€€",
    location: "Norddorf",
    description: "Versteckt in den Dünen bietet dieses Restaurant eine Fusion aus friesischer Tradition und internationalen Einflüssen.",
    image: "/images/restaurants/restaurant-3.jpg",
    openingHours: "Di-So 17:00-22:00 Uhr, Mo Ruhetag",
    features: ["Dünenlandschaft", "Romantisches Ambiente", "Große Weinkarte"],
    rating: 4.6,
    specialties: ["Dünen-Menü", "Nordseekrabben", "Lammkarree"]
  }
];

export default function GastronomiePage() {
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
        <span className="text-foreground">Gastronomie</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="inline-flex items-center gap-2">
            <Utensils className="h-8 w-8 text-primary" />
            Gastronomie auf Amrum
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Entdecken Sie die kulinarische Vielfalt Amrums – von traditionellen friesischen Spezialitäten 
          über fangfrischen Fisch bis hin zu gemütlichen Cafés und entspannten Strandbars.
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">Alle</TabsTrigger>
          <TabsTrigger value="restaurants">
            <Utensils className="h-4 w-4 mr-2" />
            Restaurants
          </TabsTrigger>
          <TabsTrigger value="cafes">
            <Coffee className="h-4 w-4 mr-2" />
            Cafés
          </TabsTrigger>
          <TabsTrigger value="beach-bars">
            <Waves className="h-4 w-4 mr-2" />
            Strandbars
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="restaurants" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.type === "restaurant")
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cafes" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.type === "cafe")
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="beach-bars" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.type === "beach-bar")
              .map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-muted/30 rounded-lg p-8 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Kulinarische Highlights auf Amrum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Lokale Spezialitäten</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span><strong>Nordseekrabben</strong> – Frisch gefangen und handgepult, ein Muss für jeden Besucher</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span><strong>Friesischer Tee</strong> – Mit Kluntje (Kandis) und Sahne, traditionell serviert</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span><strong>Amrumer Lamm</strong> – Von den Salzwiesen, mit besonderem Geschmack</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span><strong>Fischbrötchen</strong> – In allen Variationen, direkt vom Kutter</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Tipps für Genießer</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span>Reservieren Sie in der Hauptsaison rechtzeitig, besonders für die beliebten Restaurants</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span>Viele Restaurants bieten mittags günstigere Menüs an</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span>Achten Sie auf das &quot;Amrumer Qualitätssiegel&quot; für besonders empfehlenswerte Lokale</span>
              </li>
              <li className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-primary mt-0.5" />
                <span>Probieren Sie unbedingt einen &quot;Pharisäer&quot; – Kaffee mit Rum und Sahnehaube</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </ContentContainer>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1 font-medium">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              {restaurant.rating}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{restaurant.name}</CardTitle>
            <Badge 
              variant={
                restaurant.type === "restaurant" ? "default" : 
                restaurant.type === "cafe" ? "outline" : "secondary"
              }
              className="ml-2"
            >
              {restaurant.type === "restaurant" ? "Restaurant" : 
               restaurant.type === "cafe" ? "Café" : "Strandbar"}
            </Badge>
          </div>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {restaurant.location} • {restaurant.cuisine}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground mb-3">{restaurant.description}</p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span>{restaurant.openingHours}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Euro className="h-4 w-4" />
            <span>{restaurant.priceRange}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full">
            <p className="text-xs font-medium mb-2">Spezialitäten:</p>
            <div className="flex flex-wrap gap-1">
              {restaurant.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 