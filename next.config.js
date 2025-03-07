/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Google Maps image domains
      'lh5.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh6.googleusercontent.com',
      'maps.googleapis.com',
      'streetviewpixels-pa.googleapis.com',
      
      // Tripadvisor image domains
      'dynamic-media-cdn.tripadvisor.com',
      
      // Hotel domains
      'www.hotel-ami.fr',
      
      // Add your own domain if needed
      'kniep-amrum.com',
      
      // Image hosting services
      'postimg.cc',           // PostImage Domain
      'i.postimg.cc',         // PostImage Direct Image Domain
      'i.imgur.com',          // Imgur Direct Image Domain
      'imgur.com',            // Imgur Domain
      'ibb.co',               // ImgBB Domain
      'i.ibb.co'              // ImgBB Direct Image Domain
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.tripadvisor.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**.hotel-ami.fr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.hotel-ami.fr',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/hotelbilder/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/hotelbilder/**',
      },
      {
        protocol: 'https',
        hostname: '**.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.ibb.co',
        pathname: '/**',
      }
    ]
  },
  
  // Optional: Configure other Next.js options if needed
  reactStrictMode: true,

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Use standalone output
  output: 'standalone',
};

module.exports = nextConfig; 