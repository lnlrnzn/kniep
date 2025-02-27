"use client";

import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Anchor, CalendarDays, Ship, ExternalLink, Info, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define proper types instead of using 'any'
interface FerryNote {
  time: string;
  note?: string;
}

interface FerryRouteSchedule {
  [key: string]: FerryNote[];
}

interface FerryWeekdaySchedule {
  MondayToFriday?: FerryRouteSchedule;
  WeekendHolidays?: FerryRouteSchedule;
  All?: FerryRouteSchedule;
  [key: string]: FerryRouteSchedule | undefined; // Add index signature
}

interface FerrySeason {
  name: string;
  period: string;
  weekdays: FerryWeekdaySchedule;
}

interface FerryRouteDurations {
  DagebullFohr: string;
  DagebullAmrum: string;
  FohrAmrum: string;
}

interface FerryIslandInfo {
  name: string;
  description: string;
}

interface FerryLink {
  name: string;
  description: string;
  url: string;
}

interface FerryAdditionalInfo {
  tickets: string;
  parking: string;
  parkingCenter: string;
}

interface FerryData {
  routeDurations: FerryRouteDurations;
  seasons: FerrySeason[];
  notes: Record<string, string>;
  usefulLinks: FerryLink[];
  additionalInfo: FerryAdditionalInfo;
  islandInfo: FerryIslandInfo[];
}

type FerryScheduleProps = {
  ferryData: FerryData;
};

