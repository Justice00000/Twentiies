import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
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
    "Custom Tailoring",
    "Ready-Made Collection",
    "Grooms-wear",
    "Corporate Orders",
    "Fabric Consultation",
  ];

  return (
    <footer className="bg-secondary text-foreground">
      {/* Top section */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <img src={logo} alt="Twentiies" className="h-16 w-auto" />
            <p className="text-xs text-muted-foreground leading-relaxed tracking-wide">
              {t("footerTagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground">
              {t("services")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {servicesList.map((service) => (
                <span key={service} className="text-xs text-muted-foreground tracking-wide">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground">
              {t("contactUs")}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+250792417246"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                <Phone size={14} />
                +250 792 417 246
              </a>
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin size={14} />
                Kigali, Rwanda
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Returns Policy */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <h4 className="text-xs font-bold tracking-[0.25em] uppercase text-foreground mb-6">
            Returns & Refund Policy
          </h4>
          <div className="space-y-4 text-xs text-muted-foreground leading-relaxed tracking-wide max-w-3xl">
            <p>
              At Twentiies, we are committed to delivering high-quality, intentionally designed fashion pieces. If you are not completely satisfied with your purchase, we're here to help.
            </p>
            <div>
              <p className="font-semibold text-foreground mb-1">1. Returns Eligibility</p>
              <ul className="list-disc list-inside space-y-1 ml-1">
                <li>Items must be returned within 7 days of delivery.</li>
                <li>Items must be unused, unworn, unwashed, and in original condition.</li>
                <li>Original tags and packaging must be intact.</li>
                <li>Proof of purchase is required.</li>
              </ul>
              <p className="mt-2">Twentiies reserves the right to reject returns that do not meet these conditions.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">2. Refund Process</p>
              <p>Once your return is received and inspected: if approved, refunds will be processed to the original payment method within 5–10 business days. Shipping fees are non-refundable unless the item received was defective or incorrect.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} Twentiies Tailored. All Rights Reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase">
            Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
