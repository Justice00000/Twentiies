import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Users, Star, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSlideshow from "@/components/HeroSlideshow";
import heroImage from "@/assets/hero-main.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const Index = () => {
  const services = [
    { icon: Scissors, title: "Bespoke Tailoring" },
    { icon: Shirt, title: "Ready-Made" },
    { icon: Users, title: "Grooms-wear" },
    { icon: Star, title: "Corporate Orders" },
  ];

  const featuredImages = [gallery1, gallery2, gallery3];
  const heroImages = [heroImage, gallery1, gallery2, gallery3];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <HeroSlideshow images={heroImages} interval={5000} />

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl text-primary-foreground animate-fade-up">
            <p className="text-gold font-medium tracking-widest uppercase text-sm mb-4">
              Crafted for the Modern Man
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold leading-tight mb-6">
              African Elegance. Modern Style.
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Every cut tells your story. We design for the bold.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button variant="gold" size="xl" className="group">
                  Order Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="hero-outline" size="xl" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
                  Our Services
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
                We Shape Identity.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                African elegance meets modern structure. Outfits that fit your work, weddings, and everyday life.
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg" className="mt-4 group">
                  About Us
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={gallery1} alt="Agbada" className="rounded-lg shadow-xl animate-fade-up stagger-1" />
              <img src={gallery2} alt="Kaftan" className="rounded-lg shadow-xl mt-12 animate-fade-up stagger-2" />
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
                <h3 className="font-heading text-xl font-medium">
                  {service.title}
                </h3>
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
              Featured
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
                  alt={`Collection ${index + 1}`}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button variant="gold" size="xl" className="group">
                  Place Your Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/250792417246" target="_blank" rel="noopener noreferrer">
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
