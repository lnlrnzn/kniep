"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Waves, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { destinationJsonLd, organizationJsonLd } from "../../lib/jsonld";
import JsonLd from "../../components/JsonLd";
import { ContentContainer } from "../../components/ui/content-container";

export default function HomePage() {
  // Animation Varianten
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <JsonLd data={[destinationJsonLd, organizationJsonLd]} />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0 bg-primary/10"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Willkommen auf Amrum
          </h1>
          <p className="text-xl max-w-2xl text-center mb-6">
            Entdecken Sie die Schönheit der Nordseeinsel
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/urlaub/unterkuenfte">Unterkünfte ansehen</Link>
          </Button>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-background">
        <ContentContainer>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              Amrum Highlights
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Von traumhaften Stränden bis hin zu spannenden Aktivitäten - 
              Amrum bietet alles für einen perfekten Urlaub.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Highlight 1 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 text-primary">
                    <Waves size={32} />
                  </div>
                  <CardTitle>Traumhafte Strände</CardTitle>
                  <CardDescription>
                    Kilometerlange, weiße Sandstrände mit weichem Sand und klarem Wasser.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Entspannen Sie am Kniepsand, einem der breitesten Strände Europas.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/urlaub/straende" className="text-primary flex items-center gap-1 hover:underline">
                    Mehr erfahren <ArrowRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Highlight 2 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 text-primary">
                    <Compass size={32} />
                  </div>
                  <CardTitle>Naturerlebnisse</CardTitle>
                  <CardDescription>
                    Entdecken Sie die einzigartige Dünenlandschaft und das Wattenmeer.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Unternehmen Sie Wattwanderungen oder besuchen Sie das Naturschutzgebiet Amrum Odde.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/ueber-amrum/natur" className="text-primary flex items-center gap-1 hover:underline">
                    Mehr erfahren <ArrowRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Highlight 3 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 text-primary">
                    <Calendar size={32} />
                  </div>
                  <CardTitle>Spannende Events</CardTitle>
                  <CardDescription>
                    Das ganze Jahr über finden auf Amrum vielfältige Veranstaltungen statt.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Von traditionellen Festen bis hin zu Musikveranstaltungen und Sportevents.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/events" className="text-primary flex items-center gap-1 hover:underline">
                    Mehr erfahren <ArrowRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Highlight 4 */}
            <motion.div variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 text-primary">
                    <MapPin size={32} />
                  </div>
                  <CardTitle>Idyllische Orte</CardTitle>
                  <CardDescription>
                    Besuchen Sie die charmanten Dörfer mit ihren typisch friesischen Häusern.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Erkunden Sie Nebel, Norddorf, Süddorf und Wittdün mit ihrem einzigartigen Charme.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/ueber-amrum/orte" className="text-primary flex items-center gap-1 hover:underline">
                    Mehr erfahren <ArrowRight size={16} />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5">
        <ContentContainer>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-lg"
              >
                <Image
                  src="/amrum-leuchtturm.jpg"
                  alt="Leuchtturm auf Amrum"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold mb-4">Planen Sie Ihren Traumurlaub</h2>
              <p className="text-lg mb-6">
                Tauchen Sie ein in die faszinierende Welt Amrums. Wir bieten Ihnen alle Informationen für einen 
                perfekten Aufenthalt auf unserer wunderschönen Insel.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-primary">
                    <ArrowRight size={16} />
                  </div>
                  <span>Große Auswahl an Unterkünften für jeden Geschmack</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-primary">
                    <ArrowRight size={16} />
                  </div>
                  <span>Vielfältige Freizeitaktivitäten für die ganze Familie</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-primary">
                    <ArrowRight size={16} />
                  </div>
                  <span>Kulinarische Entdeckungen in unseren Restaurants</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-primary">
                    <ArrowRight size={16} />
                  </div>
                  <span>Entspannte An- und Abreise mit verschiedenen Verkehrsmitteln</span>
                </li>
              </ul>
              <Button asChild size="lg">
                <Link href="/kontakt">Kontaktieren Sie uns</Link>
              </Button>
            </motion.div>
          </div>
        </ContentContainer>
      </section>
    </>
  );
} 