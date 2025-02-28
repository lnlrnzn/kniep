/**
 * Accommodation type definitions for Kniep website
 */

/**
 * Base Accommodation Interface
 * Defines the properties that all accommodation types share
 */
export interface BaseAccommodation {
  id: string;
  name: string;
  price: string;
  location: string;
  city: string;
  description: string;
  image: string;
  features: string[];
  rating: number;
  website?: string;
  phone?: string;
}

/**
 * Different types of accommodations
 */
export type AccommodationType = 'hotel' | 'ferienhaus' | 'ferienwohnung' | 'pension';

/**
 * Hotel specific properties
 */
export interface Hotel extends BaseAccommodation {
  type: 'hotel';
  stars: number;
  hasRestaurant?: boolean;
  hasPool?: boolean;
  hasSpa?: boolean;
  roomTypes?: string[];
  checkInTime?: string;
  checkOutTime?: string;
}

/**
 * Vacation Home (Ferienhaus) specific properties
 */
export interface Ferienhaus extends BaseAccommodation {
  type: 'ferienhaus';
  bedrooms?: number;
  bathrooms?: number;
  maxOccupancy?: number;
  area?: number; // in square meters
  hasGarden?: boolean;
  hasTerrace?: boolean;
  pets?: boolean;
}

/**
 * Apartment (Ferienwohnung) specific properties
 */
export interface Ferienwohnung extends BaseAccommodation {
  type: 'ferienwohnung';
  bedrooms?: number;
  bathrooms?: number;
  maxOccupancy?: number;
  area?: number; // in square meters
  floor?: number;
  hasBalcony?: boolean;
  pets?: boolean;
}

/**
 * Guesthouse (Pension) specific properties
 */
export interface Pension extends BaseAccommodation {
  type: 'pension';
  stars: number;
  hasBreakfast?: boolean;
  familyOwned?: boolean;
}

/**
 * Union type for all accommodation types
 */
export type Accommodation = Hotel | Ferienhaus | Ferienwohnung | Pension; 