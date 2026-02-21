import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import HeroSlideshow from "@/components/HeroSlideshow";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ProductImageHover from "@/components/ProductImageHover";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
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
  product_images: { id: string; image_url: string }[];
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
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, category, price, currency, image_url, in_stock, product_images (id, image_url)")
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
      {/* ── HERO ── */}
      <section className="relative h-[88vh] md:h-screen bg-charcoal overflow-hidden">
        <HeroSlideshow />
      </section>

      {/* ── 3-COLUMN EDITORIAL PHOTO GRID ── */}
      <section className="bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[model1, model2, model3].map((img, i) => (
            <Link key={i} to="/shop" className="block overflow-hidden group relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={img} alt={`Collection ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Explore</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">Shop by Category</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {CATEGORY_TILES.map((tile, i) => (
              <ScrollReveal key={tile.label} animation="fade-up" delay={i * 100}>
                <Link to={tile.path} className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    <img src={tile.image} alt={tile.label} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-charcoal/25 group-hover:bg-charcoal/50 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-primary-foreground text-[11px] font-bold tracking-[0.3em] uppercase">{tile.label}</h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING STOCK ── */}
      <section className="py-16 md:py-24 bg-cream border-t border-charcoal/10">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Most Popular</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">Trending Stock</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              Discover the most popular items everyone is buying right now.
            </p>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} animation="fade-up" delay={i * 80}>
                  <Link
                    to={`/shop/${product.id}`}
                    className="group block"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative overflow-hidden aspect-[3/4] bg-muted mb-3">
                      <ProductImageHover
                        mainImage={product.image_url}
                        additionalImages={product.product_images}
                        alt={product.name}
                      />
                      {/* Sale badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-charcoal text-primary-foreground text-[9px] font-bold tracking-widest px-2 py-1 uppercase">Sale</span>
                      </div>
                      {/* Quick add */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-charcoal transition-transform duration-300 ease-out z-10"
                        style={{ transform: hoveredProduct === product.id ? "translateY(0)" : "translateY(100%)" }}
                      >
                        <div className="w-full py-3 text-primary-foreground text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                          <ShoppingCart size={12} /> Add to Cart
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-0.5">{product.category}</p>
                      <h3 className="text-sm font-semibold text-charcoal font-heading leading-tight mb-1 truncate">{product.name}</h3>
                      <p className="text-sm font-bold text-charcoal">{formatPrice(product.price, product.currency)}</p>
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
              className="inline-flex items-center gap-2 border border-charcoal text-charcoal text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-charcoal hover:text-primary-foreground transition-all duration-300 group"
            >
              View All Products
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FULL-WIDTH BANNER ── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src={model4} alt="Premium Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/65 flex flex-col items-center justify-center text-center px-4">
          <ScrollReveal animation="fade-up">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">Bespoke Tailoring</p>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary-foreground mb-8 max-w-2xl leading-tight">
              Crafted to Your Exact Measurements
            </h2>
            <Link to="/order" className="inline-block bg-gold text-charcoal text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-gold/90 transition-colors duration-300">
              Order Now
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Process</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-charcoal">How It Works</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
            {[
              { step: "01", title: "Choose Your Style", desc: "Browse our curated collection or bring your own design vision to life." },
              { step: "02", title: "Take Measurements", desc: "Visit us in Kigali or submit your measurements online for a perfect fit." },
              { step: "03", title: "Receive Your Order", desc: "Your garment is handcrafted with precision and delivered ready to wear." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} animation="fade-up" delay={i * 150}>
                <div className="text-center">
                  <p className="text-6xl md:text-7xl font-heading font-bold text-charcoal/8 mb-2 select-none">{item.step}</p>
                  <h3 className="text-sm font-heading font-bold tracking-widest uppercase text-charcoal mb-3 -mt-5 md:-mt-7">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-16 md:py-24 bg-charcoal text-primary-foreground text-center">
        <ScrollReveal animation="fade-up">
          <div className="container px-4">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold mb-8">Ready to Define Your Style?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order" className="inline-block bg-gold text-charcoal text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-gold/90 transition-colors duration-300">
                {t("orderNow")}
              </Link>
              <a
                href="https://wa.me/250792417246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-primary-foreground/30 text-primary-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:border-gold hover:text-gold transition-all duration-300"
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
