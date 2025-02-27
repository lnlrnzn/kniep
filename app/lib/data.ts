import restaurantsData from '../data/restaurants.json';
import blogPostsData from '../data/blog-posts.json';
import accommodationsData from '../data/accommodations.json';

// Type definitions for data models
export interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'beach-bar';
  cuisine: string;
  priceRange: string;
  location: string;
  description: string;
  image: string;
  openingHours: string;
  features: string[];
  rating: number;
  specialties: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'ferienhaus' | 'ferienwohnung' | 'pension';
  price: string;
  location: string;
  city: string;
  description: string;
  image: string;
  features: string[];
  stars: number;
  website?: string;
  phone?: string;
  rating: number;
}

export interface Author {
  name: string;
  picture: string;
}

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
}

// Restaurant data functions
export async function getRestaurants(): Promise<Restaurant[]> {
  // In a real app with a lot of data, you might want to add filtering, sorting, etc.
  return restaurantsData as Restaurant[];
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  const restaurant = restaurantsData.find(r => r.id === id) as Restaurant;
  return restaurant || null;
}

// Accommodation data functions
export async function getAccommodations(): Promise<Accommodation[]> {
  return accommodationsData as Accommodation[];
}

export async function getAccommodationById(id: string): Promise<Accommodation | null> {
  const accommodation = accommodationsData.find(a => a.id === id) as Accommodation;
  return accommodation || null;
}

// Blog post data functions
export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
  // Sort by publish date (newest first)
  const sortedPosts = [...blogPostsData].sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
  
  // Return only the requested number of posts
  return sortedPosts.slice(0, limit) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = blogPostsData.find(p => p.slug === slug) as BlogPost;
  return post || null;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = blogPostsData.filter(p => p.category === category) as BlogPost[];
  
  // Sort by publish date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = blogPostsData.filter(p => p.tags.includes(tag)) as BlogPost[];
  
  // Sort by publish date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
}

export async function getBlogTags(): Promise<string[]> {
  const allTags = blogPostsData.flatMap(post => post.tags);
  return [...new Set(allTags)];
}

// Helper for images (no longer needed if your images are stored directly in public)
export function transformImageUrl(url: string): string {
  // Just return the url if it's already correct
  return url;
} 