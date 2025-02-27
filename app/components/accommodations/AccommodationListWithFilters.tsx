"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Filter, Grid, Grid3X3, Wifi, Car, Coffee, Home, Hotel, PenTool } from "lucide-react";
import { Accommodation } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AccommodationFilters } from "./AccommodationFilters";

interface AccommodationListWithFiltersProps {
  accommodations: Accommodation[];
}

export default function AccommodationListWithFilters({ accommodations }: AccommodationListWithFiltersProps) {
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>(accommodations);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Map for accommodation type icons
  const typeIcons: Record<string, React.ReactNode> = {
    hotel: <Hotel className="h-4 w-4" />,
    ferienhaus: <Home className="h-4 w-4" />,
    ferienwohnung: <Home className="h-4 w-4" />,
    pension: <Coffee className="h-4 w-4" />
  };

  // Map for accommodation type names
  const typeNames: Record<string, string> = {
    hotel: "Hotel",
    ferienhaus: "Ferienhaus",
    ferienwohnung: "Ferienwohnung",
    pension: "Pension"
  };

  // Helper function to render stars
  const renderStars = (stars: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-3 w-3 ${index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  // Helper function to get feature icon
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('WLAN')) return <Wifi className="h-4 w-4" />;
    if (feature.includes('Parkplatz')) return <Car className="h-4 w-4" />;
    if (feature.includes('Frühstück')) return <Coffee className="h-4 w-4" />;
    return null;
  };

  // Handle image error
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Get placeholder image based on accommodation type
  const getPlaceholderImage = (type: string) => {
    switch(type) {
      case 'hotel':
        return '/images/accommodations/hotel-1.jpg';
      case 'pension':
        return '/images/accommodations/pension-1.jpg';
      case 'ferienhaus':
        return '/images/accommodations/ferienhaus-1.jpg';
      case 'ferienwohnung':
        return '/images/accommodations/ferienwohnung-1.jpg';
      default:
        return '/images/accommodations/hotel-1.jpg';
    }
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
            {filteredAccommodations.length} {filteredAccommodations.length === 1 ? 'Unterkunft' : 'Unterkünfte'} gefunden
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
          <AccommodationFilters 
            accommodations={accommodations} 
            onFiltersChange={setFilteredAccommodations} 
          />
        </div>
      )}

      {filteredAccommodations.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Keine Unterkünfte gefunden</h3>
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
          {filteredAccommodations.map((accommodation) => (
            <Card 
              key={accommodation.id} 
              className={`overflow-hidden flex ${layout === 'grid' ? 'flex-col h-full' : 'flex-col md:flex-row'}`}
            >
              <div 
                className={`relative ${layout === 'grid' ? 'h-48 w-full' : 'h-48 md:h-auto md:w-1/3'} overflow-hidden`}
              >
                <Image 
                  src={imageErrors[accommodation.id] ? getPlaceholderImage(accommodation.type) : accommodation.image}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(accommodation.id)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={accommodation.image.startsWith('http')} // Skip optimization for external images to improve loading
                />
                <div className="absolute top-3 right-3">
                  <Badge>{accommodation.price}</Badge>
                </div>
              </div>
              
              <div className={`${layout === 'list' ? 'md:w-2/3' : 'w-full'} flex flex-col`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{accommodation.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {typeIcons[accommodation.type]} {typeNames[accommodation.type]}
                        </Badge>
                        {accommodation.stars > 0 && (
                          <div className="flex items-center">
                            {renderStars(accommodation.stars)}
                          </div>
                        )}
                      </div>
                    </div>
                    {accommodation.rating > 0 && (
                      <div className="flex items-center">
                        <div className="bg-primary/10 px-2 py-1 rounded-md">
                          <span className="font-medium text-sm">{accommodation.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {accommodation.description && (
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{accommodation.description}</p>
                  )}
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-3">
                    {accommodation.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{accommodation.location}</span>
                      </div>
                    )}
                    
                    {accommodation.features && accommodation.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {accommodation.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                            {getFeatureIcon(feature)}
                            {feature}
                          </Badge>
                        ))}
                        {accommodation.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{accommodation.features.length - 3} weitere
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <div className="w-full flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Link href={`/urlaub/unterkuenfte/${accommodation.id}`} className="flex items-center justify-center w-full">
                        Details
                      </Link>
                    </Button>
                    {accommodation.website && (
                      <Button variant="default" size="sm" className="flex-1">
                        <a href={accommodation.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                          Website
                        </a>
                      </Button>
                    )}
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