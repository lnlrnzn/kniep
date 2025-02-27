// JSON-LD structured data helpers for SEO

// Organization structured data
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Amrum Tourismus GmbH",
  "url": "https://kniep-amrum.com",
  "logo": "https://kniep-amrum.com/logo.png",
  "sameAs": [
    "https://facebook.com/amrumtourismus",
    "https://instagram.com/amrumtourismus",
    "https://twitter.com/kniepamrum"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strandstraße 123",
    "addressLocality": "Wittdün",
    "postalCode": "25946",
    "addressRegion": "Schleswig-Holstein",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+494682-12345",
    "contactType": "customer service",
    "availableLanguage": ["German", "English"]
  }
};

// Tourism destination data
export const destinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Amrum",
  "description": "Amrum ist eine der Nordfriesischen Inseln im Wattenmeer der Nordsee mit ausgedehnten Sandstränden, malerischen Dörfern und einzigartiger Natur.",
  "touristType": ["Beach Lovers", "Nature Enthusiasts", "Families", "Couples"],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "54.6500",
    "longitude": "8.3333"
  },
  "includesAttraction": [
    {
      "@type": "TouristAttraction",
      "name": "Kniepsand",
      "description": "Einer der breitesten Sandstrände Europas"
    },
    {
      "@type": "TouristAttraction",
      "name": "Amrum Leuchtturm",
      "description": "Historischer Leuchtturm mit Aussichtsplattform"
    },
    {
      "@type": "TouristAttraction",
      "name": "Naturschutzgebiet Amrum Odde",
      "description": "Einzigartige Dünenlandschaft im Norden der Insel"
    }
  ]
};

// TravelAgency data (for tourism website)
export const travelAgencyJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Amrum Tourismus GmbH",
  "url": "https://kniep-amrum.com",
  "description": "Ihr offizieller Ansprechpartner für Urlaub auf der Nordseeinsel Amrum.",
  "openingHours": "Mo-Fr 09:00-17:00, Sa 10:00-14:00",
  "telephone": "+494682-12345",
  "image": "https://kniep-amrum.com/images/amrum-tourism-office.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strandstraße 123",
    "addressLocality": "Wittdün",
    "postalCode": "25946",
    "addressRegion": "Schleswig-Holstein",
    "addressCountry": "DE"
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Amrum"
  }
};

// Event structured data generator
export function generateEventJsonLd(event: {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amrum, Germany"
      }
    },
    "image": event.image || "https://kniep-amrum.com/images/events-default.jpg",
    "organizer": {
      "@type": "Organization",
      "name": "Amrum Tourismus GmbH",
      "url": "https://kniep-amrum.com"
    }
  };
}

// Accommodation structured data generator
export function generateAccommodationJsonLd(accommodation: {
  name: string;
  description: string;
  type: string;
  image?: string;
  priceRange: string;
  address: string;
  rating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": accommodation.type === "hotel" ? "Hotel" : "LodgingBusiness",
    "name": accommodation.name,
    "description": accommodation.description,
    "image": accommodation.image || "https://kniep-amrum.com/images/accommodation-default.jpg",
    "priceRange": accommodation.priceRange,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": accommodation.address,
      "addressLocality": "Amrum",
      "addressRegion": "Schleswig-Holstein",
      "addressCountry": "DE"
    },
    ...(accommodation.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": accommodation.rating,
        "reviewCount": "50"
      }
    }),
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "WLAN",
        "value": true
      }
    ]
  };
}

// Generate breadcrumbs structured data
export function generateBreadcrumbJsonLd(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://kniep-amrum.com${item.url}`
    }))
  };
}

// FAQPage structured data
export function generateFaqJsonLd(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
} 