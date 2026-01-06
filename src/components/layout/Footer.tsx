import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { key: "about", path: "/about" },
    { key: "services", path: "/services" },
    { key: "shop", path: "/shop" },
    { key: "contact", path: "/contact" },
  ];

  const servicesList = [
    "bespokeTailoring",
    "readyMade",
    "fabricConsultation",
    "groomsWear",
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Twentiies" className="h-32 w-auto" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {t("footerTagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">{t("services")}</h4>
            <nav className="flex flex-col gap-2">
              {servicesList.map((service) => (
                <span
                  key={service}
                  className="text-sm text-primary-foreground/70"
                >
                  {t(service)}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">{t("contactUs")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+250792417246"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                <Phone size={16} />
                +250 792 417 246
              </a>
              <a
                href="https://instagram.com/Twentiies_Tailored"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors"
              >
                <Instagram size={16} />
                @Twentiies_Tailored
              </a>
              <span className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={16} />
                Kigali, Rwanda
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Twentiies Tailored. {t("allRightsReserved")}.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/Twentiies_Tailored"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
