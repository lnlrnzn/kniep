"use client";

import Link from "next/link";
import { ChevronRight, Send, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentContainer } from "../../../components/ui/content-container";
import { getAccommodations } from "@/app/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Accommodation } from "@/app/types";

// Lazy load the AccommodationListWithFilters component to reduce initial bundle size
const AccommodationListWithFilters = dynamic(
  () => import("@/app/components/accommodations/AccommodationListWithFilters"),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-lg" />
          ))}
        </div>
      </div>
    ),
    ssr: false, // Disable server-side rendering for this component due to its size
  }
);

// Metadata can't be exported from client components
// We'll set the page title in the component instead
/* export const metadata = {
  title: "Unterkünfte auf Amrum | Kniep Haus auf Amrum",
  description: "Finden Sie die perfekte Unterkunft für Ihren Aufenthalt auf Amrum - Hotels, Ferienhäuser, Ferienwohnungen und Pensionen.",
}; */

export default function UnterkuenftePage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasAccommodations = accommodations.length > 0;

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
        <span className="text-foreground">Unterkünfte</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Unterkünfte auf Amrum</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Von gemütlichen Ferienwohnungen bis zu komfortablen Hotels - 
          finden Sie die perfekte Unterkunft für Ihren Aufenthalt auf der Insel.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="flex justify-center mb-8">
            <div className="bg-muted h-10 w-[600px] rounded-lg"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        </div>
      ) : (
        <Tabs defaultValue="alle" className="mb-12">
          <div className="flex justify-center mb-8 overflow-hidden">
            <TabsList className="flex flex-wrap justify-center gap-2 p-1">
              <TabsTrigger value="alle" className="min-w-[130px]">Alle Unterkünfte</TabsTrigger>
              <TabsTrigger value="hotel" className="min-w-[100px]">Hotels</TabsTrigger>
              <TabsTrigger value="ferienhaus" className="min-w-[130px]">Ferienhäuser</TabsTrigger>
              <TabsTrigger value="ferienwohnung" className="min-w-[140px]">Ferienwohnungen</TabsTrigger>
              <TabsTrigger value="pension" className="min-w-[100px]">Pensionen</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="alle">
            {!hasAccommodations ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">Keine Unterkünfte verfügbar</h2>
                <p className="text-muted-foreground mb-8">
                  Wir aktualisieren gerade unsere Unterkunfts-Datenbank. Bitte schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <AccommodationListWithFilters accommodations={accommodations} />
            )}
          </TabsContent>

          <TabsContent value="hotel">
            {!hasAccommodations ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">Keine Hotels verfügbar</h2>
                <p className="text-muted-foreground mb-8">
                  Wir aktualisieren gerade unsere Unterkunfts-Datenbank. Bitte schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <AccommodationListWithFilters 
                accommodations={accommodations.filter(acc => acc.type === 'hotel')} 
              />
            )}
          </TabsContent>

          <TabsContent value="ferienhaus">
            {!hasAccommodations ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">Keine Ferienhäuser verfügbar</h2>
                <p className="text-muted-foreground mb-8">
                  Wir aktualisieren gerade unsere Unterkunfts-Datenbank. Bitte schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <AccommodationListWithFilters 
                accommodations={accommodations.filter(acc => acc.type === 'ferienhaus')} 
              />
            )}
          </TabsContent>

          <TabsContent value="ferienwohnung">
            {!hasAccommodations ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">Keine Ferienwohnungen verfügbar</h2>
                <p className="text-muted-foreground mb-8">
                  Wir aktualisieren gerade unsere Unterkunfts-Datenbank. Bitte schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <AccommodationListWithFilters 
                accommodations={accommodations.filter(acc => acc.type === 'ferienwohnung')} 
              />
            )}
          </TabsContent>

          <TabsContent value="pension">
            {!hasAccommodations ? (
              <div className="text-center py-20">
                <h2 className="text-xl font-semibold mb-4">Keine Pensionen verfügbar</h2>
                <p className="text-muted-foreground mb-8">
                  Wir aktualisieren gerade unsere Unterkunfts-Datenbank. Bitte schauen Sie später wieder vorbei.
                </p>
              </div>
            ) : (
              <AccommodationListWithFilters 
                accommodations={accommodations.filter(acc => acc.type === 'pension')} 
              />
            )}
          </TabsContent>
        </Tabs>
      )}

      <div className="bg-muted rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Unterkunft finden leicht gemacht</h2>
            <p className="mb-4">
              Auf Amrum finden Sie eine Vielzahl von Unterkunftsmöglichkeiten, die für jeden Geschmack
              und jedes Budget geeignet sind. Von luxuriösen Hotels mit Meerblick bis hin zu gemütlichen
              Ferienhäusern im typisch friesischen Stil.
            </p>
            <p className="mb-6">
              Wir empfehlen Ihnen, Ihre Unterkunft frühzeitig zu buchen, besonders wenn Sie in der 
              Hochsaison (Juli-August) reisen möchten.
            </p>
            <div className="flex gap-4">
              <Button variant="default">
                Anfrage senden <Send className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                Alle Unterkünfte auf der Karte <Map className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">Tipps für Ihre Unterkunftssuche</h3>
              <p className="text-sm text-muted-foreground">
                ✓ Frühzeitig buchen, besonders in der Hauptsaison (4-6 Monate im Voraus)<br />
                ✓ Auf Lage achten (Wittdün ist belebter, Norddorf ruhiger)<br />
                ✓ Kurtaxe einplanen (ca. 3-4 € pro Person/Tag)<br />
                ✓ Nach Sonderangeboten in der Nebensaison suchen<br />
                ✓ Direktbuchungen sind oft günstiger als über Plattformen
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg border shadow-sm">
              <h3 className="font-medium mb-2">Beste Reisezeit für Amrum</h3>
              <p className="text-sm text-muted-foreground">
                Die beste Reisezeit für einen Urlaub auf Amrum ist von Mai bis September.
                In den Sommermonaten Juli und August ist es am wärmsten mit Durchschnittstemperaturen
                um die 20°C. Für einen ruhigeren Urlaub empfehlen sich die Nebensaisonmonate Mai, Juni 
                und September, in denen es weniger Touristen gibt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
} 