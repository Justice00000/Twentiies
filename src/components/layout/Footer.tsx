import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Twentiies" className="h-16 w-auto" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Crafted for the modern man. We design for those who value tradition but live in the now.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {["About", "Services", "Gallery", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">Services</h4>
            <nav className="flex flex-col gap-2">
              {["Bespoke Tailoring", "Ready-Made", "Fabric Consultation", "Grooms-wear"].map((service) => (
                <span
                  key={service}
                  className="text-sm text-primary-foreground/70"
                >
                  {service}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">Contact Us</h4>
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
            © {new Date().getFullYear()} Twentiies Tailored. All rights reserved.
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
