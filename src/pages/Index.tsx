import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HeroSlideshow from "@/components/HeroSlideshow";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import model1 from "@/assets/model-1.png";
import model2 from "@/assets/model-2.png";
import model3 from "@/assets/model-3.png";
import model4 from "@/assets/model-4.png";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image_url: string | null;
  in_stock: boolean;
}

const CATEGORY_TILES = [
  { label: "AGBADA", image: model1, path: "/shop" },
  { label: "BUSINESS SUIT", image: model2, path: "/shop" },
  { label: "KAFTAN", image: model3, path: "/shop" },
  { label: "TUXEDO", image: model4, path: "/shop" },
];

const Index = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, category, price, currency, image_url, in_stock")
        .eq("in_stock", true)
        .order("created_at", { ascending: false })
        .limit(8);

      if (!error && data) setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "RWF" ? "RF " : "₦";
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <Layout>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative h-[85vh] md:h-screen bg-charcoal overflow-hidden">
        <HeroSlideshow />

        {/* Center CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <ScrollReveal animation="zoom-in" duration={1000}>
            <Link
              to="/shop"
              className="pointer-events-auto inline-block border border-primary-foreground/60 text-primary-foreground text-xs font-bold tracking-[0.3em] uppercase px-8 py-3 hover:bg-primary-foreground hover:text-charcoal transition-all duration-300"
            >
              Shop Now
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EDITORIAL PHOTO GRID (3-col like Empire) ── */}
      <section className="bg-background py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[model1, model2, model3].map((img, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 150} duration={900}>
              <Link to="/shop" className="block overflow-hidden group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={img}
                    alt={`Collection ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CATEGORY TILES ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Explore
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">
              Shop by Category
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORY_TILES.map((tile, i) => (
              <ScrollReveal key={tile.label} animation="fade-up" delay={i * 100}>
                <Link to={tile.path} className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    <img
                      src={tile.image}
                      alt={tile.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-primary-foreground text-xs font-bold tracking-[0.25em] uppercase">
                        {tile.label}
                      </h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING STOCK ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Most Popular
            </p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">
              Trending Stock
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              Discover the most popular items everyone is buying right now. Fresh, fast-selling, and customer-approved.
            </p>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} animation="fade-up" delay={i * 80}>
                  <Link to={`/shop/${product.id}`} className="group block">
                    <div className="relative overflow-hidden aspect-[3/4] bg-muted mb-3">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}

                      {/* Sale badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-charcoal text-primary-foreground text-[10px] font-bold tracking-wider px-2 py-1 uppercase">
                          Sale
                        </span>
                      </div>

                      {/* Quick add overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
                        <button className="w-full py-3 text-primary-foreground text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:text-gold transition-colors">
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-semibold text-charcoal font-heading leading-tight mb-1 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-charcoal">
                          {formatPrice(product.price, product.currency)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm">No products yet. Add products via the Admin panel.</p>
            </div>
          )}

          <ScrollReveal animation="fade-up" delay={200} className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-charcoal text-charcoal text-xs font-bold tracking-[0.25em] uppercase px-8 py-3 hover:bg-charcoal hover:text-primary-foreground transition-all duration-300 group"
            >
              View All Products
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FULL-WIDTH BANNER ─────────────────────────── */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={model4}
          alt="Premium Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60 flex flex-col items-center justify-center text-center px-4">
          <ScrollReveal animation="fade-up">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
              Bespoke Tailoring
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary-foreground mb-6 max-w-2xl">
              Crafted to Your Exact Measurements
            </h2>
            <Link
              to="/order"
              className="inline-block bg-gold text-charcoal text-xs font-bold tracking-[0.25em] uppercase px-8 py-3 hover:bg-gold/90 transition-colors"
            >
              Order Now
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">Process</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: "01", title: "Choose Your Style", desc: "Browse our curated collection or bring your own design vision." },
              { step: "02", title: "Take Measurements", desc: "Visit us in Kigali or submit your measurements online for a perfect fit." },
              { step: "03", title: "Receive Your Order", desc: "Your garment is handcrafted and delivered ready to wear." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} animation="fade-up" delay={i * 150}>
                <div className="text-center md:text-left">
                  <p className="text-5xl md:text-6xl font-heading font-bold text-charcoal/10 mb-2">{item.step}</p>
                  <h3 className="text-base font-heading font-semibold text-charcoal mb-2 -mt-4 md:-mt-6">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-charcoal text-primary-foreground text-center">
        <ScrollReveal animation="fade-up">
          <div className="container px-4">
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold mb-6">
              Ready to Define Your Style?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                className="inline-block bg-gold text-charcoal text-xs font-bold tracking-[0.25em] uppercase px-8 py-3 hover:bg-gold/90 transition-colors"
              >
                {t("orderNow")}
              </Link>
              <a
                href="https://wa.me/250792417246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-primary-foreground/40 text-primary-foreground text-xs font-bold tracking-[0.25em] uppercase px-8 py-3 hover:border-gold hover:text-gold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Index;
