"use client";

import Link from "next/link";
import { ChevronRight, Map } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveMap from "../../../components/map/InteractiveMap";
import { ContentContainer } from "../../../components/ui/content-container";

export default function KartePage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/ueber-amrum" className="hover:text-foreground transition-colors">
          Über Amrum
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Interaktive Karte</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          <span className="inline-flex items-center gap-2">
            <Map className="h-8 w-8 text-primary" />
            Interaktive Amrum-Karte
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Erkunden Sie Amrum interaktiv und entdecken Sie die wichtigsten Sehenswürdigkeiten, 
          Strände, Unterkünfte und Restaurants. Wählen Sie die Kategorie, die Sie interessiert, 
          und klicken Sie auf die Markierungen, um mehr zu erfahren.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <InteractiveMap />
      </motion.div>

      <div className="bg-muted/20 rounded-lg p-6 text-sm text-muted-foreground">
        <h2 className="text-lg font-semibold mb-2 text-foreground">Über diese Karte</h2>
        <p className="mb-4">
          Diese interaktive Karte zeigt Ihnen die wichtigsten Points of Interest auf Amrum. 
          Bitte beachten Sie, dass sie zu Demonstrationszwecken erstellt wurde und keine 
          vollständige oder maßstabsgetreue Darstellung der Insel bietet.
        </p>
        <p>
          Für eine genaue Navigation vor Ort empfehlen wir Ihnen, eine offizielle Amrum-Karte 
          zu erwerben, die in allen Tourist-Informationen der Insel erhältlich ist.
        </p>
      </div>
    </ContentContainer>
  );
} 