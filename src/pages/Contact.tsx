import { Phone, MapPin, Instagram, Clock, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      value: "+250 792 417 246",
      link: "tel:+250792417246",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@Twentiies_Tailored",
      link: "https://instagram.com/Twentiies_Tailored",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kigali, Rwanda",
      link: null,
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 9AM - 6PM",
      link: null,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Ready to start your style journey? Reach out and let's create something remarkable together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8 animate-fade-up">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have questions about our services? Want to discuss a custom order? 
                  We're here to help. Reach out through any of the channels below.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.title}
                    className={`p-6 rounded-lg bg-card border border-border hover:border-gold/30 transition-all duration-300 animate-fade-up stagger-${index + 1}`}
                  >
                    <item.icon className="w-8 h-8 text-gold mb-4" />
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://wa.me/250792417246"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <a href="tel:+250792417246" className="flex-1">
                  <Button variant="hero" size="lg" className="w-full">
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Map/Visual */}
            <div className="relative animate-fade-up stagger-2">
              <div className="aspect-square rounded-lg bg-cream flex items-center justify-center border border-border">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-gold mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-semibold mb-2 text-charcoal">
                    Visit Our Studio
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Kigali, Rwanda
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For studio visits, please contact us first to schedule an appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h2 className="text-3xl font-heading font-semibold mb-6 text-charcoal">
              Common Questions
            </h2>
            <div className="space-y-6 text-left">
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold mb-2">How long does a custom order take?</h3>
                <p className="text-muted-foreground">Standard orders take 1-2 weeks. Express service is available for urgent requests.</p>
              </div>
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold mb-2">Do you ship outside Rwanda?</h3>
                <p className="text-muted-foreground">Yes! We ship to Lagos and offer international delivery. Contact us for shipping details.</p>
              </div>
              <div className="p-6 rounded-lg bg-background border border-border">
                <h3 className="font-semibold mb-2">How do I submit my measurements?</h3>
                <p className="text-muted-foreground">Use our order form or send your measurements via WhatsApp. We'll guide you through the process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
