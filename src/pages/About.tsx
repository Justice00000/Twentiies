import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";

const About = () => {
  const values = [
    { icon: Target, title: "Precision" },
    { icon: Eye, title: "Vision" },
    { icon: Heart, title: "Passion" },
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
                Clothing That Speaks Before You Do
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                African elegance meets modern structure. We create outfits that fit seamlessly into work, weddings, and everyday life.
              </p>
              <p className="text-xl font-heading text-charcoal font-medium italic">
                "We don't just sew clothes. We shape identity."
              </p>
            </div>
            <div className="relative">
              <img src={brand1} alt="Workshop" className="rounded-lg shadow-2xl animate-fade-up" />
              <img src={brand2} alt="Design" className="absolute -bottom-8 -left-8 w-2/3 rounded-lg shadow-2xl border-4 border-background animate-fade-up stagger-2 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`text-center p-8 rounded-lg bg-background border border-border hover:border-gold/50 transition-all duration-300 animate-fade-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-medium">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
              Ready to Experience Twentiies?
            </h2>
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
