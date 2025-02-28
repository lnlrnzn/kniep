import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Restaurant } from "@/app/lib/data";

interface RestaurantFiltersProps {
  restaurants: Restaurant[];
  onFiltersChange: (filteredRestaurants: Restaurant[]) => void;
}

export function RestaurantFilters({ restaurants, onFiltersChange }: RestaurantFiltersProps) {
  // Extract unique values for each filter
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique locations (we'll use the city/district part of the address)
  const locations = Array.from(new Set(
    restaurants.map(restaurant => {
      // Extract the city/district part from the location string
      const parts = restaurant.location.split(',');
      if (parts.length >= 2) {
        // Return the second-to-last part which is usually the city/district
        const cityPart = parts[parts.length - 2].trim();
        // Further extract just the name without postal code
        const cityMatch = cityPart.match(/\d+\s+(.+)/);
        return cityMatch ? cityMatch[1] : cityPart;
      }
      return "Unspecified";
    })
  )).sort();

  // Extract unique restaurant types
  const types = Array.from(new Set(
    restaurants.map(restaurant => restaurant.type)
  )).sort();

  // Extract unique cuisines
  const cuisines = Array.from(new Set(
    restaurants.map(restaurant => restaurant.cuisine)
  )).filter(Boolean).sort();

  // Apply filters whenever they change
  useEffect(() => {
    let filtered = [...restaurants];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(restaurant => 
        restaurant.location.includes(selectedLocation)
      );
    }

    if (selectedType) {
      filtered = filtered.filter(restaurant => 
        restaurant.type === selectedType
      );
    }

    if (selectedCuisine) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine === selectedCuisine
      );
    }

    onFiltersChange(filtered);
  }, [searchQuery, selectedLocation, selectedType, selectedCuisine, restaurants, onFiltersChange]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation(null);
    setSelectedType(null);
    setSelectedCuisine(null);
  };

  // Display the selected filters
  const hasActiveFilters = selectedLocation || selectedType || selectedCuisine || searchQuery;

  // Helper function to handle capitalization for display
  const formatDisplayText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Nach Restaurant, Küche oder Merkmalen suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-6 text-base"
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0" 
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Löschen</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filter Categories */}
      <div className="space-y-4 mb-6">
        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Ort</h3>
          <div className="flex flex-wrap gap-2">
            {locations.map(location => (
              <Badge 
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => setSelectedLocation(selectedLocation === location ? null : location)}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Typ</h3>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <Badge 
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => setSelectedType(selectedType === type ? null : type)}
              >
                {formatDisplayText(type)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Cuisine Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Küche</h3>
          <div className="flex flex-wrap gap-2">
            {cuisines.map(cuisine => (
              <Badge 
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)}
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters & Reset */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-secondary/30 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Aktive Filter:</span>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  <span className="truncate max-w-[150px]">&quot;{searchQuery}&quot;</span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:text-destructive"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Löschen</span>
                  </Button>
                </Badge>
              )}
              {selectedLocation && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  <span>Ort: {selectedLocation}</span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:text-destructive"
                    onClick={() => setSelectedLocation(null)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Löschen</span>
                  </Button>
                </Badge>
              )}
              {selectedType && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  <span>Typ: {formatDisplayText(selectedType)}</span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:text-destructive"
                    onClick={() => setSelectedType(null)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Löschen</span>
                  </Button>
                </Badge>
              )}
              {selectedCuisine && (
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  <span>Küche: {selectedCuisine}</span>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:text-destructive"
                    onClick={() => setSelectedCuisine(null)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Löschen</span>
                  </Button>
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="whitespace-nowrap"
          >
            Alle zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );
} 