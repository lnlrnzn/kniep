import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlogPosts } from "@/app/lib/data";
import { BlogPostCard } from "@/app/components/blog/blog-post-card";
import { ContentContainer } from "../../../components/ui/content-container";
import { Pagination } from "@/app/components/blog/pagination";

export const metadata = {
  title: "Alle Blog Artikel | Kniep Haus auf Amrum",
  description: "Durchsuchen Sie alle Artikel unseres Blogs zu Amrum, dem Kniep Haus und Urlaubstipps.",
};

// Number of posts per page
const POSTS_PER_PAGE = 12;

export default async function AllBlogPostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Get the current page from the URL query parameters
  const currentPage = Number(searchParams.page) || 1;
  
  // Get the total count and fetch posts with limit and skip
  const allPosts = await getBlogPosts(100); // Get a large number to calculate total
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Calculate pagination values
  const skip = (currentPage - 1) * POSTS_PER_PAGE;
  const postsToShow = allPosts.slice(skip, skip + POSTS_PER_PAGE);

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
        <span className="text-foreground">Alle Artikel</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Alle Blog Artikel</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Durchstöbern Sie unsere vollständige Sammlung von Artikeln zu Amrum, 
          Freizeitaktivitäten, Sehenswürdigkeiten und Tipps für Ihren Urlaub.
        </p>
      </div>

      {postsToShow.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-4">Keine Blog-Beiträge verfügbar</h2>
          <p className="text-muted-foreground mb-8">
            Wir arbeiten derzeit an neuen Artikeln. Schauen Sie bald wieder vorbei!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsToShow.map((post) => (
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

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog/alle"
            />
          )}
        </>
      )}
    </ContentContainer>
  );
} 