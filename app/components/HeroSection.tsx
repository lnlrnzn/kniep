"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Hero-Bilder mit SEO-freundlichen Dateinamen
const heroImages = [
  {
    src: "/images/amrum-panorama-insel.webp",
    alt: "Panoramablick auf die Insel Amrum mit weißen Sandstränden und Dünenlandschaft"
  },
  {
    src: "/images/amrum-duenen-leuchtturm.webp",
    alt: "Traumhafter Blick auf den Amrumer Leuchtturm"
  },
  {
    src: "/images/amrum-natur-duenen.webp", 
    alt: "Amrum - Endloser Blick auf die Dünenlandschaft"
  }
  
  // Später durch echte Bilder ersetzen:
  // {
  //   src: "/images/amrum-strand-nordsee.webp",
  //   alt: "Weiter Sandstrand an der Nordseeküste von Amrum mit Blick auf das Meer" 
  // },
  // {
  //   src: "/images/amrum-leuchtturm-duenen.webp",
  //   alt: "Historischer Leuchtturm von Amrum inmitten der charakteristischen Dünenlandschaft"
  // }
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Automatischer Bildwechsel alle 5 Sekunden
  useEffect(() => {
    console.log("Bilder im Array:", heroImages.length); // Debug-Info
    
    // Nur aktivieren, wenn mehr als ein Bild vorhanden ist
    if (heroImages.length <= 1) {
      console.log("Nur ein Bild vorhanden, kein Wechsel nötig");
      return;
    }
    
    console.log("Bildwechsel aktiviert");
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1;
        console.log("Wechsel von Bild", prevIndex, "zu Bild", newIndex);
        return newIndex;
      });
    }, 5000);
    
    return () => {
      console.log("Bildwechsel-Intervall gestoppt");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-blue-100">
      {/* Bildergalerie mit Animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentImageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          <Image
            src={heroImages[currentImageIndex].src}
            alt={heroImages[currentImageIndex].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
          
          {/* Gradient-Overlay für bessere Lesbarkeit des Textes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay mit Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.div 
          className="mt-16 sm:mt-20 px-4 py-6 rounded-lg backdrop-blur-sm bg-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Willkommen auf Amrum
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl px-4 drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Entdecken Sie die Schönheit der Nordseeinsel
          </motion.p>
          <motion.a
            href="/urlaub/unterkuenfte"
            className="inline-flex px-6 py-3 rounded-md bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Unterkünfte ansehen
          </motion.a>
        </motion.div>
      </div>
      
      {/* Bildgalerie-Indikatoren (Punkte) - nur anzeigen, wenn mehr als ein Bild vorhanden ist */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-110 shadow-md' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Bild ${index + 1} anzeigen`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection; 