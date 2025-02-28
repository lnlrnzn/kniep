import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/app/lib/data";
import { ContentContainer } from "../../../components/ui/content-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Metadata } from "next";

// For dynamic metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Artikel nicht gefunden',
      description: 'Der gesuchte Artikel konnte nicht gefunden werden.'
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getBlogPosts(100);
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.publishDate);
  
  // Function to render Markdown as HTML (basic version)
  // In a real app, use a Markdown library like react-markdown
  const renderContent = () => {
    const content = post.content || '';
    const paragraphs = content.split('\n\n');
    
    return (
      <>
        {paragraphs.map((paragraph, i) => {
          if (paragraph.startsWith('# ')) {
            return <h2 key={i} className="text-2xl font-bold my-6">{paragraph.replace('# ', '')}</h2>;
          } else if (paragraph.startsWith('## ')) {
            return <h3 key={i} className="text-xl font-bold my-5">{paragraph.replace('## ', '')}</h3>;
          } else if (paragraph.startsWith('### ')) {
            return <h4 key={i} className="text-lg font-bold my-4">{paragraph.replace('### ', '')}</h4>;
          } else if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').map(item => item.replace('- ', ''));
            return (
              <ul key={i} className="list-disc list-inside my-4 space-y-2">
                {items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          } else {
            return <p key={i} className="my-4">{paragraph}</p>;
          }
        })}
      </>
    );
  };
  
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
        <span className="text-foreground">{post.title}</span>
      </div>

      <article className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={publishDate.toISOString()}>
                {format(publishDate, "dd. MMMM yyyy", { locale: de })}
              </time>
            </div>
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image 
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {renderContent()}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Tags:</span>
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Link href={`/blog/tag/${tag}`} className="hover:text-primary">
                    {tag}
                  </Link>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Übersicht
            </Link>
          </Button>
        </div>
      </article>
    </ContentContainer>
  );
} 