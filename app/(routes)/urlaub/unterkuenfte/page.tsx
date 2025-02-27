import Link from "next/link";
import { ChevronRight, Send, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentContainer } from "../../../components/ui/content-container";
import { getAccommodations } from "@/app/lib/data";
import AccommodationListWithFilters from "@/app/components/accommodations/AccommodationListWithFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Unterkünfte auf Amrum | Kniep Haus auf Amrum",
  description: "Finden Sie die perfekte Unterkunft für Ihren Aufenthalt auf Amrum - Hotels, Ferienhäuser, Ferienwohnungen und Pensionen.",
};

export default async function UnterkuenftePage() {
  const accommodations = await getAccommodations();
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

      <Tabs defaultValue="alle" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="alle">Alle Unterkünfte</TabsTrigger>
            <TabsTrigger value="hotel">Hotels</TabsTrigger>
            <TabsTrigger value="ferienhaus">Ferienhäuser</TabsTrigger>
            <TabsTrigger value="ferienwohnung">Ferienwohnungen</TabsTrigger>
            <TabsTrigger value="pension">Pensionen</TabsTrigger>
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