"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Home, Landmark, MapPin, Utensils, Umbrella } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Typen für die Punkte auf der Karte
type POICategory = "strand" | "unterkunft" | "restaurant" | "sehenswürdigkeit" | "aktivität";

interface POI {
  id: string;
  name: string;
  description: string;
  category: POICategory;
  position: { x: number; y: number }; // Position in Prozent relativ zur Kartengröße
  icon: React.ReactNode;
}

// Mockdaten für Points of Interest
const pointsOfInterest: POI[] = [
  {
    id: "poi-1",
    name: "Kniepsand",
    description: "Einer der breitesten Sandstrände Europas mit feinem, weißem Sand.",
    category: "strand",
    position: { x: 30, y: 20 },
    icon: <Umbrella className="h-5 w-5" />
  },
  {
    id: "poi-2",
    name: "Amrum Odde",
    description: "Naturschutzgebiet an der Nordspitze der Insel mit einzigartiger Dünenlandschaft.",
    category: "sehenswürdigkeit",
    position: { x: 15, y: 10 },
    icon: <Landmark className="h-5 w-5" />
  },
  {
    id: "poi-3",
    name: "Hotel Seeblick",
    description: "Komfortables Hotel mit Meerblick in ruhiger Lage.",
    category: "unterkunft",
    position: { x: 60, y: 40 },
    icon: <Home className="h-5 w-5" />
  },
  {
    id: "poi-4",
    name: "Restaurant Nordseewelle",
    description: "Fischrestaurant mit frischen, lokalen Spezialitäten.",
    category: "restaurant",
    position: { x: 55, y: 35 },
    icon: <Utensils className="h-5 w-5" />
  },
  {
    id: "poi-5",
    name: "Café Strandmuschel",
    description: "Gemütliches Café mit hausgemachten Kuchen und Meerblick.",
    category: "restaurant",
    position: { x: 40, y: 25 },
    icon: <Coffee className="h-5 w-5" />
  },
];

const categories = [
  { id: "alle", label: "Alle" },
  { id: "strand", label: "Strände" },
  { id: "unterkunft", label: "Unterkünfte" },
  { id: "restaurant", label: "Restaurants & Cafés" },
  { id: "sehenswürdigkeit", label: "Sehenswürdigkeiten" },
  { id: "aktivität", label: "Aktivitäten" },
];

export default function InteractiveMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>("alle");
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  // Filtern der POIs basierend auf der ausgewählten Kategorie
  const filteredPOIs = pointsOfInterest.filter(poi => 
    selectedCategory === "alle" || poi.category === selectedCategory
  );

  return (
    <div className="w-full rounded-lg overflow-hidden border shadow-sm">
      <Tabs defaultValue="map">
        <div className="bg-card p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Amrum entdecken</h2>
            <TabsList>
              <TabsTrigger value="map">Karte</TabsTrigger>
              <TabsTrigger value="list">Liste</TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="map" className="p-0">
          <div className="p-4 bg-muted/30 border-b">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="relative h-[500px] bg-[#e0f2fe] overflow-hidden">
            {/* Amrum Kartenillustration (Platzhalter) */}
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: 'url("/amrum-map-placeholder.jpg")' }}></div>
            
            {/* Points of Interest */}
            {filteredPOIs.map((poi) => (
              <motion.div
                key={poi.id}
                className="absolute cursor-pointer"
                style={{ 
                  left: `${poi.position.x}%`, 
                  top: `${poi.position.y}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedPOI(poi)}
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                    {poi.icon}
                  </div>
                  <div className="mt-1 px-2 py-1 bg-white rounded-md shadow-sm text-xs font-medium whitespace-nowrap">
                    {poi.name}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Info-Karte für ausgewählten POI */}
            {selectedPOI && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedPOI.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {selectedPOI.description}
                        </p>
                        <Button size="sm" variant="outline">Mehr erfahren</Button>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6" 
                        onClick={() => setSelectedPOI(null)}
                      >
                        ✕
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
          
          <div className="p-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> 
              Klicken Sie auf die Marker, um Details zu sehen.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="p-4 max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {filteredPOIs.length > 0 ? (
              filteredPOIs.map(poi => (
                <Card key={poi.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {poi.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{poi.name}</h3>
                        <p className="text-sm text-muted-foreground">{poi.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Keine Punkte für die ausgewählte Kategorie gefunden.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 