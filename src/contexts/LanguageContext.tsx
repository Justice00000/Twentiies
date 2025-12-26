import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "fr" | "rw";

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    rw: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", fr: "Accueil", rw: "Ahabanza" },
  about: { en: "About", fr: "À propos", rw: "Ibyerekeye" },
  services: { en: "Services", fr: "Services", rw: "Serivisi" },
  shop: { en: "Shop", fr: "Boutique", rw: "Iduka" },
  testimonials: { en: "Testimonials", fr: "Témoignages", rw: "Ibitekerezo" },
  contact: { en: "Contact", fr: "Contact", rw: "Twandikire" },
  orderNow: { en: "Order Now", fr: "Commander", rw: "Tegura" },
  
  // Hero Section
  heroTitle: { en: "Crafted for the Modern Man", fr: "Conçu pour l'Homme Moderne", rw: "Byakozwe ku Mugabo wa None" },
  heroSubtitle: { 
    en: "Premium African menswear, tailored to perfection", 
    fr: "Vêtements africains pour hommes, taillés à la perfection", 
    rw: "Imyenda y'Abagabo y'Afurika, yatunganyijwe neza" 
  },
  exploreCollection: { en: "Explore Collection", fr: "Explorer la Collection", rw: "Reba Ibiboneka" },
  bookAppointment: { en: "Book Appointment", fr: "Prendre Rendez-vous", rw: "Fata Igihe" },
  
  // Featured Section
  featuredTitle: { en: "Featured Collection", fr: "Collection Vedette", rw: "Ibiboneka Byihariye" },
  featuredSubtitle: { 
    en: "Discover our handcrafted pieces that blend tradition with contemporary style", 
    fr: "Découvrez nos pièces artisanales qui mêlent tradition et style contemporain", 
    rw: "Menya ibikorwa byacu bifatanya umuco n'uburyo bwa none" 
  },
  
  // About Section
  aboutTitle: { en: "The Art of Bespoke Tailoring", fr: "L'Art de la Couture Sur Mesure", rw: "Ubuhanga bwo Kudoda" },
  aboutDescription: { 
    en: "At Twentiies, we believe every man deserves clothing that tells his story. Our master tailors combine traditional African craftsmanship with modern techniques to create pieces that are uniquely yours.", 
    fr: "Chez Twentiies, nous croyons que chaque homme mérite des vêtements qui racontent son histoire. Nos maîtres tailleurs combinent l'artisanat africain traditionnel avec des techniques modernes.", 
    rw: "Kuri Twentiies, twizera ko buri mugabo akwiye imyenda ivuga inkuru ye. Abadozi bacu bahuje ubuhanga bw'Afurika n'uburyo bugezweho." 
  },
  learnMore: { en: "Learn More", fr: "En Savoir Plus", rw: "Menya Byinshi" },
  
  // Services
  servicesTitle: { en: "Our Services", fr: "Nos Services", rw: "Serivisi Zacu" },
  customTailoring: { en: "Custom Tailoring", fr: "Couture Sur Mesure", rw: "Kudoda ku Gipimo" },
  alterations: { en: "Alterations", fr: "Retouches", rw: "Guhindura" },
  fabricSourcing: { en: "Fabric Sourcing", fr: "Approvisionnement en Tissus", rw: "Gushaka Imyenda" },
  
  // Footer
  footerTagline: { en: "Crafting excellence since 2020", fr: "L'excellence depuis 2020", rw: "Ubuhanga kuva 2020" },
  quickLinks: { en: "Quick Links", fr: "Liens Rapides", rw: "Aho Unyura Vuba" },
  contactUs: { en: "Contact Us", fr: "Contactez-nous", rw: "Twandikire" },
  followUs: { en: "Follow Us", fr: "Suivez-nous", rw: "Dukurikire" },
  allRightsReserved: { en: "All rights reserved", fr: "Tous droits réservés", rw: "Uburenganzira bwose burabitswe" },
  
  // Cart
  cart: { en: "Cart", fr: "Panier", rw: "Agaseke" },
  addToCart: { en: "Add to Cart", fr: "Ajouter au Panier", rw: "Shyira mu Gaseke" },
  checkout: { en: "Checkout", fr: "Passer la Commande", rw: "Kwishyura" },
  
  // Common
  viewAll: { en: "View All", fr: "Voir Tout", rw: "Reba Byose" },
  readMore: { en: "Read More", fr: "Lire Plus", rw: "Soma Byinshi" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("twentiies-language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("twentiies-language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
