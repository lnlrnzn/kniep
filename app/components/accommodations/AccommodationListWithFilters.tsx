"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Grid, Grid3X3, Wifi, Car, Coffee, AlertTriangle, X, Heart, Search, Sliders } from "lucide-react";
import { Accommodation } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";
import { AccommodationFilters } from "./AccommodationFilters";
import { memo } from "react";
import { cn } from "@/lib/utils";

// Memoize the AccommodationCard component to prevent unnecessary re-renders
const AccommodationCard = memo(({ 
  accommodation, 
  layout,
  getPlaceholderImage,
  getFeatureIcon
}: { 
  accommodation: Accommodation; 
  layout: 'grid' | 'list';
  getPlaceholderImage: (type: string) => string;
  getFeatureIcon: (feature: string) => React.ReactNode;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Map for accommodation type names
  const typeNames: Record<string, string> = {
    hotel: "Hotel",
    ferienhaus: "Ferienhaus",
    ferienwohnung: "Ferienwohnung",
    pension: "Pension"
  };

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-md border-muted/60 bg-background",
        layout === 'grid' ? "flex flex-col h-full" : "flex flex-col md:flex-row"
      )}
    >
      <div 
        className={cn(
          "relative overflow-hidden",
          layout === 'grid' ? "h-64 w-full" : "h-52 md:h-full md:w-2/5"
        )}
      >
        <Link 
          href={`/urlaub/unterkuenfte/${accommodation.id}`}
          className="block w-full h-full"
        >
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'} z-10`}
            aria-hidden="true"
          >
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <Image 
            src={imageError ? getPlaceholderImage(accommodation.type) : accommodation.image}
            alt={`Foto von ${accommodation.name}`}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
            placeholder="blur"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          <Badge variant="secondary" className="bg-white/90 hover:bg-white text-xs font-medium shadow-sm backdrop-blur-sm px-3 py-1">
            {typeNames[accommodation.type]}
          </Badge>
          {(accommodation.type === 'hotel' || accommodation.type === 'pension') && 
            'stars' in accommodation && 
            accommodation.stars > 0 && (
            <Badge variant="secondary" className="bg-white/90 hover:bg-white text-xs font-medium shadow-sm backdrop-blur-sm flex items-center gap-1 px-3 py-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {accommodation.stars}
            </Badge>
          )}
        </div>
        
        {/* Price badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-primary text-primary-foreground font-medium shadow-sm px-3 py-1">{accommodation.price}</Badge>
        </div>
        
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setFavorite(!favorite);
          }}
          className={cn(
            "absolute bottom-4 right-4 z-20 p-2.5 rounded-full transition-all shadow-sm",
            favorite ? "bg-red-500 text-white" : "bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900"
          )}
          aria-label={favorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
        >
          <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
        </button>
      </div>
      
      <div className={cn(
        "flex flex-col",
        layout === 'list' ? "md:w-3/5 p-3" : "w-full"
      )}>
        <div className="p-5 flex-grow">
          <div className="space-y-5">
            {/* Rating */}
            {accommodation.rating > 0 && (
              <div className="flex items-center gap-1.5 mb-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                  {accommodation.rating.toFixed(1)}
                </div>
                <span className="text-xs text-muted-foreground">Sehr gut</span>
              </div>
            )}
            
            {/* Title */}
            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
              <Link 
                href={`/urlaub/unterkuenfte/${accommodation.id}`}
                className="focus:outline-none focus:underline"
              >
                {accommodation.name}
              </Link>
            </h3>
            
            {/* Location */}
            {accommodation.location && (
              <div className="flex items-start gap-2.5 mt-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{accommodation.location}</span>
              </div>
            )}
            
            {/* Description */}
            {accommodation.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-3">{accommodation.description}</p>
            )}
            
            {/* Features */}
            {accommodation.features && accommodation.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 mt-2">
                {accommodation.features.slice(0, 4).map((feature: string, index: number) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground whitespace-nowrap overflow-hidden"
                  >
                    {getFeatureIcon(feature) && (
                      <span className="flex-shrink-0">{getFeatureIcon(feature)}</span>
                    )}
                    <span className="truncate max-w-[120px]">{feature}</span>
                  </div>
                ))}
                {accommodation.features.length > 4 && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground whitespace-nowrap">
                    +{accommodation.features.length - 4} weitere
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <CardFooter className="p-5 pt-3 border-t border-muted/40 mt-auto">
          <div className="w-full flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 text-sm font-medium">
              <Link href={`/urlaub/unterkuenfte/${accommodation.id}`} className="flex items-center justify-center w-full">
                Details ansehen
              </Link>
            </Button>
            {accommodation.website && (
              <Button variant="default" size="sm" className="flex-1 text-sm font-medium">
                <a 
                  href={accommodation.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-full"
                  aria-label={`Website von ${accommodation.name} öffnen (öffnet in neuem Tab)`}
                >
                  Buchen
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
});

AccommodationCard.displayName = 'AccommodationCard';

interface AccommodationListWithFiltersProps {
  accommodations: Accommodation[];
}

export default function AccommodationListWithFilters({ accommodations }: AccommodationListWithFiltersProps) {
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>(accommodations);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get placeholder image based on accommodation type - memoized to improve performance
  const getPlaceholderImage = useCallback((type: string) => {
    // Default placeholder if specific type image is not found
    const defaultPlaceholder = "/images/placeholder-accommodation.jpg";
    
    switch(type) {
      case 'hotel':
        return '/images/placeholder-hotel.jpg';
      case 'pension':
        return '/images/placeholder-pension.jpg';
      case 'ferienhaus':
        return '/images/placeholder-house.jpg';
      case 'ferienwohnung':
        return '/images/placeholder-apartment.jpg';
      default:
        return defaultPlaceholder;
    }
  }, []);

  // Helper function to get feature icon - memoized to improve performance
  const getFeatureIcon = useCallback((feature: string) => {
    if (feature.includes('WLAN')) return <Wifi className="h-3 w-3" aria-hidden="true" />;
    if (feature.includes('Parkplatz')) return <Car className="h-3 w-3" aria-hidden="true" />;
    if (feature.includes('Frühstück')) return <Coffee className="h-3 w-3" aria-hidden="true" />;
    return null;
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filtered: Accommodation[]) => {
    try {
      setFilteredAccommodations(filtered);
    } catch (error) {
      console.error('Error filtering accommodations:', error);
      setHasError(true);
    }
  }, []);

  // Toggle filter visibility
  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible(prev => !prev);
  }, []);

  // Toggle layout
  const toggleLayout = useCallback((newLayout: 'grid' | 'list') => {
    setLayout(newLayout);
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter accommodations by search query
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return; // No search term, return original list
    }
    
    const searchTerm = searchQuery.toLowerCase();
    const filtered = accommodations.filter(acc => 
      acc.name.toLowerCase().includes(searchTerm) || 
      acc.description.toLowerCase().includes(searchTerm) ||
      acc.location.toLowerCase().includes(searchTerm) ||
      (acc.features && acc.features.some(feature => 
        feature.toLowerCase().includes(searchTerm)
      ))
    );
    
    setFilteredAccommodations(filtered);
  };

  // Reset all filters and search
  const resetFilters = useCallback(() => {
    setFilteredAccommodations(accommodations);
    setSearchQuery("");
  }, [accommodations]);

  // Memoize accommodations if they haven't changed to prevent unnecessary re-renders
  const accommodationsList = useMemo(() => {
    if (hasError) {
      return (
        <div className="text-center py-10 rounded-lg bg-red-50 text-red-800">
          <AlertTriangle className="h-10 w-10 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Beim Laden der Unterkünfte ist ein Fehler aufgetreten</h3>
          <p className="text-red-700 mb-4">
            Bitte versuchen Sie, die Seite neu zu laden oder kontaktieren Sie uns, wenn das Problem weiterhin besteht.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="bg-white hover:bg-red-100"
          >
            Seite neu laden
          </Button>
        </div>
      );
    }

    if (filteredAccommodations.length === 0) {
      return (
        <div className="text-center py-16 rounded-lg bg-muted/30">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Keine Unterkünfte gefunden</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Leider entspricht keine Unterkunft Ihren Suchkriterien. Bitte passen Sie Ihre Filter an oder versuchen Sie es mit anderen Suchbegriffen.
          </p>
          <Button onClick={resetFilters}>
            Filter zurücksetzen
          </Button>
        </div>
      );
    }

    return (
      <div className={
        layout === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        : "space-y-8"
      }>
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            layout={layout}
            getPlaceholderImage={getPlaceholderImage}
            getFeatureIcon={getFeatureIcon}
          />
        ))}
      </div>
    );
  }, [filteredAccommodations, layout, hasError, getPlaceholderImage, getFeatureIcon, resetFilters]);

  return (
    <div className="space-y-8">
      {/* Search and filter header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Unterkunft suchen..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 pr-4 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-base"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  resetFilters();
                }}
                className="absolute right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleFilterVisibility}
                className="flex items-center gap-2 py-2 px-4 h-auto whitespace-nowrap overflow-hidden"
              >
                <Sliders className="h-4 w-4 flex-shrink-0" />
                <span>Filter</span>
                {(accommodations.length - filteredAccommodations.length) > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[1.25rem] flex items-center justify-center bg-muted flex-shrink-0">
                    {accommodations.length - filteredAccommodations.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="outline" 
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground py-2 px-4 h-auto whitespace-nowrap overflow-hidden"
                disabled={filteredAccommodations.length === accommodations.length && !searchQuery}
              >
                <X className="mr-1.5 h-3 w-3 flex-shrink-0" />
                <span>Zurücksetzen</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredAccommodations.length} {filteredAccommodations.length === 1 ? 'Unterkunft' : 'Unterkünfte'}
              </span>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={layout === 'grid' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none h-9 px-3"
                  onClick={() => toggleLayout('grid')}
                  aria-label="Rasteransicht"
                  aria-pressed={layout === 'grid'}
                >
                  <Grid3X3 className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button 
                  variant={layout === 'list' ? 'default' : 'ghost'} 
                  size="sm" 
                  className="rounded-none h-9 px-3"
                  onClick={() => toggleLayout('list')}
                  aria-label="Listenansicht"
                  aria-pressed={layout === 'list'}
                >
                  <Grid className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded filters */}
      {isFilterVisible && (
        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium text-lg">Unterkünfte filtern</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFilterVisibility}
              className="h-9 w-9 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <AccommodationFilters 
            accommodations={accommodations} 
            onFiltersChange={handleFilterChange} 
          />
        </div>
      )}

      {/* Results */}
      {accommodationsList}
      
      {/* More info */}
      {filteredAccommodations.length > 0 && (
        <div className="bg-muted/20 rounded-xl p-8 border border-muted/60 mt-10">
          <h3 className="text-xl font-medium mb-5">Tipps für Ihre Unterkunftssuche</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-base mb-1">Frühzeitig buchen</h4>
                <p className="text-sm text-muted-foreground">
                  Für die Hauptsaison (Juli/August) empfehlen wir 4-6 Monate im Voraus zu buchen.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-base mb-1">Lage beachten</h4>
                <p className="text-sm text-muted-foreground">
                  Wittdün ist belebter mit mehr Einkaufsmöglichkeiten, Norddorf ist ruhiger.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Calendar icon component
function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
} 