"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Star, Phone, Globe, Wifi, Coffee, Home, Hotel, Car, Bath, Loader } from "lucide-react";
import { Accommodation } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AccommodationDetailProps {
  accommodation: Accommodation;
}

export default function AccommodationDetail({ accommodation }: AccommodationDetailProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading (remove in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
        aria-hidden={true}
      />
    ));
  };

  // Function to get feature icon
  const getFeatureIcon = (feature: string) => {
    if (feature.includes('WLAN')) return <Wifi className="h-5 w-5 text-primary" aria-hidden="true" />;
    if (feature.includes('Parkplatz')) return <Car className="h-5 w-5 text-primary" aria-hidden="true" />;
    if (feature.includes('Frühstück')) return <Coffee className="h-5 w-5 text-primary" aria-hidden="true" />;
    if (feature.includes('Balkon') || feature.includes('Terrasse')) 
      return <Home className="h-5 w-5 text-primary" aria-hidden="true" />;
    if (feature.includes('Pool') || feature.includes('Sauna') || feature.includes('Spa')) 
      return <Bath className="h-5 w-5 text-primary" aria-hidden="true" />;
    if (feature.includes('Hotel'))
      return <Hotel className="h-5 w-5 text-primary" aria-hidden="true" />;
    
    return <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">•</div>;
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

  // Base64 encoded tiny transparent placeholder
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 animate-pulse">
        <Skeleton className="aspect-square rounded-lg w-full h-full" />
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-1/2" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center z-10 transition-opacity duration-300 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <Loader className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
        <Image 
          src={imageError ? getPlaceholderImage(accommodation.type) : accommodation.image}
          alt={`Foto von ${accommodation.name}`}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setImageError(true)}
          onLoad={() => setIsImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
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
            <div className="flex items-center mt-1 ml-2" aria-label={`${accommodation.stars} von 5 Sternen`}>
              {renderStars(accommodation.stars)}
            </div>
          )}
          {accommodation.rating > 0 && (
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="font-medium text-sm" aria-label={`Bewertung: ${accommodation.rating.toFixed(1)} von 5`}>
                {accommodation.rating.toFixed(1)}
              </span>
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
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Adresse</h3>
                <p className="text-muted-foreground">{accommodation.location}</p>
              </div>
            </div>
          )}
          
          {accommodation.phone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-medium">Telefon</h3>
                <p className="text-muted-foreground">
                  <a href={`tel:${accommodation.phone.replace(/\s/g, '')}`} className="hover:underline">
                    {accommodation.phone}
                  </a>
                </p>
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
                  aria-label={`Website von ${accommodation.name} öffnen (öffnet in neuem Tab)`}
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
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