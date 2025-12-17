import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Shirt, Palette, Heart, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import fabricsImage from "@/assets/fabrics.jpg";

const Services = () => {
  const services = [
    { icon: Scissors, title: "Bespoke Tailoring", description: "Custom outfits crafted with precision and premium fabrics." },
    { icon: Shirt, title: "Ready-Made", description: "Quality pieces ready to wear, no waiting." },
    { icon: Palette, title: "Fabric Consultation", description: "Expert guidance on fabrics, colours, and styles." },
    { icon: Heart, title: "Grooms-wear", description: "Coordinated designs for your big day." },
    { icon: Users, title: "Corporate Orders", description: "Unified premium outfits for teams." },
    { icon: Clock, title: "Express Service", description: "Fast delivery without compromising quality." },
  ];

  const categories = [
    { name: "Agbada" },
    { name: "Kaftan" },
    { name: "Traditional" },
    { name: "Trousers" },
    { name: "Fabrics" },
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
              What We Do
            </h1>
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
                <p className="text-muted-foreground">
                  {service.description}
                </p>
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
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mt-4 text-charcoal">
              What We Create
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`text-center p-6 rounded-lg bg-background border border-border hover:border-gold transition-all duration-300 animate-fade-up stagger-${index + 1}`}
              >
                <h3 className="font-heading text-lg font-semibold text-charcoal">
                  {category.name}
                </h3>
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
              <img src={fabricsImage} alt="Premium Fabrics" className="rounded-lg shadow-xl" />
            </div>
            <div className="space-y-6 animate-fade-up stagger-2">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Premium Materials
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold">
                Only the Finest Fabrics
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We source premium fabrics to ensure every piece meets the highest standards.
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
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button variant="gold" size="lg" className="group">
                  Place Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/250792417246" target="_blank" rel="noopener noreferrer">
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
