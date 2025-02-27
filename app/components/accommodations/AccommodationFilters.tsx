"use client";

import { useState, useEffect } from "react";
import { Accommodation } from "@/app/lib/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AccommodationFiltersProps {
  accommodations: Accommodation[];
  onFiltersChange: (filtered: Accommodation[]) => void;
}

export function AccommodationFilters({ 
  accommodations, 
  onFiltersChange 
}: AccommodationFiltersProps) {
  // Filter states
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract unique values for filters
  const locations = Array.from(new Set(
    accommodations.map(acc => {
      // Extract the city/district part from the location
      if (acc.city) return acc.city;
      
      const parts = acc.location.split(',');
      if (parts.length >= 2) {
        const cityPart = parts[parts.length - 2].trim();
        const cityMatch = cityPart.match(/\d+\s+(.+)/);
        return cityMatch ? cityMatch[1] : cityPart;
      }
      return "Unspecified";
    })
  )).sort();
  
  // Extract accommodation types
  const types = Array.from(new Set(
    accommodations.map(acc => acc.type)
  )).sort();
  
  // Map type values to user-friendly names
  const typeNames: Record<string, string> = {
    hotel: "Hotels",
    ferienhaus: "Ferienhäuser",
    ferienwohnung: "Ferienwohnungen",
    pension: "Pensionen"
  };
  
  // Extract price ranges
  const prices = Array.from(new Set(
    accommodations.map(acc => acc.price)
  )).sort((a, b) => a.length - b.length);
  
  // Extract features
  const features = Array.from(new Set(
    accommodations.flatMap(acc => acc.features)
  )).sort();
  
  // Apply filters when any filter changes
  useEffect(() => {
    // Apply all active filters
    const filtered = accommodations.filter(acc => {
      // Apply search filter
      if (searchQuery && !acc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !acc.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply location filter
      if (selectedLocation) {
        const location = acc.city || acc.location;
        if (!location.includes(selectedLocation)) {
          return false;
        }
      }
      
      // Apply type filter
      if (selectedType && acc.type !== selectedType) {
        return false;
      }
      
      // Apply price filter
      if (selectedPrice && acc.price !== selectedPrice) {
        return false;
      }
      
      // Apply feature filter
      if (selectedFeature && !acc.features.includes(selectedFeature)) {
        return false;
      }
      
      return true;
    });
    
    onFiltersChange(filtered);
  }, [accommodations, searchQuery, selectedLocation, selectedType, selectedPrice, selectedFeature, onFiltersChange]);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation(null);
    setSelectedType(null);
    setSelectedPrice(null);
    setSelectedFeature(null);
  };
  
  // Count how many filters are active
  const activeFiltersCount = [
    searchQuery, 
    selectedLocation, 
    selectedType, 
    selectedPrice,
    selectedFeature
  ].filter(Boolean).length;

  // Constants for default "All" values
  const ALL_LOCATIONS = "all-locations";
  const ALL_TYPES = "all-types";
  const ALL_PRICES = "all-prices";
  const ALL_FEATURES = "all-features";
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Search filter */}
        <div className="space-y-2">
          <Label htmlFor="search">Suche</Label>
          <Input
            id="search"
            placeholder="Suche nach Namen, Ort, usw."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Location filter */}
        <div className="space-y-2">
          <Label htmlFor="location">Ort</Label>
          <Select
            value={selectedLocation || ALL_LOCATIONS}
            onValueChange={(value) => setSelectedLocation(value === ALL_LOCATIONS ? null : value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Alle Orte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_LOCATIONS}>Alle Orte</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Type filter */}
        <div className="space-y-2">
          <Label htmlFor="type">Unterkunftstyp</Label>
          <Select
            value={selectedType || ALL_TYPES}
            onValueChange={(value) => setSelectedType(value === ALL_TYPES ? null : value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Alle Typen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_TYPES}>Alle Typen</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {typeNames[type] || type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Price filter */}
        <div className="space-y-2">
          <Label htmlFor="price">Preiskategorie</Label>
          <Select
            value={selectedPrice || ALL_PRICES}
            onValueChange={(value) => setSelectedPrice(value === ALL_PRICES ? null : value)}
          >
            <SelectTrigger id="price">
              <SelectValue placeholder="Alle Preise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_PRICES}>Alle Preise</SelectItem>
              {prices.map((price) => (
                <SelectItem key={price} value={price}>
                  {price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Feature filter */}
        <div className="space-y-2">
          <Label htmlFor="feature">Ausstattung</Label>
          <Select
            value={selectedFeature || ALL_FEATURES}
            onValueChange={(value) => setSelectedFeature(value === ALL_FEATURES ? null : value)}
          >
            <SelectTrigger id="feature">
              <SelectValue placeholder="Alle Merkmale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FEATURES}>Alle Merkmale</SelectItem>
              {features.map((feature) => (
                <SelectItem key={feature} value={feature}>
                  {feature}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {activeFiltersCount > 0 && (
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" /> Filter zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );
} 