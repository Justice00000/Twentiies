import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

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
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Twentiies is a distinguished contemporary menswear atelier headquartered in Kigali, Rwanda. We specialise in bespoke tailoring and curated ready-to-wear collections, each piece meticulously crafted with an unwavering commitment to precision, quality, and cultural authenticity.
            </p>
            
            <p className="text-xl font-heading text-charcoal font-medium italic border-l-4 border-gold pl-6">
              "At Twentiies, garments are not merely worn — they are expressions of identity, purpose, and distinction."
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our clientele comprises discerning gentlemen who recognise that exceptional style transcends fleeting trends. Each Twentiies creation is designed to embody sophistication, command presence, and articulate the wearer's unique narrative.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              Established in 2016, Twentiies was founded upon a foundation of disciplined craftsmanship and an unyielding pursuit of excellence. Through years of dedicated practice and continuous refinement, we have cultivated an atelier that delivers uncompromising quality in every stitch.
            </p>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              We define luxury not by ostentation, but by the integrity of our craft — the precision of our construction, the longevity of our garments, and our conscientious selection of premium fabrics. Twentiies remains committed to sustainable practices that honour both our craft and our environment.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
            <p className="text-xl text-charcoal leading-relaxed">
              Twentiies serves gentlemen of discernment —
            </p>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>those who embody excellence in all endeavours,</p>
              <p>those who lead with quiet authority and purpose,</p>
              <p>those who understand that attire is an extension of character.</p>
            </div>
            <div className="pt-8 space-y-2 text-charcoal font-heading text-xl">
              <p>This is not fast fashion.</p>
              <p>This is not ordinary tailoring.</p>
              <p className="font-semibold text-2xl pt-4">This is a new tradition.</p>
            </div>
            <p className="text-2xl font-heading font-semibold text-gold pt-8">
              Experience Twentiies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8 text-charcoal">
              Ready to Define Your Style?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="gold" size="lg" className="group">
                  View Services
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/order">
                <Button variant="outline" size="lg" className="text-charcoal border-charcoal hover:bg-charcoal hover:text-primary-foreground">
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
