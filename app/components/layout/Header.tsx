"use client";

import React from "react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Hotel, Utensils, Map, Waves, Plane, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const urlaubRef = useRef<HTMLDivElement>(null);

  // Function to determine dropdown position based on viewport
  useEffect(() => {
    const handleResize = () => {
      if (urlaubRef.current) {
        const rect = urlaubRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        // If menu item is in the right half of the screen, position dropdown to the right
        if (rect.left > viewportWidth / 2) {
          setDropdownPosition("right");
        } else {
          setDropdownPosition("left");
        }
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* Placeholder für Logo - später durch tatsächliches Logo ersetzen */}
            <span className="font-bold text-xl text-primary">Kniep-Amrum</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                {item.subItems ? (
                  <div ref={item.name === "Urlaub" ? urlaubRef : null} className="relative">
                    <button 
                      className="text-foreground font-medium hover:text-primary transition-colors py-2 flex items-center"
                      onClick={(e) => e.currentTarget.focus()}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3 opacity-70" />
                    </button>
                    <div className={cn(
                      "absolute top-full pt-2 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-[100]",
                      dropdownPosition === "left" ? "left-0" : "right-0"
                    )}>
                      <div className="bg-white rounded-lg shadow-lg border border-border p-5 w-full min-w-[450px] max-w-[90vw]">
                        <div className="flex flex-col space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group flex items-center gap-4 rounded-md py-2 px-3 hover:bg-accent/50 transition-all duration-200"
                            >
                              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                {React.cloneElement(subItem.icon, { className: "h-6 w-6" })}
                              </div>
                              <div className="flex flex-col">
                                <div className="text-base font-medium group-hover:text-primary transition-colors">
                                  {subItem.name}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-5 pt-3 border-t border-border">
                          <Link 
                            href="/urlaub" 
                            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
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
                    className="text-foreground font-medium hover:text-primary transition-colors py-2 inline-block"
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Loading bar animation */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent group-hover:bg-transparent transition-all duration-300 ease-in-out" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menü öffnen"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto py-4 space-y-4 px-4 sm:px-6 lg:px-8">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <Link 
                    href={item.href}
                    onClick={() => !item.subItems && setMobileMenuOpen(false)}
                    className="block py-2 font-medium"
                  >
                    {item.name}
                  </Link>
                  
                  {item.subItems && (
                    <div className="pl-4 space-y-2 border-l border-gray-200">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                            {subItem.icon}
                          </div>
                          <span>{subItem.name}</span>
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