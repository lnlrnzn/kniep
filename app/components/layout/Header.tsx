"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Hotel, Utensils, Map, Waves, Plane, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Startseite", href: "/" },
  { 
    name: "Urlaub", 
    href: "/urlaub",
    subItems: [
      { 
        name: "Unterkünfte", 
        href: "/urlaub/unterkuenfte",
        icon: <Hotel className="h-4 w-4" />,
        description: "Hotels, Ferienwohnungen und mehr"
      },
      { 
        name: "Restaurants", 
        href: "/restaurants",
        icon: <Utensils className="h-4 w-4" />,
        description: "Restaurants, Cafés und Bars"
      },
      { 
        name: "Aktivitäten", 
        href: "/urlaub/aktivitaeten",
        icon: <Map className="h-4 w-4" />,
        description: "Erlebnisse und Freizeitangebote"
      },
      { 
        name: "Strände", 
        href: "/urlaub/straende",
        icon: <Waves className="h-4 w-4" />,
        description: "Die schönsten Strände der Insel"
      },
      { 
        name: "Anreise", 
        href: "/urlaub/anreise",
        icon: <Plane className="h-4 w-4" />,
        description: "Fähre, Bahn und Anfahrt mit Auto"
      },
    ]
  },
  { name: "Events", href: "/events" },
  { name: "Über Amrum", href: "/ueber-amrum" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"left" | "right">("left");
  const [scrolled, setScrolled] = useState(false);
  const urlaubRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Überprüfen, ob wir uns auf der Startseite befinden
  const isHomePage = pathname === "/";

  // Function to determine dropdown position based on viewport
  useEffect(() => {
    const handleResize = () => {
      if (urlaubRef.current) {
        const rect = urlaubRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        if (rect.left > viewportWidth / 2) {
          setDropdownPosition("right");
        } else {
          setDropdownPosition("left");
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm" 
          : isHomePage
            ? "bg-transparent backdrop-blur-sm" 
            : "bg-white border-b border-gray-200 shadow-sm"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1 rounded-lg transition-all duration-300 group-hover:bg-white/10">
              <Image 
                src="/images/kniep-logo.png" 
                alt="Kniep-Amrum Logo" 
                width={54} 
                height={14} 
                className="h-auto" 
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.subItems ? (
                  <div ref={item.name === "Urlaub" ? urlaubRef : null} className="relative">
                    <button 
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium flex items-center transition-all duration-300",
                        scrolled || !isHomePage
                          ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/60" 
                          : "text-white hover:bg-white/20"
                      )}
                      onClick={(e) => e.currentTarget.focus()}
                      aria-expanded="false"
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className={cn(
                      "absolute top-full pt-2 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-[100]",
                      dropdownPosition === "left" ? "left-0" : "right-0"
                    )}>
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-5 w-full min-w-[450px] max-w-[90vw]">
                        <div className="grid grid-cols-1 gap-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group flex items-center gap-4 rounded-lg py-2 px-3 hover:bg-blue-50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {React.cloneElement(subItem.icon, { className: "h-5 w-5" })}
                              </div>
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {subItem.name}
                                </div>
                                <p className="text-xs text-gray-500">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link 
                            href="/urlaub" 
                            className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                          >
                            Alle Urlaubsangebote entdecken
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href} 
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium relative transition-all duration-300",
                      scrolled || !isHomePage
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50/60" 
                        : "text-white hover:bg-white/20"
                    )}
                  >
                    {item.name}
                    <span className="absolute inset-x-3 -bottom-px h-[2px] bg-current transform scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "rounded-full transition-all duration-300",
              scrolled || !isHomePage
                ? "text-gray-700 hover:bg-blue-50/60 hover:text-blue-600" 
                : "text-white hover:bg-white/20"
            )}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: scrolled || !isHomePage
                ? "rgba(255, 255, 255, 0.9)" 
                : "rgba(0, 0, 0, 0.5)"
            }}
          >
            <div className="max-w-[1400px] mx-auto py-5 space-y-4 px-4 sm:px-6 border-t border-gray-200/20">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-3">
                  <Link 
                    href={item.href}
                    onClick={() => !item.subItems && setMobileMenuOpen(false)}
                    className={cn(
                      "flex justify-between items-center py-2 font-medium text-base",
                      scrolled || !isHomePage ? "text-gray-800" : "text-white"
                    )}
                  >
                    {item.name}
                    {item.subItems && <ChevronDown className="h-4 w-4 opacity-70" />}
                  </Link>
                  
                  {item.subItems && (
                    <div className="pl-4 space-y-3 border-l-2 border-gray-300/50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-2 text-sm"
                          style={{
                            color: scrolled || !isHomePage ? "#4B5563" : "rgba(255, 255, 255, 0.9)" 
                          }}
                        >
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md",
                            scrolled || !isHomePage
                              ? "bg-blue-100 text-blue-600" 
                              : "bg-white/20 text-white"
                          )}>
                            {React.cloneElement(subItem.icon, { className: "h-4 w-4" })}
                          </div>
                          <div>
                            <div className="font-medium">{subItem.name}</div>
                            <p className="text-xs opacity-80 mt-0.5">{subItem.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 