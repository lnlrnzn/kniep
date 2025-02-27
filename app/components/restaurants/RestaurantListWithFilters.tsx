"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star, Filter, Grid, Grid3X3, X } from "lucide-react";
import { Restaurant } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RestaurantFilters } from "./RestaurantFilters";

interface RestaurantListWithFiltersProps {
  restaurants: Restaurant[];
}

export default function RestaurantListWithFilters({ restaurants }: RestaurantListWithFiltersProps) {
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Helper function to format opening hours
  const formatOpeningHours = (openingHours: string) => {
    if (!openingHours) return "Öffnungszeiten nicht verfügbar";
    
    return openingHours.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button 
            variant={isFilterVisible ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter {isFilterVisible ? 'ausblenden' : 'anzeigen'}
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} gefunden
          </div>
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={layout === 'grid' ? 'default' : 'ghost'} 
              size="sm" 
              className="rounded-none"
              onClick={() => setLayout('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={layout === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              className="rounded-none"
              onClick={() => setLayout('list')}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isFilterVisible && (
        <div className="mb-6 border rounded-lg p-4 bg-background">
          <RestaurantFilters 
            restaurants={restaurants} 
            onFiltersChange={setFilteredRestaurants} 
          />
        </div>
      )}

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Keine Restaurants gefunden</h3>
          <p className="text-muted-foreground mb-4">
            Bitte passen Sie Ihre Filterkriterien an, um Ergebnisse zu erhalten.
          </p>
        </div>
      ) : (
        <div className={
          layout === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
        }>
          {filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className={`overflow-hidden flex ${layout === 'grid' ? 'flex-col h-full' : 'flex-col md:flex-row'}`}
            >
              <div 
                className={`relative ${layout === 'grid' ? 'h-48 w-full' : 'h-48 md:h-auto md:w-1/3'} overflow-hidden`}
              >
                <Image 
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                {restaurant.cuisine && (
                  <div className="absolute top-3 right-3">
                    <Badge>{restaurant.cuisine}</Badge>
                  </div>
                )}
              </div>
              
              <div className={`${layout === 'list' ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    {restaurant.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    )}
                  </div>
                  {restaurant.description && (
                    <p className="text-muted-foreground text-sm">{restaurant.description}</p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    {restaurant.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{restaurant.location}</span>
                      </div>
                    )}
                    
                    {restaurant.openingHours && (
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm">
                          {formatOpeningHours(restaurant.openingHours)}
                        </div>
                      </div>
                    )}
                    
                    {restaurant.features && restaurant.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {restaurant.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {restaurant.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{restaurant.features.length - 3} weitere
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <div className="w-full flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Link href={`/restaurants/${restaurant.id}`} className="flex items-center justify-center w-full">
                        Details
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 