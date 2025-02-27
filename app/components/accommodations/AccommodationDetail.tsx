"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Star, Phone, Globe, Wifi, Coffee, Home, Hotel, Car, Bath } from "lucide-react";
import { Accommodation } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/components/ui/button";

interface AccommodationDetailProps {
  accommodation: Accommodation;
}

export default function AccommodationDetail({ accommodation }: AccommodationDetailProps) {
  const [imageError, setImageError] = useState(false);

  // Map for accommodation type names
  const typeNames: Record<string, string> = {
    hotel: "Hotel",
    ferienhaus: "Ferienhaus",
    ferienwohnung: "Ferienwohnung",
    pension: "Pension"
  };

  // Function to render stars
  const renderStars = (stars: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  // Function to get feature icon
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('WLAN')) return <Wifi className="h-5 w-5 text-primary" />;
    if (feature.includes('Parkplatz')) return <Car className="h-5 w-5 text-primary" />;
    if (feature.includes('Frühstück')) return <Coffee className="h-5 w-5 text-primary" />;
    if (feature.includes('Balkon') || feature.includes('Terrasse')) 
      return <Home className="h-5 w-5 text-primary" />;
    if (feature.includes('Pool') || feature.includes('Sauna') || feature.includes('Spa')) 
      return <Bath className="h-5 w-5 text-primary" />;
    if (feature.includes('Hotel'))
      return <Hotel className="h-5 w-5 text-primary" />;
    
    return <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary">•</div>;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image 
          src={imageError ? getPlaceholderImage(accommodation.type) : accommodation.image}
          alt={accommodation.name}
          fill
          priority
          className="object-cover"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized={accommodation.image.startsWith('http')} // Skip optimization for external images
        />
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-bold">{accommodation.name}</h1>
          <div className="flex items-center">
            <Badge className="ml-2">{accommodation.price}</Badge>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline">{typeNames[accommodation.type] || accommodation.type}</Badge>
          {accommodation.stars > 0 && (
            <div className="flex items-center mt-1 ml-2">
              {renderStars(accommodation.stars)}
            </div>
          )}
          {accommodation.rating > 0 && (
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{accommodation.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {accommodation.description && (
          <p className="mt-4 text-muted-foreground">{accommodation.description}</p>
        )}
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          {accommodation.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="text-muted-foreground">{accommodation.location}</p>
              </div>
            </div>
          )}
          
          {accommodation.phone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-medium">Telefon</h3>
                <p className="text-muted-foreground">{accommodation.phone}</p>
              </div>
            </div>
          )}
        </div>
        
        {(accommodation.features && accommodation.features.length > 0) && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="font-medium mb-3">Ausstattung</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accommodation.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {accommodation.website && (
          <>
            <Separator className="my-6" />
            <div>
              <Button className="w-full sm:w-auto" asChild>
                <a 
                  href={accommodation.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Zur Website
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 