"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, Heart, X, Sliders, Grid, Grid3X3, Umbrella, Sun, Wind, Waves, Fish, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Beach } from "@/app/types";

// Memoize the BeachCard component to prevent unnecessary re-renders
const BeachCard = memo(({ 
  beach, 
  layout,
  getFeatureIcon
}: { 
  beach: Beach; 
  layout: 'grid' | 'list';
  getFeatureIcon: (label: string) => React.ReactNode;
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Placeholder image for beaches
  const getPlaceholderImage = () => {
    return '/images/placeholder-beach.jpg';
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
          href={`/urlaub/straende/${beach.id}`}
          className="block w-full h-full"
        >
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'} z-10`}
            aria-hidden="true"
          >
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <Image 
            src={imageError ? getPlaceholderImage() : beach.image}
            alt={`Foto von ${beach.name}`}
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
          <Badge variant="secondary" className="bg-white/90 hover:bg-white text-xs font-medium shadow-sm backdrop-blur-sm px-3 py-1 whitespace-nowrap overflow-hidden">
            {beach.bestTime}
          </Badge>
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
            {/* Title */}
            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
              <Link 
                href={`/urlaub/straende/${beach.id}`}
                className="focus:outline-none focus:underline"
              >
                {beach.name}
              </Link>
            </h3>
            
            {/* Location */}
            {beach.location && (
              <div className="flex items-start gap-2.5 mt-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{beach.location}</span>
              </div>
            )}

            {/* Description */}
            {beach.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-3">{beach.description}</p>
            )}
            
            {/* Features */}
            {beach.features && beach.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 mt-2">
                {beach.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground whitespace-nowrap overflow-hidden"
                  >
                    <span className="flex-shrink-0">{feature.icon || getFeatureIcon(feature.label)}</span>
                    <span className="truncate max-w-[120px]">{feature.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Highlights */}
            {beach.highlights && beach.highlights.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Highlights:</h4>
                <ul className="space-y-1">
                  {beach.highlights.slice(0, 2).map((highlight, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                  {beach.highlights.length > 2 && (
                    <li className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">+{beach.highlights.length - 2} weitere Highlights</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <CardFooter className="p-5 pt-3 border-t border-muted/40 mt-auto">
          <div className="w-full flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 text-sm font-medium">
              <Link href={`/urlaub/straende/${beach.id}`} className="flex items-center justify-center w-full">
                Details ansehen
              </Link>
            </Button>
            <Button variant="default" size="sm" className="flex-1 text-sm font-medium">
              <Link href={`/urlaub/straende/${beach.id}`} className="flex items-center justify-center w-full">
                Strand entdecken
              </Link>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
});

BeachCard.displayName = 'BeachCard';

interface BeachListWithFiltersProps {
  beaches: Beach[];
}

export default function BeachListWithFilters({ beaches }: BeachListWithFiltersProps) {
  const [filteredBeaches, setFilteredBeaches] = useState<Beach[]>(beaches);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // Extract unique features from all beaches
  const allFeatures = useMemo(() => {
    const features = new Set<string>();
    beaches.forEach(beach => {
      beach.features.forEach(feature => {
        features.add(feature.label);
      });
    });
    return Array.from(features).sort();
  }, [beaches]);

  // Get the appropriate icon for a feature - memoized to improve performance
  const getFeatureIcon = useCallback((label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('sonnenbaden')) return <Sun className="h-4 w-4" />;
    if (lowerLabel.includes('strandkörbe')) return <Umbrella className="h-4 w-4" />;
    if (lowerLabel.includes('wassersport')) return <Waves className="h-4 w-4" />;
    if (lowerLabel.includes('wind') || lowerLabel.includes('surfen')) return <Wind className="h-4 w-4" />;
    if (lowerLabel.includes('watt') || lowerLabel.includes('fisch')) return <Fish className="h-4 w-4" />;
    if (lowerLabel.includes('düne') || lowerLabel.includes('landschaft')) return <Trees className="h-4 w-4" />;
    
    // Default icon if none match
    return <Sun className="h-4 w-4" />;
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

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    try {
      const term = searchQuery.toLowerCase().trim();
      
      let filtered = [...beaches];
      
      // Apply search term filter
      if (term) {
        filtered = filtered.filter(beach => 
          beach.name.toLowerCase().includes(term) || 
          beach.description.toLowerCase().includes(term) ||
          beach.location.toLowerCase().includes(term) ||
          beach.highlights.some(h => h.toLowerCase().includes(term))
        );
      }
      
      // Apply feature filters
      if (selectedFeatures.length > 0) {
        filtered = filtered.filter(beach => 
          selectedFeatures.every(feature => 
            beach.features.some(f => f.label === feature)
          )
        );
      }
      
      setFilteredBeaches(filtered);
    } catch (error) {
      console.error('Error filtering beaches:', error);
      setHasError(true);
    }
  }, [beaches, searchQuery, selectedFeatures]);

  // Handle search
  const handleSearch = () => {
    applyFilters();
  };

  // Function to reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedFeatures([]);
    setIsFilterVisible(false);
  }, []);

  // Apply filters when filter properties change
  useMemo(() => {
    applyFilters();
  }, [applyFilters]);

  // Memoize beaches list to prevent unnecessary re-renders
  const beachesList = useMemo(() => {
    if (hasError) {
      return (
        <div className="text-center py-10 rounded-lg bg-red-50 text-red-800">
          <AlertTriangle className="h-10 w-10 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Beim Laden der Strände ist ein Fehler aufgetreten</h3>
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

    if (filteredBeaches.length === 0) {
      return (
        <div className="text-center py-16 rounded-lg bg-muted/30">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Keine Strände gefunden</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Leider entspricht kein Strand Ihren Suchkriterien. Bitte passen Sie Ihre Filter an oder versuchen Sie es mit anderen Suchbegriffen.
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
        {filteredBeaches.map((beach) => (
          <BeachCard
            key={beach.id}
            beach={beach}
            layout={layout}
            getFeatureIcon={getFeatureIcon}
          />
        ))}
      </div>
    );
  }, [filteredBeaches, layout, hasError, resetFilters, getFeatureIcon]);

  return (
    <div className="space-y-8">
      {/* Search and filter header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Strand suchen..."
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
                {(beaches.length - filteredBeaches.length) > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[1.25rem] flex items-center justify-center bg-muted flex-shrink-0">
                    {beaches.length - filteredBeaches.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="outline" 
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground py-2 px-4 h-auto whitespace-nowrap overflow-hidden"
                disabled={filteredBeaches.length === beaches.length && !searchQuery}
              >
                <X className="mr-1.5 h-3 w-3 flex-shrink-0" />
                <span>Zurücksetzen</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredBeaches.length} {filteredBeaches.length === 1 ? 'Strand' : 'Strände'}
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
            <h3 className="font-medium text-lg">Strände filtern</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFilterVisibility}
              className="h-9 w-9 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Ausstattung & Merkmale</h4>
              <div className="flex flex-wrap gap-2">
                {allFeatures.map((feature) => (
                  <Button
                    key={feature}
                    variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFeature(feature)}
                    className="py-1.5 h-auto whitespace-nowrap overflow-hidden"
                  >
                    {getFeatureIcon(feature)}
                    <span className="ml-1.5">{feature}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {beachesList}
    </div>
  );
}

// Add AlertTriangle component
function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
} 