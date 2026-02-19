import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import LanguageToggle from "./LanguageToggle";

const ANNOUNCEMENT_MESSAGES = [
  "WELCOME TO TWENTIIES TAILORED — KIGALI'S PREMIER MENSWEAR",
  "FREE CONSULTATION ON ALL CUSTOM ORDERS",
  "FOLLOW US @TWENTIIES_TAILORED",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const location = useLocation();
  const { totalItems } = useCart();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    { name: t("services"), path: "/services" },
    { name: t("shop"), path: "/shop" },
    { name: t("testimonials"), path: "/testimonials" },
    { name: t("contact"), path: "/contact" },
  ];

  const prevAnnouncement = () =>
    setAnnouncementIndex((i) => (i - 1 + ANNOUNCEMENT_MESSAGES.length) % ANNOUNCEMENT_MESSAGES.length);
  const nextAnnouncement = () =>
    setAnnouncementIndex((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-gold text-charcoal text-xs font-medium tracking-widest uppercase py-2.5 px-4 flex items-center justify-between">
        <button onClick={prevAnnouncement} className="opacity-70 hover:opacity-100 transition-opacity p-1" aria-label="Previous">
          ‹
        </button>
        <span className="text-center flex-1 truncate px-2">
          {ANNOUNCEMENT_MESSAGES[announcementIndex]}
        </span>
        <button onClick={nextAnnouncement} className="opacity-70 hover:opacity-100 transition-opacity p-1" aria-label="Next">
          ›
        </button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-charcoal border-b border-charcoal-light/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left nav links - desktop */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-xs font-medium tracking-widest uppercase transition-colors hover:text-gold",
                    location.pathname === link.path ? "text-gold" : "text-primary-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo - centered */}
            <Link to="/" className="flex items-center justify-center flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <img src={logo} alt="Twentiies" className="h-24 md:h-28 w-auto" />
            </Link>

            {/* Right nav links + actions - desktop */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-xs font-medium tracking-widest uppercase transition-colors hover:text-gold",
                    location.pathname === link.path ? "text-gold" : "text-primary-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <LanguageToggle />
              <Link to="/cart" className="relative p-1.5 text-primary-foreground hover:text-gold transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center text-[10px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile actions */}
            <div className="lg:hidden flex items-center gap-1 ml-auto">
              <LanguageToggle />
              <Link to="/cart" className="relative p-2 text-primary-foreground hover:text-gold transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-charcoal text-xs font-bold rounded-full flex items-center justify-center text-[10px]">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-primary-foreground hover:text-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-charcoal-light/30 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-xs font-medium tracking-widest uppercase transition-colors hover:text-gold py-3 px-2 border-b border-charcoal-light/20",
                      location.pathname === link.path ? "text-gold" : "text-primary-foreground/80"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-center py-3 bg-gold text-charcoal text-xs font-bold tracking-widest uppercase"
                >
                  {t("orderNow")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
