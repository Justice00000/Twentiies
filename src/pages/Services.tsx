import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Shirt, Palette, Heart, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import fabricsImage from "@/assets/fabrics.jpg";

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: "Bespoke Tailoring",
      description: "Experience custom outfits crafted with precision, premium fabrics, and clean finishing. Each piece is uniquely designed to fit your personality and lifestyle.",
      features: ["Style consultation", "Premium fabrics", "Perfect fit guarantee", "Express options available"],
    },
    {
      icon: Shirt,
      title: "Ready-Made Outfits",
      description: "Explore our ready-to-wear pieces made with the same attention to detail—perfect for clients who want quality without the wait.",
      features: ["Curated collection", "Quality fabrics", "Available sizes", "Quick delivery"],
    },
    {
      icon: Palette,
      title: "Fabric Curation & Consultation",
      description: "Our team assists you in choosing the right fabrics, colours, and styles to bring your vision to life.",
      features: ["Expert guidance", "Premium fabric selection", "Color matching", "Style advice"],
    },
    {
      icon: Heart,
      title: "Bridal & Grooms-wear Packages",
      description: "We offer coordinated designs for grooms, bridal trains, and family outfits tailored to perfection for your big day.",
      features: ["Coordinated designs", "Group fittings", "Custom embroidery", "Special occasion styling"],
    },
    {
      icon: Users,
      title: "Corporate & Group Orders",
      description: "Available for companies, teams, choirs, and organisations seeking unified premium outfits.",
      features: ["Bulk pricing", "Uniform designs", "Team branding", "On-time delivery"],
    },
    {
      icon: Clock,
      title: "Express Service",
      description: "Need it fast? Our express service delivers your custom outfit in record time without compromising quality.",
      features: ["Rush orders", "Priority handling", "Quick turnaround", "Quality maintained"],
    },
  ];

  const categories = [
    { name: "Agbada", description: "Majestic flowing robes for grand occasions" },
    { name: "Kaftan", description: "Elegant simplicity for everyday sophistication" },
    { name: "Traditional Wear", description: "Authentic African designs with modern flair" },
    { name: "Trousers", description: "Perfectly tailored bottoms for any occasion" },
    { name: "Fabrics", description: "Premium materials sourced for quality" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Our Services
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              What Can We Do For You?
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              From bespoke tailoring to ready-made elegance, we offer a complete range of services to elevate your style.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`p-8 rounded-lg bg-card border border-border hover:border-gold/50 hover:shadow-lg transition-all duration-300 group animate-fade-up stagger-${(index % 5) + 1}`}
              >
                <div className="w-14 h-14 mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Style Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mt-4 text-charcoal">
              What We Create
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`text-center p-6 rounded-lg bg-background border border-border hover:border-gold transition-all duration-300 animate-fade-up stagger-${index + 1}`}
              >
                <h3 className="font-heading text-lg font-semibold mb-2 text-charcoal">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fabrics Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <img
                src={fabricsImage}
                alt="Premium Fabrics"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6 animate-fade-up stagger-2">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Premium Materials
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold">
                Only the Finest Fabrics
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We source premium fabrics from around the world to ensure every piece we create meets the highest standards of quality and comfort.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From luxurious cotton to elegant blends, each fabric is carefully selected to complement your style and the design's requirements.
              </p>
              <Link to="/order">
                <Button variant="hero" size="lg" className="mt-4 group">
                  Start Your Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brown text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Place your order today or reach out to discuss your custom requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button variant="gold" size="lg" className="group">
                  Place Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/250792417246"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
