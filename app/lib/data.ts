import restaurantsData from '../data/restaurants.json';
import blogPostsData from '../data/blog-posts.json';
import accommodationsData from '../data/accommodations.json';
import ferryData from '../data/ferry-schedule.json';

// Import types from the centralized type definitions
import {
  Accommodation,
  BlogPost,
  Author,
  FerryData,
  Tag,
  ApiResponse
} from '../types';

// Restaurant type definition (to be moved to types later)
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

// Restaurant data functions
export async function getRestaurants(): Promise<Restaurant[]> {
  // In a real app with a lot of data, you might want to add filtering, sorting, etc.
  return restaurantsData as Restaurant[];
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  try {
    const restaurant = restaurantsData.find(r => r.id === id) as Restaurant;
    return restaurant || null;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    return null;
  }
}

// Accommodation data functions with improved error handling
export async function getAccommodations(): Promise<Accommodation[]> {
  try {
    return accommodationsData as Accommodation[];
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return [];
  }
}

export async function getAccommodationById(id: string): Promise<Accommodation | null> {
  try {
    const accommodation = accommodationsData.find(a => a.id === id) as Accommodation;
    return accommodation || null;
  } catch (error) {
    console.error(`Error fetching accommodation with ID ${id}:`, error);
    return null;
  }
}

// Blog post data functions with improved error handling
export async function getBlogPosts(limit = 10): Promise<BlogPost[]> {
  try {
    // Sort by publish date (newest first)
    const sortedPosts = [...blogPostsData].sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
    
    // Return only the requested number of posts
    return sortedPosts.slice(0, limit) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = blogPostsData.find(p => p.slug === slug) as BlogPost;
    return post || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = blogPostsData.filter(p => p.category === category) as BlogPost[];
    
    // Sort by publish date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  } catch (error) {
    console.error(`Error fetching blog posts for category ${category}:`, error);
    return [];
  }
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const posts = blogPostsData.filter(p => p.tags.includes(tag)) as BlogPost[];
    
    // Sort by publish date (newest first)
    return posts.sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  } catch (error) {
    console.error(`Error fetching blog posts for tag ${tag}:`, error);
    return [];
  }
}

export async function getBlogTags(): Promise<string[]> {
  try {
    const allTags = blogPostsData.flatMap(post => post.tags);
    return [...new Set(allTags)];
  } catch (error) {
    console.error('Error fetching blog tags:', error);
    return [];
  }
}

// Ferry data functions
export async function getFerryData(): Promise<FerryData> {
  try {
    return ferryData as FerryData;
  } catch (error) {
    console.error('Error fetching ferry data:', error);
    throw new Error('Failed to fetch ferry schedule data');
  }
}

// Helper for images
export function transformImageUrl(url: string): string {
  if (!url) return '/images/placeholder.jpg';
  
  // If it's already an absolute URL or starts with a slash, return as is
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, assume it's relative to the public directory
  return `/${url}`;
} 