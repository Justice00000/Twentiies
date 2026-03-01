import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevAnnouncement = () =>
    setAnnouncementIndex((i) => (i - 1 + ANNOUNCEMENT_MESSAGES.length) % ANNOUNCEMENT_MESSAGES.length);
  const nextAnnouncement = () =>
    setAnnouncementIndex((i) => (i + 1) % ANNOUNCEMENT_MESSAGES.length);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar — sleek gold ribbon */}
      <div
        className={cn(
          "bg-accent text-accent-foreground overflow-hidden transition-all duration-500",
          scrolled ? "h-0 opacity-0" : "h-9 opacity-100"
        )}
      >
        <div className="h-full flex items-center justify-between px-4 md:px-8">
          <button onClick={prevAnnouncement} className="text-accent-foreground/60 hover:text-accent-foreground transition-colors" aria-label="Previous">
            <ChevronLeft size={14} />
          </button>
          <span
            key={announcementIndex}
            className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-center flex-1 animate-fade-in"
          >
            {ANNOUNCEMENT_MESSAGES[announcementIndex]}
          </span>
          <button onClick={nextAnnouncement} className="text-accent-foreground/60 hover:text-accent-foreground transition-colors" aria-label="Next">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Navbar — glass-morphism effect on scroll */}
      <nav
        className={cn(
          "transition-all duration-500 ease-out",
          scrolled
            ? "bg-background/85 backdrop-blur-xl shadow-[0_1px_20px_-4px_hsl(var(--accent)/0.15)]"
            : "bg-background"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group">
              <img
                src={logo}
                alt="Twentiies"
                className={cn(
                  "w-auto transition-all duration-500",
                  scrolled ? "h-20 md:h-24" : "h-28 md:h-32"
                )}
              />
            </Link>

            {/* Desktop Nav Links — centered with animated underlines */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredLink === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-4 py-2 group"
                  >
                    <span
                      className={cn(
                        "text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors duration-300",
                        isActive ? "text-accent" : "text-foreground/70 group-hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </span>
                    {/* Animated underline */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 h-[2px] bg-accent rounded-full transition-all duration-400 ease-out",
                        isActive || isHovered
                          ? "w-3/4 -translate-x-1/2 opacity-100"
                          : "w-0 -translate-x-1/2 opacity-0"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Actions — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageToggle />
              {/* Cart with badge */}
              <Link to="/cart" className="relative p-2 text-foreground/70 hover:text-accent transition-colors duration-300 group">
                <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1 animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-1">
              <LanguageToggle />
              <Link to="/cart" className="relative p-2 text-foreground/70 hover:text-accent transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground/70 hover:text-accent transition-colors relative"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className={cn(
                    "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  )} />
                  <span className={cn(
                    "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                    isOpen ? "opacity-0 scale-x-0" : "opacity-100"
                  )} />
                  <span className={cn(
                    "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  )} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 bg-background/95 backdrop-blur-xl transition-all duration-500 ease-out overflow-hidden",
          isOpen ? "top-[calc(4rem+2.25rem)] bottom-0 opacity-100" : "top-[calc(4rem+2.25rem)] bottom-full opacity-0 pointer-events-none",
          scrolled && "top-16"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-2 py-8">
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group relative overflow-hidden py-3"
                style={{ animationDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              >
                <span
                  className={cn(
                    "text-lg font-semibold tracking-[0.3em] uppercase transition-colors duration-300",
                    isActive ? "text-accent" : "text-foreground/60 group-hover:text-foreground"
                  )}
                >
                  {link.name}
                </span>
                <span
                  className={cn(
                    "block h-[1.5px] bg-accent mt-1 transition-all duration-300 mx-auto rounded-full",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
          <Link
            to="/order"
            onClick={() => setIsOpen(false)}
            className="mt-6 px-10 py-3 bg-accent text-accent-foreground text-xs font-bold tracking-[0.3em] uppercase hover:bg-accent/90 transition-colors duration-300"
          >
            {t("orderNow")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
