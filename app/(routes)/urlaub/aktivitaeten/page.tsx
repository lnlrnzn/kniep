"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Dumbbell, Film, Waves, Ship, Trees, Baby, Compass, Bike } from "lucide-react";
import { ContentContainer } from "../../../components/ui/content-container";
import { Button } from "@/components/ui/button";

// Aktivitätskategorien
const activityCategories = [
  {
    id: "fitness",
    title: "Fitness & Wellness",
    description: "Sportangebote, Fitnessstudios und Wellness-Einrichtungen auf Amrum",
    icon: <Dumbbell className="h-6 w-6" />,
    image: "/images/activities/fitness.webp",
    link: "/urlaub/aktivitaeten/fitness"
  },
  {
    id: "wassersport",
    title: "Wassersport",
    description: "Surfen, Segeln, Kiten und weitere Wassersportangebote",
    icon: <Waves className="h-6 w-6" />,
    image: "/images/activities/wassersport.webp",
    link: "/urlaub/aktivitaeten/wassersport"
  },
  {
    id: "familie",
    title: "Familienaktivitäten",
    description: "Kinderfreundliche Aktivitäten und Unternehmungen für die ganze Familie",
    icon: <Baby className="h-6 w-6" />,
    image: "/images/activities/familie.webp",
    link: "/urlaub/aktivitaeten/familie"
  },
  {
    id: "natur",
    title: "Naturerlebnisse",
    description: "Geführte Wanderungen, Naturpfade und Umweltbildungsangebote",
    icon: <Trees className="h-6 w-6" />,
    image: "/images/activities/natur.webp",
    link: "/urlaub/aktivitaeten/natur"
  },
  {
    id: "ausflug",
    title: "Ausflüge & Touren",
    description: "Bootstouren, Inselrundfahrten und Ausflüge zu den Nachbarinseln",
    icon: <Ship className="h-6 w-6" />,
    image: "/images/activities/ausflug.webp", 
    link: "/urlaub/aktivitaeten/ausflug"
  },
  {
    id: "mobilität",
    title: "Mobilität auf der Insel",
    description: "Fahrradverleih, E-Bikes und weitere Fortbewegungsmittel",
    icon: <Bike className="h-6 w-6" />,
    image: "/images/activities/fahrrad.webp",
    link: "/urlaub/aktivitaeten/mobilitaet"
  },
  {
    id: "unterhaltung",
    title: "Unterhaltung",
    description: "Kino, Veranstaltungen, Museen und Kulturangebote",
    icon: <Film className="h-6 w-6" />,
    image: "/images/activities/unterhaltung.webp", 
    link: "/urlaub/aktivitaeten/unterhaltung-kultur"
  },
  {
    id: "inseltouren",
    title: "Inselentdeckung",
    description: "Geführte Inseltouren und besondere Erlebnisangebote",
    icon: <Compass className="h-6 w-6" />,
    image: "/images/activities/inseltour.webp", 
    link: "/urlaub/aktivitaeten/inseltouren"
  }
];

// Animations-Varianten
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero-Bereich mit Bild */}
      <div className="relative w-full h-[40vh] min-h-[300px]">
        <Image
          src="/images/activities/aktivitaeten-hero.webp" // Übergreifendes Aktivitätsbild
          alt="Aktivitäten auf Amrum"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Aktivitäten auf Amrum</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Entdecken Sie die Vielfalt an Freizeitmöglichkeiten und Erlebnisangeboten auf unserer wunderschönen Insel
            </p>
          </div>
        </div>
      </div>

      <ContentContainer className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Freizeitangebote für jeden Geschmack</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Von Wassersport und Fitness bis hin zu Familienaktivitäten und Kulturerlebnissen - 
            Amrum bietet vielfältige Möglichkeiten für einen abwechslungsreichen Urlaub.
            Wählen Sie eine Kategorie, um mehr zu erfahren.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {activityCategories.map((category) => (
            <motion.div 
              key={category.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
              variants={itemVariants}
            >
              <Link href={category.link} className="block">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="flex items-center mb-2">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-3">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="border-t border-gray-100 pt-3 font-medium text-sm text-blue-600">
                    <div className="flex justify-between items-center">
                      <div className="text-blue-600 font-medium">
                        Mehr →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="bg-gray-50 rounded-xl p-6 mt-12">
          <h3 className="text-xl font-bold mb-3">Individuelle Aktivitätsplanung</h3>
          <p className="text-gray-600 mb-4">
            Sie wissen nicht genau, welche Aktivitäten für Sie am besten geeignet sind? Kontaktieren Sie die Amrum Touristik für eine 
            persönliche Beratung und individuelle Empfehlungen basierend auf Ihren Interessen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">Häufige Fragen</Link>
            </Button>
          </div>
        </div>
      </ContentContainer>
    </>
  );
} 