import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getAccommodationById, getAccommodations } from "@/app/lib/data";
import { ContentContainer } from "@/app/components/ui/content-container";
import { Metadata } from "next";
import AccommodationDetail from "@/app/components/accommodations/AccommodationDetail";

interface AccommodationDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: AccommodationDetailPageProps): Promise<Metadata> {
  const id = params.id;
  const accommodation = await getAccommodationById(id);
  
  if (!accommodation) {
    return {
      title: 'Unterkunft nicht gefunden',
      description: 'Die gesuchte Unterkunft konnte nicht gefunden werden.'
    };
  }
  
  return {
    title: `${accommodation.name} | Unterkünfte | Kniep Haus auf Amrum`,
    description: accommodation.description || `Informationen über ${accommodation.name} auf Amrum.`,
  };
}

// Generate static paths
export async function generateStaticParams() {
  const accommodations = await getAccommodations();
  
  return accommodations.map((accommodation) => ({
    id: accommodation.id,
  }));
}

export default async function AccommodationDetailPage({ params }: AccommodationDetailPageProps) {
  const id = params.id;
  const accommodation = await getAccommodationById(id);
  
  if (!accommodation) {
    notFound();
  }

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
        <Link href="/urlaub/unterkuenfte" className="hover:text-foreground transition-colors">
          Unterkünfte
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{accommodation.name}</span>
      </div>

      <AccommodationDetail accommodation={accommodation} />
    </ContentContainer>
  );
} 