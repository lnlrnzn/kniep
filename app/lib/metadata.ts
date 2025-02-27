// Default metadata configuration for SEO optimization

import { Metadata } from "next";

const siteConfig = {
  name: "Amrum Tourismus",
  domain: "kniep-amrum.com",
  mainUrl: "https://kniep-amrum.com",
  description: "Entdecken Sie die wunderschöne Insel Amrum: Traumstrände, Naturschutzgebiete, vielfältige Unterkünfte und Events für einen unvergesslichen Urlaub an der Nordsee.",
  featuredImage: "/images/og-image.jpg",
  locale: "de_DE",
  twitterHandle: "@kniepamrum",
};

// Base metadata that can be extended for individual pages
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.mainUrl),
  alternates: {
    canonical: "/",
    languages: {
      'de-DE': "/",
      'en-US': "/en",
    },
  },
  title: {
    default: `${siteConfig.name} | ${siteConfig.domain}`,
    template: `%s | ${siteConfig.domain}`,
  },
  description: siteConfig.description,
  keywords: [
    "Amrum", 
    "Nordsee", 
    "Insel", 
    "Urlaub", 
    "Tourismus", 
    "Strand", 
    "Wattenmeer", 
    "Norddeutschland",
    "Ferienhaus",
    "Ferienwohnung",
    "Nordfriesland"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.mainUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.domain}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.featuredImage,
        width: 1200,
        height: 630,
        alt: siteConfig.domain,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.domain}`,
    description: siteConfig.description,
    images: [siteConfig.featuredImage],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "travel",
  verification: {
    // Add verification strings if available
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Helper function to generate metadata for specific pages
export function generatePageMetadata({
  title,
  description,
  image,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const pageUrl = `${siteConfig.mainUrl}${path}`;
  
  return {
    ...baseMetadata,
    title: title,
    description: description || baseMetadata.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        'de-DE': `${siteConfig.mainUrl}${path}`,
        'en-US': `${siteConfig.mainUrl}/en${path}`,
      },
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: title,
      description: description || baseMetadata.description as string,
      url: pageUrl,
      images: [
        {
          url: image || siteConfig.featuredImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: title,
      description: description || baseMetadata.description as string,
      images: [image || siteConfig.featuredImage],
    },
    robots: noIndex ? { index: false, follow: false } : baseMetadata.robots,
  };
} 