"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Star, Filter, Grid, Grid3X3, X, Heart, Search, ChevronDown, Sliders, Users, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Define Activity interface based on the page structure
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

// Memoize the ActivityCard component to prevent unnecessary re-renders
const ActivityCard = memo(({ 
  activity, 
  layout
}: { 
  activity: Activity; 
  layout: 'grid' | 'list';
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Placeholder image for activities
  const getPlaceholderImage = () => {
    return '/images/placeholder-activity.jpg';
  };

  // Type icon based on activity type
  const getTypeIcon = () => {
    switch (activity.type) {
      case 'nature':
        return <Tag className="h-4 w-4" />;
      case 'water':
        return <Search className="h-4 w-4" />;
      case 'culture':
        return <Tag className="h-4 w-4" />;
      case 'active':
        return <Tag className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
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
          href={`/urlaub/aktivitaeten/${activity.id}`}
          className="block w-full h-full"
        >
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'} z-10`}
            aria-hidden="true"
          >
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <Image 
            src={imageError ? getPlaceholderImage() : activity.image}
            alt={`Foto von ${activity.name}`}
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
            {activity.type === 'nature' ? 'Natur' : 
             activity.type === 'water' ? 'Wassersport' : 
             activity.type === 'culture' ? 'Kultur' : 'Aktiv'}
          </Badge>
          {activity.season && activity.season.length > 0 && (
            <Badge variant="secondary" className="bg-white/90 hover:bg-white text-xs font-medium shadow-sm backdrop-blur-sm flex items-center gap-1 px-3 py-1 whitespace-nowrap overflow-hidden">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              {activity.season[0] === 'Ganzjährig' ? 'Ganzjährig' : activity.season[0] + (activity.season.length > 1 ? '+' : '')}
            </Badge>
          )}
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
                href={`/urlaub/aktivitaeten/${activity.id}`}
                className="focus:outline-none focus:underline"
              >
                {activity.name}
              </Link>
            </h3>
            
            {/* Location */}
            {activity.location && (
              <div className="flex items-start gap-2.5 mt-3">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">{activity.location}</span>
              </div>
            )}
            
            {/* Duration */}
            {activity.duration && (
              <div className="flex items-start gap-2.5 mt-3">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">
                  {activity.duration}
                </div>
              </div>
            )}

            {/* Suitable for */}
            {activity.suitable && activity.suitable.length > 0 && (
              <div className="flex items-start gap-2.5 mt-3">
                <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-muted-foreground">
                  {activity.suitable.join(', ')}
                </div>
              </div>
            )}

            {/* Description */}
            {activity.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-3">{activity.description}</p>
            )}
            
            {/* Features */}
            {activity.features && activity.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 mt-2">
                {activity.features.slice(0, 4).map((feature: string, index: number) => (
                  <div 
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground whitespace-nowrap overflow-hidden"
                  >
                    <span className="truncate max-w-[120px]">{feature}</span>
                  </div>
                ))}
                {activity.features.length > 4 && (
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground whitespace-nowrap">
                    +{activity.features.length - 4} weitere
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <CardFooter className="p-5 pt-3 border-t border-muted/40 mt-auto">
          <div className="w-full flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 text-sm font-medium">
              <Link href={`/urlaub/aktivitaeten/${activity.id}`} className="flex items-center justify-center w-full">
                Details ansehen
              </Link>
            </Button>
            <Button variant="default" size="sm" className="flex-1 text-sm font-medium">
              <span className="flex items-center justify-center w-full">
                {activity.booking.includes("Voranmeldung") ? "Jetzt buchen" : "Informationen"}
              </span>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
});

ActivityCard.displayName = 'ActivityCard';

interface ActivityListWithFiltersProps {
  activities: Activity[];
}

export default function ActivityListWithFilters({ activities }: ActivityListWithFiltersProps) {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

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

  // Apply filters
  const applyFilters = useCallback(() => {
    try {
      const term = searchQuery.toLowerCase().trim();
      
      let filtered = [...activities];
      
      // Apply search term filter
      if (term) {
        filtered = filtered.filter(activity => 
          activity.name.toLowerCase().includes(term) || 
          activity.description.toLowerCase().includes(term) ||
          activity.location.toLowerCase().includes(term) ||
          activity.features.some(f => f.toLowerCase().includes(term)) ||
          activity.suitable.some(s => s.toLowerCase().includes(term))
        );
      }
      
      // Apply type filter
      if (selectedType) {
        filtered = filtered.filter(activity => activity.type === selectedType);
      }
      
      // Apply season filter
      if (selectedSeason) {
        filtered = filtered.filter(activity => 
          activity.season.some(s => s.toLowerCase().includes(selectedSeason.toLowerCase()))
        );
      }
      
      setFilteredActivities(filtered);
    } catch (error) {
      console.error('Error filtering activities:', error);
      setHasError(true);
    }
  }, [activities, searchQuery, selectedType, selectedSeason]);

  // Handle search
  const handleSearch = () => {
    applyFilters();
  };

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedType(null);
    setSelectedSeason(null);
    setIsFilterVisible(false);
  }, []);

  // Handle type selection
  const handleTypeChange = (type: string | null) => {
    setSelectedType(prev => prev === type ? null : type);
  };

  // Handle season selection
  const handleSeasonChange = (season: string | null) => {
    setSelectedSeason(prev => prev === season ? null : season);
  };

  // Apply filters when filter properties change
  useMemo(() => {
    applyFilters();
  }, [applyFilters]);

  // Memoize activities list to prevent unnecessary re-renders
  const activitiesList = useMemo(() => {
    if (hasError) {
      return (
        <div className="text-center py-10 rounded-lg bg-red-50 text-red-800">
          <AlertTriangle className="h-10 w-10 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Beim Laden der Aktivitäten ist ein Fehler aufgetreten</h3>
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

    if (filteredActivities.length === 0) {
      return (
        <div className="text-center py-16 rounded-lg bg-muted/30">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">Keine Aktivitäten gefunden</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Leider entspricht keine Aktivität Ihren Suchkriterien. Bitte passen Sie Ihre Filter an oder versuchen Sie es mit anderen Suchbegriffen.
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
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            layout={layout}
          />
        ))}
      </div>
    );
  }, [filteredActivities, layout, hasError, resetFilters]);

  return (
    <div className="space-y-8">
      {/* Search and filter header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Aktivität suchen..."
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
                {(activities.length - filteredActivities.length) > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[1.25rem] flex items-center justify-center bg-muted flex-shrink-0">
                    {activities.length - filteredActivities.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="outline" 
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground py-2 px-4 h-auto whitespace-nowrap overflow-hidden"
                disabled={filteredActivities.length === activities.length && !searchQuery}
              >
                <X className="mr-1.5 h-3 w-3 flex-shrink-0" />
                <span>Zurücksetzen</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredActivities.length} {filteredActivities.length === 1 ? 'Aktivität' : 'Aktivitäten'}
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
            <h3 className="font-medium text-lg">Aktivitäten filtern</h3>
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
              <h4 className="text-sm font-medium mb-3">Aktivitäts-Typ</h4>
              <div className="flex flex-wrap gap-2">
                {['nature', 'water', 'culture', 'active'].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeChange(type)}
                    className="py-1.5 h-auto whitespace-nowrap overflow-hidden"
                  >
                    {type === 'nature' ? 'Natur' : 
                     type === 'water' ? 'Wassersport' : 
                     type === 'culture' ? 'Kultur' : 'Aktiv'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Saison</h4>
              <div className="flex flex-wrap gap-2">
                {['Ganzjährig', 'Frühling', 'Sommer', 'Herbst', 'Winter'].map((season) => (
                  <Button
                    key={season}
                    variant={selectedSeason === season ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSeasonChange(season)}
                    className="py-1.5 h-auto whitespace-nowrap overflow-hidden"
                  >
                    {season}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {activitiesList}
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