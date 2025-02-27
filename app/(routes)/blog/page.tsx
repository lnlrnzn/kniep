import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlogPosts } from "@/app/lib/data";
import { BlogPostCard } from "@/app/components/blog/blog-post-card";
import { ContentContainer } from "../../components/ui/content-container";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog | Kniep Haus auf Amrum",
  description: "Aktuelle Nachrichten, Neuigkeiten und Tipps zu Amrum und dem Kniep Haus.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts(9);
  const hasPosts = posts.length > 0;

  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Blog</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Unser Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Aktuelle Nachrichten, Neuigkeiten und Tipps zu Amrum und dem Kniep Haus. 
          Erfahren Sie mehr über unsere Insel und alles, was sie zu bieten hat.
        </p>
      </div>

      {!hasPosts ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-4">Keine Blog-Beiträge verfügbar</h2>
          <p className="text-muted-foreground mb-8">
            Wir arbeiten derzeit an neuen Artikeln. Schauen Sie bald wieder vorbei!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                publishDate={post.publishDate}
                imageUrl={post.coverImage}
                tags={post.tags}
                featured={index === 0}
              />
            ))}
          </div>

          {posts.length > 0 && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/blog/alle">
                  Alle Artikel anzeigen
                </Link>
              </Button>
            </div>
          )}
        </>
      )}
    </ContentContainer>
  );
} 