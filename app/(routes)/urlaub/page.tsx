"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sunrise, Utensils, Waves, Map, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentContainer } from "../../components/ui/content-container";

// Urlaubskategorien
const vacationCategories = [
  {
    id: "unterkuenfte",
    title: "Unterkünfte",
    description: "Von gemütlichen Ferienwohnungen bis zu luxuriösen Hotels - finden Sie Ihre perfekte Unterkunft auf Amrum.",
    icon: <Sunrise className="h-6 w-6" />,
    image: "/urlaub/unterkunft.jpg",
    href: "/urlaub/unterkuenfte"
  },
  {
    id: "gastronomie",
    title: "Gastronomie",
    description: "Entdecken Sie kulinarische Highlights mit frischen Meeresfrüchten und regionalen Spezialitäten.",
    icon: <Utensils className="h-6 w-6" />,
    image: "/urlaub/gastronomie.jpg",
    href: "/urlaub/gastronomie"
  },
  {
    id: "straende",
    title: "Strände",
    description: "Erleben Sie die atemberaubenden Strände von Amrum mit feinem, weißem Sand und kristallklarem Wasser.",
    icon: <Waves className="h-6 w-6" />,
    image: "/urlaub/strand.jpg",
    href: "/urlaub/straende"
  },
  {
    id: "aktivitaeten",
    title: "Aktivitäten",
    description: "Von Wassersport bis Radfahren - entdecken Sie die vielfältigen Freizeitmöglichkeiten der Insel.",
    icon: <Map className="h-6 w-6" />,
    image: "/urlaub/aktivitaeten.jpg",
    href: "/urlaub/aktivitaeten"
  },
  {
    id: "anreise",
    title: "Anreise",
    description: "Informationen zur An- und Abreise mit Fähre, Bahn oder Auto für einen reibungslosen Urlaubsstart.",
    icon: <Plane className="h-6 w-6" />,
    image: "/urlaub/anreise.jpg",
    href: "/urlaub/anreise"
  }
];

export default function UrlaubPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 pointer-events-none" />
        <ContentContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-6">Urlaubsplanung auf Amrum</h1>
              <p className="text-lg mb-6 text-muted-foreground">
                Planen Sie Ihren perfekten Aufenthalt auf unserer wunderschönen Nordseeinsel. 
                Wir bieten Ihnen alle Informationen zu Unterkünften, Freizeitaktivitäten, 
                Gastronomie und mehr, damit Ihr Urlaub auf Amrum unvergesslich wird.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Vielfältige Unterkünfte</h3>
                    <p className="text-muted-foreground">
                      Von gemütlichen Ferienwohnungen bis zu luxuriösen Hotels für jeden Geschmack.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Atemberaubende Strände</h3>
                    <p className="text-muted-foreground">
                      Kilometerlange, weiße Sandstrände zum Entspannen und Erholen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Freizeitaktivitäten für die ganze Familie</h3>
                    <p className="text-muted-foreground">
                      Vielfältige Angebote für aktive Urlauber und Erholungssuchende.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/urlaub-header.jpg"
                alt="Urlaubsimpression von Amrum"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </ContentContainer>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-secondary/5">
        <ContentContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Entdecken Sie Ihre Urlaubsmöglichkeiten</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wählen Sie aus unseren verschiedenen Kategorien und finden Sie alle Informationen, 
              die Sie für Ihren perfekten Aufenthalt auf Amrum benötigen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vacationCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-primary">{category.icon}</div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full">
                      <Link href={category.href}>
                        Mehr erfahren
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* Recommendation Section */}
      <section className="py-20 bg-background">
        <ContentContainer>
          <div className="bg-primary/5 rounded-lg p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Unsere Empfehlung für Ihren Urlaub</h2>
                <p className="mb-6">
                  Für einen optimalen Aufenthalt auf Amrum empfehlen wir, mindestens eine Woche einzuplanen. 
                  So haben Sie genügend Zeit, alle Highlights der Insel zu erleben und dennoch Zeit zum Entspannen.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-primary mt-1" /> 
                    <span>Buchen Sie Ihre Unterkunft frühzeitig, besonders in der Hauptsaison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-primary mt-1" /> 
                    <span>Bringen Sie Ihre Fahrräder mit oder leihen Sie vor Ort welche aus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-primary mt-1" /> 
                    <span>Informieren Sie sich über Gezeitenkalender für Wattwanderungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={16} className="text-primary mt-1" /> 
                    <span>Vergessen Sie nicht Sonnenschutz und wetterfeste Kleidung</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/kontakt">Persönliche Beratung erhalten</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden h-40 relative">
                    <Image src="/urlaub/tip-1.jpg" alt="Amrum Tipp 1" fill className="object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden h-32 relative">
                    <Image src="/urlaub/tip-2.jpg" alt="Amrum Tipp 2" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden h-32 relative">
                    <Image src="/urlaub/tip-3.jpg" alt="Amrum Tipp 3" fill className="object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden h-40 relative">
                    <Image src="/urlaub/tip-4.jpg" alt="Amrum Tipp 4" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
} 