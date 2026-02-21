import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "shop", path: "/shop" },
    { key: "testimonials", path: "/testimonials" },
    { key: "contact", path: "/contact" },
  ];

  const servicesList = [
<<<<<<< HEAD
    "Bespoke Tailoring",
    "Ready Made",
    "Fabric Consultation",
    "Grooms Wear",
=======
    "Custom Tailoring",
    "Ready-Made Collection",
    "Grooms-wear",
    "Corporate Orders",
    "Fabric Consultation",
>>>>>>> bespoke/main
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Top section */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <img src={logo} alt="Twentiies" className="h-28 w-auto brightness-200" />
            <p className="text-xs text-primary-foreground/60 leading-relaxed tracking-wide">
              {t("footerTagline")}
            </p>
            <a
              href="https://instagram.com/Twentiies_Tailored"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-primary-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className="text-xs text-primary-foreground/60 hover:text-gold transition-colors tracking-wide"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-primary-foreground">
              {t("services")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {servicesList.map((service) => (
                <span key={service} className="text-xs text-primary-foreground/60 tracking-wide">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-primary-foreground">
              {t("contactUs")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+250792417246"
                className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-gold transition-colors"
              >
                <Phone size={14} />
                +250 792 417 246
              </a>
              <a
                href="https://instagram.com/Twentiies_Tailored"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-primary-foreground/60 hover:text-gold transition-colors"
              >
                <Instagram size={14} />
                @Twentiies_Tailored
              </a>
              <span className="flex items-center gap-2 text-xs text-primary-foreground/60">
                <MapPin size={14} />
                Kigali, Rwanda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-primary-foreground/40 tracking-widest uppercase">
            © {new Date().getFullYear()} Twentiies Tailored. All Rights Reserved.
          </p>
          <p className="text-[10px] text-primary-foreground/30 tracking-wider uppercase">
            Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
