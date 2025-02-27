import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { getRestaurantById, getRestaurants } from "@/app/lib/data";
import { ContentContainer } from "@/app/components/ui/content-container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Metadata } from "next";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: RestaurantDetailPageProps): Promise<Metadata> {
  const restaurant = await getRestaurantById(params.id);
  
  if (!restaurant) {
    return {
      title: 'Restaurant nicht gefunden',
      description: 'Das gesuchte Restaurant konnte nicht gefunden werden.'
    };
  }
  
  return {
    title: `${restaurant.name} | Restaurants | Kniep Haus auf Amrum`,
    description: restaurant.description || `Informationen über ${restaurant.name} auf Amrum.`,
  };
}

// Generate static paths
export async function generateStaticParams() {
  const restaurants = await getRestaurants();
  
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const restaurant = await getRestaurantById(params.id);
  
  if (!restaurant) {
    notFound();
  }

  // Helper function to format opening hours
  const formatOpeningHours = (openingHours: string) => {
    if (!openingHours) return "Öffnungszeiten nicht verfügbar";
    
    return openingHours.split('\n').map((line, index) => (
      <div key={index} className="py-1">{line}</div>
    ));
  };
  
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/restaurants" className="hover:text-foreground transition-colors">
          Restaurants
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{restaurant.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image 
            src={restaurant.image}
            alt={restaurant.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            {restaurant.rating && (
              <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{restaurant.rating}</span>
              </div>
            )}
          </div>
          
          <div className="mt-2 flex gap-2">
            <Badge>{restaurant.type}</Badge>
            {restaurant.cuisine && <Badge variant="outline">{restaurant.cuisine}</Badge>}
            {restaurant.priceRange && (
              <Badge variant="secondary">{restaurant.priceRange}</Badge>
            )}
          </div>
          
          {restaurant.description && (
            <p className="mt-4 text-muted-foreground">{restaurant.description}</p>
          )}
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            {restaurant.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className="text-muted-foreground">{restaurant.location}</p>
                </div>
              </div>
            )}
            
            {restaurant.openingHours && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Öffnungszeiten</h3>
                  <div className="text-muted-foreground">
                    {formatOpeningHours(restaurant.openingHours)}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {(restaurant.features && restaurant.features.length > 0) && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="font-medium mb-3">Merkmale</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((feature, index) => (
                    <Badge key={index} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {(restaurant.specialties && restaurant.specialties.length > 0) && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="font-medium mb-3">Spezialitäten</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ContentContainer>
  );
} 