"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Ship, Car, Train, Plane, Info, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContentContainer } from "../../../components/ui/content-container";
import { FerrySchedule } from "@/app/components/FerrySchedule";
import ferryData from "@/app/data/ferry-schedule.json";

export default function AnreisePage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/urlaub" className="hover:text-foreground transition-colors">
          Urlaub
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Anreise</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Anreise nach Amrum</h1>
        <p className="text-lg text-muted-foreground">
          Informationen zu Ihrer An- und Abreise auf die Nordseeinsel Amrum. 
          Hier finden Sie alle wichtigen Details zu Fährverbindungen, Anreise mit der Bahn, 
          dem Auto oder dem Flugzeug sowie praktische Reisetipps.
        </p>
      </motion.div>

      {/* Hauptinformationsbereich */}
      <div className="bg-muted/20 rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <div className="flex-none w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Ship className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Die Insel ist nur per Fähre erreichbar</h2>
            <p className="text-muted-foreground">
              Als Nordseeinsel ist Amrum nur über den Wasserweg erreichbar. Regelmäßige Fährverbindungen 
              bestehen vom Festlandhafen Dagebüll sowie von den Nachbarinseln Föhr und Sylt. 
              Die Fähren werden von der Wyker Dampfschiffs-Reederei (W.D.R.) betrieben.
            </p>
          </div>
        </div>
      </div>

      {/* Anreise-Tabs */}
      <Tabs defaultValue="faehre" className="mb-16">
        <div className="mb-8 overflow-hidden">
          <TabsList className="flex flex-wrap justify-center gap-2 p-1">
            <TabsTrigger value="faehre" className="flex items-center gap-2 min-w-[140px]">
              <Ship className="h-4 w-4" /> 
              <span>Mit der Fähre</span>
            </TabsTrigger>
            <TabsTrigger value="bahn" className="flex items-center gap-2 min-w-[140px]">
              <Train className="h-4 w-4" /> 
              <span>Mit der Bahn</span>
            </TabsTrigger>
            <TabsTrigger value="auto" className="flex items-center gap-2 min-w-[140px]">
              <Car className="h-4 w-4" /> 
              <span>Mit dem Auto</span>
            </TabsTrigger>
            <TabsTrigger value="flugzeug" className="flex items-center gap-2 min-w-[140px]">
              <Plane className="h-4 w-4" /> 
              <span>Mit dem Flugzeug</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Fähre Tab */}
        <TabsContent value="faehre" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Fährverbindung vom Festland</h3>
              <p className="mb-4">
                Die Hauptverbindung nach Amrum ist die Fähre ab Dagebüll auf dem Festland. Von dort erreichen 
                Sie den Hafen in Wittdün auf Amrum nach ca. 90 Minuten Fahrzeit.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Der aktuelle Fahrplan für 2025 und alle Fährverbindungen finden Sie in der interaktiven Übersicht weiter unten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="https://www.faehre.de" target="_blank" rel="noopener noreferrer">
                    Fahrplan & Buchung
                  </a>
                </Button>
                <Button variant="outline">
                  Preisübersicht
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              {/* Platzhalter für Fährenbild - in der Produktion durch echtes Bild ersetzen */}
              <div className="absolute inset-0 bg-muted"></div>
            </div>
          </div>

          {/* Aktuelle Fährzeiten 2025 */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6">Aktueller Fährplan 2025</h3>
            <FerrySchedule ferryData={ferryData} />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-none mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Wichtige Hinweise zur Fährüberfahrt</h3>
                <ul className="space-y-2 text-yellow-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      In der Hauptsaison (Juli/August) und an Feiertagen empfehlen wir eine 
                      frühzeitige Buchung, insbesondere wenn Sie mit dem Auto reisen.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Bitte finden Sie sich mindestens 30 Minuten vor Abfahrt (mit Fahrzeug 60 Minuten) 
                      am Fährterminal ein.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>
                      Bei extremen Wetterbedingungen kann es zu Fahrplanänderungen oder Ausfällen kommen. 
                      Informieren Sie sich vor Reiseantritt über die aktuelle Lage.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Bahn Tab */}
        <TabsContent value="bahn" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Mit der Bahn nach Amrum</h3>
              <p className="mb-4">
                Die Deutsche Bahn bietet durchgehende Verbindungen bis zum Fährhafen Dagebüll an. 
                Von dort nehmen Sie die Fähre nach Amrum.
              </p>
              <h4 className="font-medium mb-2">Fahrtroute:</h4>
              <ol className="list-decimal list-inside mb-4 space-y-2 text-sm text-muted-foreground">
                <li>Fahrt mit dem IC/ICE bis Hamburg oder Husum</li>
                <li>Weiterfahrt mit der Regionalbahn (NOB/DB) nach Niebüll</li>
                <li>Umstieg in Niebüll auf die Nordsee-Bahn (private Bahngesellschaft)</li>
                <li>Ankunft am Bahnhof Dagebüll Mole direkt am Fähranleger</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                Die Fahrzeit von Hamburg nach Dagebüll beträgt ca. 3,5 Stunden. Die Züge sind auf die 
                Fährabfahrten abgestimmt.
              </p>
              <Button asChild>
                <a href="https://www.bahn.de" target="_blank" rel="noopener noreferrer">
                  Bahnverbindungen prüfen
                </a>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              {/* Platzhalter für Bahnbild - in der Produktion durch echtes Bild ersetzen */}
              <div className="absolute inset-0 bg-muted"></div>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Praktische Informationen zur Bahnanreise
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Die Züge der Nordsee-Bahn sind zeitlich auf die Fährabfahrten abgestimmt.</li>
              <li>• Am Bahnhof Dagebüll Mole befinden Sie sich direkt am Fähranleger.</li>
              <li>• Gepäcktransport ist in allen Zügen möglich. Die Mitnahme von Fahrrädern ist möglich, sollte aber reserviert werden.</li>
              <li>• Mit der Bahn-App können Sie Ihre Verbindung in Echtzeit verfolgen und werden über eventuelle Verspätungen informiert.</li>
            </ul>
          </div>
        </TabsContent>

        {/* Auto Tab */}
        <TabsContent value="auto" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Mit dem Auto nach Amrum</h3>
              <p className="mb-4">
                Sie können mit Ihrem Auto bis zum Fährhafen Dagebüll fahren und es von dort auf die 
                Fähre mitnehmen. Beachten Sie jedoch, dass der Autoverkehr auf Amrum begrenzt ist und 
                Parkplätze in der Hochsaison knapp sein können.
              </p>
              <h4 className="font-medium mb-2">Anfahrt zum Fährhafen Dagebüll:</h4>
              <ol className="list-decimal list-inside mb-4 space-y-2 text-sm text-muted-foreground">
                <li>Über die A7 bis Abfahrt Schleswig/Jagel</li>
                <li>Weiter über die B201 und B5 Richtung Husum/Niebüll</li>
                <li>Von Niebüll der Beschilderung nach Dagebüll folgen</li>
                <li>Den Hinweisschildern zum Fähranleger folgen</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                Die Fahrzeit von Hamburg nach Dagebüll beträgt ca. 2,5 Stunden (ohne Verkehr).
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <a href="https://www.faehre.de/autotarife" target="_blank" rel="noopener noreferrer">
                    Auto-Tarife für die Fähre
                  </a>
                </Button>
                <Button variant="outline">
                  Parkplatz-Informationen
                </Button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Auto auf Amrum?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Überlegen Sie, ob Sie Ihr Auto wirklich auf die Insel mitnehmen müssen. Amrum ist 
                  klein (ca. 20 km²) und verfügt über ein gutes Netz an Fahrradwegen und einen regelmäßig 
                  verkehrenden Inselbus. Zudem sind die Fährgebühren für Fahrzeuge deutlich höher als für Personen.
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium mb-2">Alternative: Parken auf dem Festland</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Am Fährhafen Dagebüll stehen kostenpflichtige Parkplätze zur Verfügung, auf denen Sie Ihr 
                  Auto während Ihres Inselaufenthalts abstellen können.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Parkgebühren ab ca. 7 € pro Tag</li>
                  <li>Bewachte und unbewachte Parkplätze verfügbar</li>
                  <li>Vorherige Reservierung in der Hauptsaison empfohlen</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Hinweise zum Autoverkehr auf Amrum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Auf Amrum gilt eine reduzierte Höchstgeschwindigkeit:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
                    <li>Innerorts: max. 30 km/h</li>
                    <li>Außerorts: max. 50 km/h</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    Einige Bereiche der Insel sind autofrei oder nur für Anwohner und Anlieferverkehr zugänglich.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Parkmöglichkeiten:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>In Wittdün, Nebel und Norddorf gibt es öffentliche Parkplätze</li>
                    <li>Viele Unterkünfte bieten eigene Stellplätze an</li>
                    <li>Das Parken abseits der ausgewiesenen Flächen ist nicht gestattet</li>
                    <li>In der Hauptsaison können Parkplätze knapp sein</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flugzeug Tab */}
        <TabsContent value="flugzeug" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Mit dem Flugzeug nach Amrum</h3>
              <p className="mb-4">
                Amrum verfügt über keinen eigenen Flughafen, aber das benachbarte Föhr ist per Flugzeug erreichbar. 
                Von dort können Sie mit der Fähre nach Amrum übersetzen.
              </p>
              <h4 className="font-medium mb-2">Anreise über Föhr:</h4>
              <ol className="list-decimal list-inside mb-4 space-y-2 text-sm text-muted-foreground">
                <li>Flug nach Flughafen Wyk auf Föhr (mit FLN Frisia-Luftverkehr)</li>
                <li>Transfer zum Fähranleger in Wyk (ca. 5 Minuten)</li>
                <li>Überfahrt mit der Fähre nach Wittdün auf Amrum (ca. 25 Minuten)</li>
              </ol>
              <p className="text-sm text-muted-foreground mb-4">
                Flüge nach Föhr werden von mehreren deutschen Städten aus angeboten, 
                darunter Hamburg, Düsseldorf und Frankfurt.
              </p>
              <Button asChild>
                <a href="https://www.inselflieger.de" target="_blank" rel="noopener noreferrer">
                  Flugverbindungen prüfen
                </a>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
              {/* Platzhalter für Flugbild - in der Produktion durch echtes Bild ersetzen */}
              <div className="absolute inset-0 bg-muted"></div>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Alternative: Flughafen Sylt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Eine weitere Möglichkeit ist die Anreise über den Flughafen Sylt, der von 
                mehreren deutschen Städten aus angeflogen wird.
              </p>
              <ol className="list-decimal list-inside mb-4 space-y-1 text-sm text-muted-foreground">
                <li>Flug nach Sylt</li>
                <li>Transfer zum Hafen Hörnum (ca. 20 Minuten mit dem Taxi oder Bus)</li>
                <li>Überfahrt mit der Fähre nach Wittdün (ca. 90 Minuten, nur in der Hauptsaison)</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                Bitte beachten Sie, dass die Fährverbindung Sylt-Amrum nur saisonal (Mai bis September) 
                und nicht täglich verkehrt.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Häufig gestellte Fragen */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Häufig gestellte Fragen zur Anreise</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Kann ich mein Auto auf die Insel mitnehmen?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Ja, Sie können Ihr Auto mit der Fähre nach Amrum mitnehmen. Beachten Sie jedoch, dass 
                dafür zusätzliche Kosten anfallen und die Anzahl der Fahrzeuge pro Fähre begrenzt ist.
              </p>
              <p>
                Die Insel ist jedoch klein und gut mit dem Fahrrad oder dem Inselbus zu erkunden. 
                Viele Urlauber stellen ihr Auto daher auf dem Festland ab und reisen ohne Fahrzeug auf die Insel.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Wie weit im Voraus sollte ich die Fähre buchen?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                In der Hauptsaison (Juli/August) und zu Feiertagen empfehlen wir, die Fähre mindestens 
                1-2 Monate im Voraus zu buchen, besonders wenn Sie mit einem Fahrzeug reisen möchten.
              </p>
              <p>
                In der Nebensaison ist eine Buchung etwa 1-2 Wochen im Voraus in der Regel ausreichend. 
                Für Fußgänger ist oft auch eine kurzfristige Buchung oder der Kauf eines Tickets am Schalter möglich.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Gibt es Rabatte für die Fährüberfahrt?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Die W.D.R. bietet verschiedene Rabattmöglichkeiten an:
              </p>
              <ul className="list-disc list-inside mb-2 space-y-1">
                <li>Kinder bis 3 Jahre: kostenlos</li>
                <li>Kinder von 4-11 Jahren: ermäßigter Preis</li>
                <li>Personengruppen ab 10 Personen: Gruppenrabatt</li>
                <li>Insulaner und Berufspendler: spezielle Tarife</li>
              </ul>
              <p>
                Es gibt auch Mehrfahrtenkarten und Zeitkarten für regelmäßige Reisende.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Wie komme ich vom Fähranleger zu meiner Unterkunft?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Die meisten Unterkünfte in Wittdün sind fußläufig vom Fähranleger aus zu erreichen (5-15 Minuten). 
                Für weiter entfernte Unterkünfte stehen folgende Möglichkeiten zur Verfügung:
              </p>
              <ul className="list-disc list-inside mb-2 space-y-1">
                <li>Inselbus: Verkehrt regelmäßig zwischen allen Ortschaften</li>
                <li>Taxi: Taxistände am Fähranleger</li>
                <li>Gepäckservice: Viele Vermieter bieten einen Gepäcktransport an</li>
                <li>Fahrradverleih: Direkt am Hafen können Fahrräder gemietet werden</li>
              </ul>
              <p>
                Wenn Sie mit dem eigenen Auto anreisen, können Sie natürlich damit zu Ihrer Unterkunft fahren.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Kann ich mein Haustier mitbringen?</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Ja, Haustiere können auf die Fähre mitgenommen werden. Hunde müssen an Bord angeleint sein 
                und in bestimmten Bereichen ist ein Maulkorb vorgeschrieben.
              </p>
              <p>
                Für Hunde wird eine geringe Gebühr erhoben. Kleinere Tiere in Transportboxen können meist 
                kostenlos mitgenommen werden. Bitte erkundigen Sie sich vorab auch bei Ihrer Unterkunft, 
                ob Haustiere willkommen sind.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Call-to-Action */}
      <div className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Reiseplanung leicht gemacht</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Haben Sie noch Fragen zu Ihrer Anreise nach Amrum? Unser Team unterstützt Sie gerne 
          bei der Planung Ihrer Reise und kann Ihnen mit weiteren Informationen zur Seite stehen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">Weitere FAQs</Link>
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
} 