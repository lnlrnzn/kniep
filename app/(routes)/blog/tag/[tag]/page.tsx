import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlogPostsByTag } from "@/app/lib/data";
import { BlogPostCard } from "@/app/components/blog/blog-post-card";
import { ContentContainer } from "@/app/components/ui/content-container";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  
  return {
    title: `${tag} | Blog | Kniep Haus auf Amrum`,
    description: `Alle Artikel zum Thema ${tag} in unserem Blog über Amrum und das Kniep Haus.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getBlogPostsByTag(tag);

  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/blog" className="hover:text-foreground transition-colors">
          Blog
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Tag: {tag}</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Artikel mit Tag: {tag}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Alle Blog-Artikel, die mit dem Tag &quot;{tag}&quot; versehen sind.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-4">Keine Artikel gefunden</h2>
          <p className="text-muted-foreground mb-8">
            Es gibt derzeit keine Artikel mit dem Tag &quot;{tag}&quot;.
          </p>
          <Button asChild variant="outline">
            <Link href="/blog">
              Zurück zum Blog
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                publishDate={post.publishDate}
                imageUrl={post.coverImage}
                tags={post.tags}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/blog">
                Zurück zum Blog
              </Link>
            </Button>
          </div>
        </>
      )}
    </ContentContainer>
  );
} 