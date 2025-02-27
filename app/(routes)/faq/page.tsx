"use client";

import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { ContentContainer } from "../../components/ui/content-container";

// FAQ-Daten
const faqData = [
  {
    category: "Anreise & Transport",
    questions: [
      {
        id: "faq-1",
        question: "Wie komme ich nach Amrum?",
        answer: "Die Anreise nach Amrum erfolgt mit der Fähre von Dagebüll oder Schlüttsiel aus. In der Hochsaison gibt es auch Fährverbindungen von anderen nordfriesischen Inseln wie Sylt oder Föhr. Alternativ können Sie mit dem Flugzeug nach Wyk auf Föhr fliegen und von dort die Fähre nach Amrum nehmen."
      },
      {
        id: "faq-2",
        question: "Brauche ich ein Auto auf Amrum?",
        answer: "Ein Auto ist auf Amrum nicht zwingend notwendig. Die Insel ist klein genug, um sie mit dem Fahrrad zu erkunden (ca. 20 km Umfang). Zudem verkehrt ein regelmäßiger Inselbus zwischen den Ortschaften. Mit der Kurkarte können Sie den Bus kostenlos nutzen. Fahrräder können Sie vor Ort mieten oder mit der Fähre mitbringen."
      },
      {
        id: "faq-3",
        question: "Wie oft fahren die Fähren nach Amrum?",
        answer: "Die Fährfrequenz variiert je nach Saison. In der Hauptsaison (April bis Oktober) fahren die Fähren mehrmals täglich, in der Nebensaison gibt es weniger Verbindungen. Es empfiehlt sich, die aktuellen Fährzeiten auf der Website der Wyker Dampfschiffs-Reederei (W.D.R.) zu prüfen und bei Reisen in der Hochsaison frühzeitig zu buchen."
      }
    ]
  },
  {
    category: "Unterkunft & Aufenthalt",
    questions: [
      {
        id: "faq-4",
        question: "Wann ist die beste Reisezeit für Amrum?",
        answer: "Die Hauptsaison auf Amrum liegt zwischen Mai und September, mit den wärmsten Temperaturen im Juli und August. Für Ruhesuchende sind die Nebensaison-Monate April, Mai, September und Oktober ideal - dann ist die Insel weniger besucht, aber das Wetter oft noch angenehm. Die Wintermonate bieten eine besondere Atmosphäre mit stürmischer See und gemütlichen Unterkünften, allerdings sind dann einige Einrichtungen geschlossen."
      },
      {
        id: "faq-5",
        question: "Was kostet die Kurtaxe auf Amrum?",
        answer: "Die Kurtaxe (auch Gästebeitrag genannt) variiert je nach Saison. In der Hauptsaison beträgt sie für Erwachsene etwa 3,50 € pro Tag, in der Nebensaison etwas weniger. Kinder und Jugendliche zahlen reduzierte Beiträge oder sind befreit. Mit der Kurkarte erhalten Sie kostenlose Nutzung des Inselbusses, vergünstigte Eintritte und können an verschiedenen Veranstaltungen teilnehmen."
      },
      {
        id: "faq-6",
        question: "Wie früh sollte ich meine Unterkunft buchen?",
        answer: "Für die Hauptsaison (Juli/August) empfehlen wir, mindestens 6 Monate im Voraus zu buchen, da Amrum ein beliebtes Urlaubsziel ist. Für Aufenthalte in der Nebensaison reichen oft 2-3 Monate Vorlaufzeit. Bei Reisen zu Feiertagen oder in den Schulferien ist ebenfalls eine frühzeitige Buchung ratsam."
      }
    ]
  },
  {
    category: "Aktivitäten & Erlebnisse",
    questions: [
      {
        id: "faq-7",
        question: "Welche Aktivitäten kann man auf Amrum unternehmen?",
        answer: "Amrum bietet vielfältige Aktivitäten wie Strandspaziergänge, Radtouren, Wattwanderungen, Vogelbeobachtungen im Naturschutzgebiet, Leuchtturmbesteigung, Wassersport, Wellness, Shopping in den kleinen Läden und den Besuch von Museen. Kulturell werden Konzerte, Führungen und Vorträge angeboten. Im Sommer gibt es zudem Veranstaltungen wie Strandfeste und Sportevents."
      },
      {
        id: "faq-8",
        question: "Ist Amrum für Kinder geeignet?",
        answer: "Amrum ist ein ideales Reiseziel für Familien mit Kindern. Die flachen, breiten Sandstrände bieten sichere Spielmöglichkeiten, und es gibt betreute Spielbereiche. Viele Unterkünfte sind familienfreundlich ausgestattet. Auf der Insel werden spezielle Kinderaktivitäten wie Bernsteinsuche, Wattwanderungen, Bastelkurse und Ausflüge angeboten. Auch bei schlechtem Wetter gibt es Indoor-Angebote wie das Schwimmbad in Wittdün."
      },
      {
        id: "faq-9",
        question: "Kann man auf Amrum schwimmen und ist es sicher?",
        answer: "Baden ist an den ausgewiesenen Badestränden von Amrum möglich und wird durch die DLRG überwacht (an mit Flaggen gekennzeichneten Bereichen während der Hauptsaison). Dennoch sollten Sie Vorsicht walten lassen, besonders bei ablandigem Wind und auflaufender Flut. Beachten Sie immer die Badehinweise, Flaggensignale und Informationen zu Strömungen. Die Wassertemperatur der Nordsee steigt im Sommer auf bis zu 18-20°C."
      }
    ]
  },
  {
    category: "Natur & Umwelt",
    questions: [
      {
        id: "faq-10",
        question: "Was macht Amrums Natur so besonders?",
        answer: "Amrum besticht durch seine vielfältige Naturlandschaft: der kilometerlange, breite Kniepsand im Westen, Dünenlandschaften, Heidegebiete, Wälder und Wattflächen im Osten. Große Teile der Insel stehen unter Naturschutz und bieten Lebensraum für zahlreiche, teils seltene Tier- und Pflanzenarten. Besonders bekannt ist Amrum für seine Vogelwelt - die Insel liegt an wichtigen Zugvogelrouten und beherbergt bedeutende Brutkolonien."
      },
      {
        id: "faq-11",
        question: "Wie ist das Wetter auf Amrum?",
        answer: "Amrum hat ein typisches Nordsee-Klima mit milden Temperaturen. Im Sommer liegen die Durchschnittstemperaturen bei 18-22°C, im Winter bei 1-5°C. Die Insel ist für ihre frische Brise bekannt - es ist selten windstill. Die Sonnenscheindauer ist mit bis zu 1.700 Stunden im Jahr relativ hoch für Norddeutschland. Regnen kann es zu jeder Jahreszeit, aber oft ziehen Schauer schnell vorüber."
      },
      {
        id: "faq-12",
        question: "Was sollte ich für meinen Aufenthalt auf Amrum einpacken?",
        answer: "Auch im Sommer empfiehlt sich wetterfeste Kleidung: eine winddichte Jacke, Regenschutz, leichte Pullover oder Fleece für kühlere Abende. Strandutensilien wie Handtücher, Sonnenschutz und Badesachen sind im Sommer wichtig. Gutes Schuhwerk für Wanderungen oder Radtouren ist ebenfalls ratsam. Eine kleine Grundausstattung an Medikamenten, Fernglas für Naturbeobachtungen und Kamera sollten Sie ebenfalls einpacken."
      }
    ]
  },
  {
    category: "Verpflegung & Gastronomie",
    questions: [
      {
        id: "faq-13",
        question: "Welche kulinarischen Spezialitäten gibt es auf Amrum?",
        answer: "Die Küche auf Amrum ist von frischen Fisch- und Meeresfrüchtegerichten geprägt. Lokale Spezialitäten sind Nordseekrabben ('Porren'), verschiedene Fischsorten wie Scholle und Kabeljau, friesische Gerichte wie 'Labskaus' und 'Friesentorte' sowie deftige Eintöpfe. In den Restaurants und Cafés werden sowohl traditionelle als auch moderne interpretierte Gerichte angeboten, oft mit saisonalen und regionalen Zutaten."
      },
      {
        id: "faq-14",
        question: "Gibt es Supermärkte auf Amrum?",
        answer: "In allen drei Hauptorten Wittdün, Nebel und Norddorf gibt es Lebensmittelgeschäfte und kleine Supermärkte, die gut sortiert sind. In Wittdün finden Sie den größten Supermarkt der Insel. Zusätzlich gibt es Bäckereien, Metzgereien und in der Saison Wochenmärkte mit regionalen Produkten. Die Preise sind aufgrund der Insellage etwas höher als auf dem Festland."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('');

  // Filtern von Fragen basierend auf der Suche
  const filteredFAQs = searchQuery
    ? faqData.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Die Suche wurde bereits durch den State-Update durchgeführt
  };

  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">FAQ</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Häufig gestellte Fragen</h1>
        <p className="text-lg text-muted-foreground">
          Hier finden Sie Antworten auf die am häufigsten gestellten Fragen zu Ihrem Urlaub auf Amrum.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Suchen Sie nach Fragen oder Stichworten..."
            className="pl-10 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            Suchen
          </Button>
        </form>

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Keine Ergebnisse für "{searchQuery}" gefunden.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Suche zurücksetzen
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                <Accordion
                  type="single" 
                  collapsible
                  value={expandedCategory}
                  onValueChange={setExpandedCategory}
                  className="space-y-2"
                >
                  {category.questions.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 bg-muted/10">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Noch Fragen?</h2>
          <p className="mb-4 text-muted-foreground">
            Falls Sie nicht die Antwort gefunden haben, die Sie suchen, kontaktieren Sie uns gerne direkt.
            Wir helfen Ihnen bei allen Fragen zu Ihrem Amrum-Aufenthalt.
          </p>
          <Button asChild>
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </div>
    </ContentContainer>
  );
} 