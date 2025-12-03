import { Link } from "react-router-dom";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emmanuel K.",
      role: "Business Executive",
      content: "Twentiies transformed how I dress for important meetings. The fit is impeccable, and I always receive compliments. True craftsmanship.",
      rating: 5,
    },
    {
      name: "David M.",
      role: "Groom",
      content: "My wedding agbada was absolutely stunning. The team understood my vision perfectly and delivered beyond expectations. My wife and guests couldn't stop talking about it.",
      rating: 5,
    },
    {
      name: "Patrick N.",
      role: "Entrepreneur",
      content: "Quality fabrics, perfect cuts, and attention to detail. Twentiies has become my go-to for all special occasions. Highly recommend!",
      rating: 5,
    },
    {
      name: "Samuel A.",
      role: "Corporate Client",
      content: "We ordered uniforms for our team and the results were outstanding. Professional, timely, and the quality speaks for itself.",
      rating: 5,
    },
    {
      name: "Joseph T.",
      role: "Regular Client",
      content: "I've been a client for over a year now. Every piece I've gotten has been perfect. The consultation process is thorough and the results are always amazing.",
      rating: 5,
    },
    {
      name: "Michael R.",
      role: "First-time Client",
      content: "Was skeptical at first but after receiving my kaftan, I'm completely sold. The quality and fit exceeded my expectations. Already planning my next order.",
      rating: 5,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Testimonials
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              What Our Clients Say
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Real stories from men who've experienced the Twentiies difference.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg bg-card border border-border hover:border-gold/30 transition-all duration-300 relative animate-fade-up stagger-${(index % 5) + 1}`}
              >
                <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-heading font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-up">
              <p className="text-5xl md:text-6xl font-heading font-bold text-charcoal">500+</p>
              <p className="text-muted-foreground mt-2">Happy Clients</p>
            </div>
            <div className="animate-fade-up stagger-2">
              <p className="text-5xl md:text-6xl font-heading font-bold text-charcoal">1000+</p>
              <p className="text-muted-foreground mt-2">Pieces Crafted</p>
            </div>
            <div className="animate-fade-up stagger-3">
              <p className="text-5xl md:text-6xl font-heading font-bold text-charcoal">100%</p>
              <p className="text-muted-foreground mt-2">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
              Join Our Growing Family
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Experience the Twentiies difference for yourself. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button variant="gold" size="lg" className="group">
                  Place Your Order
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="hero-outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
