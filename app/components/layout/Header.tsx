"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Hotel, Utensils, Map, Waves, Plane, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
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
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                item.subItems ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger className="text-foreground font-medium hover:text-primary transition-all">
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-[100]">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="w-full max-w-[600px] md:w-[500px] lg:w-[600px] p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  "group flex items-start gap-3 rounded-md p-3 hover:bg-accent transition-all duration-200"
                                )}
                              >
                                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                  {subItem.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                                    {subItem.name}
                                  </div>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-border">
                            <Link 
                              href="/urlaub" 
                              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              Alle Urlaubsangebote entdecken
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(
                        navigationMenuTriggerStyle(),
                        "font-medium hover:text-primary transition-colors"
                      )}>
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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