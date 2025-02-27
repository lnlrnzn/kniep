import { Open_Sans, Montserrat } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ScrollToTop } from "./components/ui/scroll-to-top";
import { baseMetadata } from "./lib/metadata";

// Define fonts
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

// Export the base metadata for the site
export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${openSans.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-white font-sans">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
