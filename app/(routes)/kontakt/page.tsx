"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ContentContainer } from "../../components/ui/content-container";

export default function KontaktPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In einer realen Anwendung würde hier eine API-Anfrage zum Senden des Formulars erfolgen
    setFormStatus("submitting");
    
    // Simulieren einer API-Antwort
    setTimeout(() => {
      setFormStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <ContentContainer className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Kontakt</h1>
        <p className="text-lg text-muted-foreground">
          Haben Sie Fragen zu Amrum oder benötigen Sie Unterstützung bei der Planung Ihres Aufenthalts?
          Unser Team steht Ihnen gerne zur Verfügung.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kontaktformular */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Schreiben Sie uns</CardTitle>
              <CardDescription>
                Füllen Sie das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ihr Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Betreff</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Worum geht es?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Ihre Nachricht an uns..."
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} /> Nachricht senden
                    </span>
                  )}
                </Button>
                
                {formStatus === "success" && (
                  <div className="p-3 bg-green-100 border border-green-200 text-green-800 rounded-md text-sm mt-4">
                    Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.
                  </div>
                )}
                
                {formStatus === "error" && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-800 rounded-md text-sm mt-4">
                    Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Kontaktinformationen und Karte */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Kontaktdaten</CardTitle>
              <CardDescription>
                So erreichen Sie uns direkt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className="text-muted-foreground">Kniep 7, 25946 Wittdün auf Amrum</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-muted-foreground">+49 (0) 4682 123456</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">E-Mail</h3>
                  <p className="text-muted-foreground">info@kniep-amrum.com</p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-2">Öffnungszeiten</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Montag - Freitag:</span>
                    <span>09:00 - 17:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag:</span>
                    <span>10:00 - 14:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag:</span>
                    <span>Geschlossen</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Kartenintegration (Platzhalter) */}
          <Card>
            <CardHeader>
              <CardTitle>Standort</CardTitle>
              <CardDescription>
                So finden Sie uns auf Amrum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Hier wird in der fertigen Version eine interaktive Karte angezeigt.<br />
                  <span className="text-sm">(Google Maps oder OpenStreetMap-Integration)</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ContentContainer>
  );
} 