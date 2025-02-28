/**
 * Ferry Schedule type definitions for Kniep website
 */

/**
 * Represents a single ferry departure time with optional notes
 */
export interface FerryNote {
  time: string;
  note?: string;
}

/**
 * Schedule for a specific route (e.g., DagebullFohr)
 */
export type FerryRouteSchedule = FerryNote[];

/**
 * Collection of routes for a specific day type (weekday, weekend, etc.)
 */
export interface FerryWeekdaySchedule {
  [key: string]: FerryRouteSchedule;
}

/**
 * A season with different schedules based on day of the week
 */
export interface FerrySeason {
  name: string;
  period: string;
  weekdays: {
    MondayToFriday?: FerryWeekdaySchedule;
    WeekendHolidays?: FerryWeekdaySchedule;
    All?: FerryWeekdaySchedule;
    [key: string]: FerryWeekdaySchedule | undefined;
  };
}

/**
 * Duration information for different routes
 */
export interface FerryRouteDurations {
  DagebullFohr: string;
  DagebullAmrum: string;
  FohrAmrum: string;
}

/**
 * Information about an island served by the ferry
 */
export interface FerryIslandInfo {
  name: string;
  description: string;
}

/**
 * Information about useful links related to the ferry service
 */
export interface FerryLink {
  name: string;
  description: string;
  url: string;
}

/**
 * Additional information about tickets, parking, etc.
 */
export interface FerryAdditionalInfo {
  tickets: string;
  parking: string;
  parkingCenter: string;
}

/**
 * Complete ferry data structure
 */
export interface FerryData {
  routeDurations: FerryRouteDurations;
  seasons: FerrySeason[];
  notes: Record<string, string>;
  usefulLinks: FerryLink[];
  additionalInfo: FerryAdditionalInfo;
  islandInfo: FerryIslandInfo[];
} 