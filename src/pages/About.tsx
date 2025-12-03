import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every stitch, every cut is executed with meticulous attention to detail.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "We see beyond fabric—we see the man you want to become.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Our love for craftsmanship shows in every piece we create.",
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              About Us
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Crafted for the Modern Man
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              We design for the man who values tradition but lives in the now. For the bold, the ambitious, the grounded.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-up">
              <span className="text-gold font-medium tracking-widest uppercase text-sm">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold">
                Men Deserve Clothing That Speaks Before They Do
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Twentiies Tailored was built on a simple belief: men deserve clothing that speaks before they do. Our designs blend African elegance with modern structure, creating outfits that fit seamlessly into work, weddings, celebrations, and everyday life.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every piece is carefully crafted with quality fabrics, expert tailoring, and a commitment to clean, refined style. We are proudly based in Kigali and dedicated to helping men dress well effortlessly.
              </p>
              <p className="text-xl font-heading text-charcoal font-medium italic">
                "At Twentiies, we don't just sew clothes. We shape identity."
              </p>
            </div>
            <div className="relative">
              <img
                src={brand1}
                alt="Twentiies Tailored Workshop"
                className="rounded-lg shadow-2xl animate-fade-up"
              />
              <img
                src={brand2}
                alt="Twentiies Tailored Design"
                className="absolute -bottom-8 -left-8 w-2/3 rounded-lg shadow-2xl border-4 border-background animate-fade-up stagger-2 hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mt-4 mb-6 text-charcoal">
              Redefining Masculine Style for This Generation
            </h2>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              Our pieces blend classic African elegance with a modern edge, tailored for real life. Every cut, every thread tells a story. Yours. We are here to dress men who are going somewhere.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mt-4">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`text-center p-8 rounded-lg bg-card border border-border hover:border-gold/50 transition-all duration-300 animate-fade-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-medium mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
              Ready to Experience Twentiies?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Explore our services or place your order today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="gold" size="lg" className="group">
                  View Services
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/order">
                <Button variant="hero-outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
                  Place Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
