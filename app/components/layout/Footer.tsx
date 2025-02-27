"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-lg text-primary">Kontakt</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p>Amrum Tourismus</p>
                  <p>Strandstraße 123</p>
                  <p>25946 Wittdün auf Amrum</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+49 (0) 4682 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@amrum-tourismus.de</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link 
                  href="/urlaub" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Urlaub planen
                </Link>
              </li>
              <li>
                <Link 
                  href="/urlaub/unterkuenfte" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Unterkünfte
                </Link>
              </li>
              <li>
                <Link 
                  href="/urlaub/straende" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Strände
                </Link>
              </li>
              <li>
                <Link 
                  href="/events" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Veranstaltungen
                </Link>
              </li>
              <li>
                <Link 
                  href="/ueber-amrum" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Über Amrum
                </Link>
              </li>
              <li>
                <Link 
                  href="/ueber-amrum/karte" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Interaktive Karte
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Amrum Highlights</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Kniepsand - der breiteste Strand Europas</span>
              </li>
              <li>
                <span className="text-muted-foreground">Naturschutzgebiet Amrum Odde</span>
              </li>
              <li>
                <span className="text-muted-foreground">Leuchtturm mit Aussichtsplattform</span>
              </li>
              <li>
                <span className="text-muted-foreground">Historische Seefahrerkirche in Nebel</span>
              </li>
              <li>
                <span className="text-muted-foreground">Inselbahn "Amrumer Inselbahn"</span>
              </li>
              <li>
                <span className="text-muted-foreground">Restaurants mit frischem Fisch</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Folgen Sie uns</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Abonnieren Sie unseren Newsletter für aktuelle Angebote und Veranstaltungen.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="bg-background text-sm px-3 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                Anmelden
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto py-6 flex flex-col md:flex-row justify-between items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amrum Tourismus GmbH. Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-6 text-sm">
            <Link 
              href="/impressum" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </Link>
            <Link 
              href="/datenschutz" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Datenschutz
            </Link>
            <Link 
              href="/agb" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 