export function FerrySchedule({ ferryData }: FerryScheduleProps) {
  // Main routes people are most interested in
  const mainRoutes = {
    "DagebullAmrum": "Dagebüll → Amrum",
    "AmrumDagebull": "Amrum → Dagebüll"
  };
  
  // Other routes
  const otherRoutes = {
    "DagebullFohr": "Dagebüll → Föhr",
    "FohrDagebull": "Föhr → Dagebüll",
    "FohrAmrum": "Föhr → Amrum",
    "AmrumFohr": "Amrum → Föhr"
  };
  
  // Combine routes for select
  const allRoutes = { ...mainRoutes, ...otherRoutes };
  
  // Simplified state management - default to most common route
  const [selectedRoute, setSelectedRoute] = useState("DagebullAmrum");
  
  // Create tabs for the three seasons instead of a dropdown
  const seasonTabs = ferryData.seasons.map(s => ({
    value: s.name,
    label: s.name,
    period: s.period
  }));
  
  // Function to get the timetable for a specific season and route
  const getScheduleForSeason = (seasonName: string, route: string) => {
    const season = ferryData.seasons.find(s => s.name === seasonName);
    if (!season) return { all: [] };
    
    const dayTypes = Object.keys(season.weekdays);
    const hasSeparateDays = dayTypes.includes("MondayToFriday") && dayTypes.includes("WeekendHolidays");
    
    // If we have separate days, we need to show both schedules
    if (hasSeparateDays) {
      return {
        weekdays: season.weekdays.MondayToFriday?.[route] || [],
        weekend: season.weekdays.WeekendHolidays?.[route] || []
      };
    }
    
    // Otherwise just show the "All" schedule
    return {
      all: season.weekdays.All?.[route] || []
    };
  };
  
  // Get the duration for the selected route
  const getRouteDuration = () => {
    if (selectedRoute === "DagebullFohr" || selectedRoute === "FohrDagebull") {
      return ferryData.routeDurations.DagebullFohr;
    } else if (selectedRoute === "DagebullAmrum" || selectedRoute === "AmrumDagebull") {
      return ferryData.routeDurations.DagebullAmrum;
    } else {
      return ferryData.routeDurations.FohrAmrum;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Ship className="h-5 w-5 text-primary" /> 
                Fährplan 2025
              </CardTitle>
              <CardDescription className="mt-1">
                Offizielle Abfahrtszeiten der W.D.R.
              </CardDescription>
            </div>
            <Button asChild size="sm" variant="outline">
              <a 
                href="https://www.faehre.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Online buchen
              </a>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Route selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Strecke:</label>
              <p className="text-xs text-muted-foreground">
                Fahrzeit: {getRouteDuration()}
              </p>
            </div>
            <Select 
              value={selectedRoute} 
              onValueChange={setSelectedRoute}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Route auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="header-main" disabled className="font-semibold">
                  Hauptverbindungen:
                </SelectItem>
                {Object.entries(mainRoutes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
                
                <SelectItem value="header-other" disabled className="font-semibold mt-2">
                  Weitere Verbindungen:
                </SelectItem>
                {Object.entries(otherRoutes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Seasons as tabs */}
          <Tabs defaultValue={ferryData.seasons[0].name} className="mb-4">
            <TabsList className="w-full grid grid-cols-3">
              {seasonTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-xs md:text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {ferryData.seasons.map(season => (
              <TabsContent key={season.name} value={season.name} className="pt-4">
                <div className="text-xs text-muted-foreground mb-4">
                  Zeitraum: {season.period}
                </div>
                
                {/* Render schedule based on the day types available */}
                {(() => {
                  const schedules = getScheduleForSeason(season.name, selectedRoute);
                  
                  if ('all' in schedules && schedules.all) {
                    // Just one schedule for all days
                    return (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Abfahrtszeit</TableHead>
                              <TableHead className="text-right">Hinweise</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {schedules.all.length > 0 ? (
                              schedules.all.map((item: FerryNote, index: number) => (
                                <TableRow key={`${item.time}-${index}`}>
                                  <TableCell className="font-medium">{item.time} Uhr</TableCell>
                                  <TableCell className="text-right">
                                    {item.note && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                              {item.note}
                                            </span>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>{ferryData.notes[item.note]}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                                  Keine Abfahrten verfügbar.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    );
                  } else if ('weekdays' in schedules && 'weekend' in schedules) {
                    // Separate schedules for weekdays and weekend
                    return (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Montag - Freitag</h4>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Abfahrtszeit</TableHead>
                                  <TableHead className="text-right">Hinweise</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {schedules.weekdays.length > 0 ? (
                                  schedules.weekdays.map((item: FerryNote, index: number) => (
                                    <TableRow key={`${item.time}-${index}`}>
                                      <TableCell className="font-medium">{item.time} Uhr</TableCell>
                                      <TableCell className="text-right">
                                        {item.note && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                  {item.note}
                                                </span>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>{ferryData.notes[item.note]}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                                      Keine Abfahrten verfügbar.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Samstag, Sonntag & Feiertage</h4>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Abfahrtszeit</TableHead>
                                  <TableHead className="text-right">Hinweise</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {schedules.weekend.length > 0 ? (
                                  schedules.weekend.map((item: FerryNote, index: number) => (
                                    <TableRow key={`${item.time}-${index}`}>
                                      <TableCell className="font-medium">{item.time} Uhr</TableCell>
                                      <TableCell className="text-right">
                                        {item.note && (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                  {item.note}
                                                </span>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>{ferryData.notes[item.note]}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">
                                      Keine Abfahrten verfügbar.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    // Fallback
                    return (
                      <div className="text-center py-4 text-muted-foreground">
                        Keine Abfahrtszeiten verfügbar.
                      </div>
                    );
                  }
                })()}
                
                {/* Notes explanation */}
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Klicken Sie auf die Hinweise (z.B. "a", "b") für Details</span>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Compact notes legend */}
          <div className="text-xs text-muted-foreground mt-6 border-t pt-4">
            <p className="mb-2 font-medium">Hinweise:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(ferryData.notes).map(([key, value]) => (
                <div key={key} className="flex items-start gap-1">
                  <span className="font-medium">{key}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Simplified information footer */}
      <div className="bg-muted/20 rounded-lg p-4 text-sm">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-2">
              <strong>Wichtige Informationen:</strong> Fahrkarten erhältlich auf <a href="https://www.faehre.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.faehre.de</a> oder am Automaten/Schalter im Hafen.
            </p>
            <p>
              Weitere Informationen: <a href="https://www.inselparkplatz.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Parkplätze in Dagebüll</a> · <a href="https://www.amrum.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Amrum Touristinfo</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 