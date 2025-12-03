import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Users, Star, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-main.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const Index = () => {
  const services = [
    {
      icon: Scissors,
      title: "Bespoke Tailoring",
      description: "Custom outfits crafted with precision and premium fabrics.",
    },
    {
      icon: Shirt,
      title: "Ready-Made",
      description: "Quality pieces ready to wear, no waiting required.",
    },
    {
      icon: Users,
      title: "Grooms-wear",
      description: "Coordinated designs for your big day, tailored to perfection.",
    },
    {
      icon: Star,
      title: "Corporate Orders",
      description: "Premium unified outfits for teams and organisations.",
    },
  ];

  const featuredImages = [gallery1, gallery2, gallery3];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Twentiies Tailored - Modern African Menswear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl text-primary-foreground animate-fade-up">
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
              Crafted for the Modern Man
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold leading-tight mb-6">
              Where African Elegance Meets Modern Style
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
              Every cut, every thread tells a story. Yours. We design for the bold, the ambitious, the grounded.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button variant="gold" size="xl" className="group">
                  Order Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="hero-outline" size="xl" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-up">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-heading font-semibold leading-tight">
                We Don't Just Sew Clothes. We Shape Identity.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Twentiies Tailored was built on a simple belief: men deserve clothing that speaks before they do. Our designs blend African elegance with modern structure, creating outfits that fit seamlessly into work, weddings, celebrations, and everyday life.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every piece is carefully crafted with quality fabrics, expert tailoring, and a commitment to clean, refined style.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg" className="mt-4 group">
                  Learn More About Us
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={gallery1}
                alt="Twentiies Tailored - Agbada"
                className="rounded-lg shadow-xl animate-fade-up stagger-1"
              />
              <img
                src={gallery2}
                alt="Twentiies Tailored - Kaftan"
                className="rounded-lg shadow-xl mt-12 animate-fade-up stagger-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold mt-4">
              Our Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`p-6 border border-primary-foreground/10 rounded-lg hover:border-gold/50 transition-all duration-300 group animate-fade-up stagger-${index + 1}`}
              >
                <service.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-xl font-medium mb-2">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="gold" size="lg" className="group">
                View All Services
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Featured Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold mt-4 text-charcoal">
              Style That Speaks
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredImages.map((img, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg group cursor-pointer animate-fade-up stagger-${index + 1}`}
              >
                <img
                  src={img}
                  alt={`Twentiies Collection ${index + 1}`}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="hero" size="lg" className="group">
                Explore Full Gallery
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brown text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-heading font-semibold mb-6">
              Ready to Define Your Style?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Get measured. Get styled. Get noticed. Start your journey with Twentiies Tailored today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button variant="gold" size="xl" className="group">
                  Place Your Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://wa.me/250792417246"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="xl">
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

export default Index;
