/**
 * Central exports for all types used in the Kniep website
 */

// Re-export all types from their respective files
export * from './accommodation';
export * from './ferry';
export * from './blog';

// Add any global types here
export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale?: string;
    type?: string;
  };
  twitter?: {
    cardType?: string;
    site?: string;
  };
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface PageProps {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  message?: string;
}

// Beach interface for strand/beaches section
export interface Beach {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  location: string;
  image: string;
  features: {
    icon?: React.ReactNode;
    label: string;
  }[];
  highlights: string[];
  bestTime: string;
} 