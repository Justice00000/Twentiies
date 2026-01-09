import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import brand1 from "@/assets/brand-1.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              About Twentiies
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Crafted for the Modern Man
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 animate-fade-up">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Twentiies is a contemporary menswear house rooted in Kigali, Rwanda — offering ready-to-wear and custom tailoring crafted with purpose, precision, and cultural identity.
              </p>
              
              <p className="text-xl font-heading text-charcoal font-medium italic">
                "Twentiies is not simply what is worn — it is what is expressed."
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Twentiies stands for the modern man who understands that style is a statement — a silent language of confidence, identity, and intention. Every piece is designed to carry aura, visibility and confidence.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                The journey began in 2016, with the discipline of learning to sew — a foundation built not only through practice, but through many struggles and resilient stories. The dream is now alive — Twentiies the Dream.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Luxury, at Twentiies, is defined by more than appearance. It is defined by how garments are made, how they last, neatness and precision. Through thoughtful design and select use of friendly fabric and cloth art, Twentiies commits to fashion that respects both people and planet.
              </p>
            </div>
            
            <div className="relative">
              <img src={brand1} alt="Twentiies Workshop" className="rounded-lg shadow-2xl animate-fade-up" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
            <p className="text-xl text-charcoal leading-relaxed">
              Twentiies creates for men who do not chase trends —
            </p>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>men who embody excellence,</p>
              <p>men who lead with quiet authority,</p>
              <p>men who dress with purpose.</p>
            </div>
            <div className="pt-8 space-y-2 text-charcoal font-heading text-xl">
              <p>This is not fast fashion.</p>
              <p>This is not ordinary tailoring.</p>
              <p className="font-semibold text-2xl pt-4">This is a new tradition.</p>
            </div>
            <p className="text-2xl font-heading font-semibold text-gold pt-8">
              Let's wear Twentiies.
            </p>
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
