"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

type JsonLdProps = {
  data: Record<string, any> | Array<Record<string, any>>;
};

/**
 * Renders JSON-LD structured data in a script tag for SEO
 * Can be placed on any page to add schema.org structured data to improve search results
 */
export default function JsonLd({ data }: JsonLdProps) {
  const [jsonLdString, setJsonLdString] = useState<string>("");

  useEffect(() => {
    try {
      // Stringify data while preserving special characters for valid JSON-LD
      const jsonString = JSON.stringify(data)
        .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
      setJsonLdString(jsonString);
    } catch (error) {
      console.error("Error generating JSON-LD:", error);
    }
  }, [data]);

  if (!jsonLdString) return null;

  return (
    <Script 
      id="json-ld" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: jsonLdString }} 
      strategy="afterInteractive"
    />
  );
} 