import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Cart = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Your Selection
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Cart
            </h1>
          </div>
        </div>
      </section>

      {/* Empty Cart */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-md mx-auto text-center animate-fade-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-heading font-semibold mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Browse our services and place an order to get started.
            </p>
            <Link to="/services">
              <Button variant="hero" size="lg" className="group">
                Browse Services
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
