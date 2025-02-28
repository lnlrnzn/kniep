import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getRestaurants } from "@/app/lib/data";
import { ContentContainer } from "../../components/ui/content-container";
import RestaurantListWithFilters from "@/app/components/restaurants/RestaurantListWithFilters";

export const metadata = {
  title: "Restaurants | Kniep Haus auf Amrum",
  description: "Entdecken Sie die besten Restaurants, Cafés und Imbisse auf Amrum in der Nähe des Kniep Hauses.",
};

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();
  const hasRestaurants = restaurants.length > 0;

  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Restaurants</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Restaurants auf Amrum</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Entdecken Sie die kulinarische Vielfalt auf Amrum. Von traditionellen friesischen 
          Spezialitäten bis hin zu internationaler Küche - hier finden Sie die besten 
          Restaurants, Cafés und Imbisse in der Nähe des Kniep Hauses.
        </p>
      </div>

      {!hasRestaurants ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-4">Keine Restaurants verfügbar</h2>
          <p className="text-muted-foreground mb-8">
            Wir aktualisieren gerade unsere Restaurant-Datenbank. Bitte schauen Sie später wieder vorbei.
          </p>
        </div>
      ) : (
        <RestaurantListWithFilters restaurants={restaurants} />
      )}
    </ContentContainer>
  );
} 