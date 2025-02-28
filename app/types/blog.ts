/**
 * Blog post type definitions for Kniep website
 */

/**
 * Author information for blog posts
 */
export interface Author {
  name: string;
  picture: string;
  bio?: string;
  email?: string;
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

/**
 * Tag information for blog posts
 */
export interface Tag {
  name: string;
  slug: string;
  description?: string;
}

/**
 * Category information for blog posts
 */
export interface Category {
  name: string;
  slug: string;
  description?: string;
}

/**
 * Blog post base properties
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: string;
  tags: string[];
  publishDate: string;
  lastModified?: string;
  readingTime?: number; // in minutes
  commentCount?: number;
  isPublished?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

/**
 * Comment on a blog post
 */
export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    website?: string;
  };
  content: string;
  createdAt: string;
  parentId?: string; // For nested comments
  isApproved: boolean;
} 