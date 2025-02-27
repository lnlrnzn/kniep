import { Metadata } from "next";
import { generatePageMetadata } from "@/app/lib/metadata";

// Generate metadata for the homepage
export const metadata: Metadata = generatePageMetadata({
  title: "Willkommen auf Amrum | Traumhafter Inselurlaub an der Nordsee",
  description: "Entdecken Sie die wunderschöne Nordseeinsel Amrum mit ihren traumhaften Stränden, malerischen Dörfern und vielfältigen Freizeitmöglichkeiten für einen unvergesslichen Urlaub.",
  image: "/amrum-strand.jpg",
  path: "/"
}); 