import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string | Date;
  imageUrl: string;
  tags?: string[];
  featured?: boolean;
}

export function BlogPostCard({
  title,
  slug,
  excerpt,
  publishDate,
  imageUrl,
  tags = [],
  featured = false,
}: BlogPostCardProps) {
  const date = new Date(publishDate);
  const formattedDate = format(date, "dd. MMMM yyyy", { locale: de });
  
  return (
    <article 
      className={`
        group flex flex-col h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all duration-300
        ${featured ? 'md:col-span-2 md:flex-row' : ''}
      `}
    >
      <div 
        className={`
          relative aspect-video overflow-hidden
          ${featured ? 'md:w-1/2' : 'w-full'}
        `}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div 
        className={`
          flex flex-col p-6
          ${featured ? 'md:w-1/2' : 'w-full'}
        `}
      >
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>
        
        <div className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <time dateTime={date.toISOString()}>{formattedDate}</time>
        </div>
        
        <p className="mb-6 text-sm text-muted-foreground line-clamp-3 flex-grow">
          {excerpt}
        </p>
        
        <Button asChild size="sm" variant="outline" className="w-fit">
          <Link href={`/blog/${slug}`}>
            Weiterlesen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
} 