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

const FALLBACK_CATEGORY_IMAGES = [model1, model2, model3, model4];

interface Category {
  id: string;
  name: string;
}

interface SectionImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  section_id: string;
}

const Index = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sectionImages, setSectionImages] = useState<Record<string, SectionImage[]>>({});
  const [editorialImages, setEditorialImages] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const [productsRes, categoriesRes, sectionsRes, sectionImgsRes] = await Promise.all([
        supabase.from("products").select("id, name, category, price, currency, image_url, in_stock, product_images (id, image_url)").eq("is_trending", true).order("created_at", { ascending: false }).limit(4),
        supabase.from("categories").select("id, name").order("display_order"),
        supabase.from("site_sections").select("id, section_key"),
        supabase.from("section_images").select("id, image_url, alt_text, section_id").order("display_order"),
      ]);

      if (!productsRes.error && productsRes.data) setProducts(productsRes.data);

      if (!categoriesRes.error && categoriesRes.data) setCategories(categoriesRes.data);

      // Group section images by section_key
      if (!sectionsRes.error && sectionsRes.data && !sectionImgsRes.error && sectionImgsRes.data) {
        const keyMap: Record<string, string> = {};
        sectionsRes.data.forEach((s: any) => { keyMap[s.id] = s.section_key; });
        const grouped: Record<string, SectionImage[]> = {};
        sectionImgsRes.data.forEach((img: any) => {
          const key = keyMap[img.section_id];
          if (key) {
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(img);
          }
        });
        setSectionImages(grouped);

        // Set editorial images
        const editorial = grouped["editorial_grid"] || [];
        setEditorialImages(editorial.map((img) => img.image_url));

        // Set banner
        const banner = grouped["banner"] || [];
        if (banner.length > 0) setBannerImage(banner[0].image_url);
      }

      setIsLoading(false);
    };
    fetchAll();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "RWF" ? "RF " : "₦";
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative h-[88vh] md:h-screen bg-secondary overflow-hidden">
        <HeroSlideshow />
      </section>

      {/* ── 3-COLUMN EDITORIAL PHOTO GRID ── */}
      <section className="bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {(editorialImages.length > 0 ? editorialImages.slice(0, 4) : [model1, model2, model3]).slice(0, 4).map((img, i) => (
            <Link key={i} to="/shop" className="block overflow-hidden group relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src={img} alt={`Collection ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-500" />
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
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-foreground">Shop by Category</h2>
          </ScrollReveal>

          {(() => {
            const catImages = (sectionImages["category_tiles"] || []).slice(0, 4);
            return catImages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {catImages.map((img, i) => (
                  <ScrollReveal key={img.id} animation="fade-up" delay={i * 100}>
                    <Link to="/shop" className="group block">
                      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                        <img src={img.image_url} alt={img.alt_text || "Category"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                        <div className="absolute inset-0 bg-background/25 group-hover:bg-background/50 transition-all duration-500" />
                        {img.alt_text && (
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-foreground text-[11px] font-bold tracking-[0.3em] uppercase">{img.alt_text}</h3>
                          </div>
                        )}
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-sm">No categories yet. Add items via the Admin panel → Section Images → Category Tiles.</p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── TRENDING STOCK ── */}
      <section className="py-16 md:py-24 bg-secondary border-t border-border">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Most Popular</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-foreground">Trending Stock</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              Discover the most popular items everyone is buying right now.
            </p>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
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
                        <span className="bg-accent text-accent-foreground text-[9px] font-bold tracking-widest px-2 py-1 uppercase">Sale</span>
                      </div>
                      {/* Quick add */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-secondary transition-transform duration-300 ease-out z-10"
                        style={{ transform: hoveredProduct === product.id ? "translateY(0)" : "translateY(100%)" }}
                      >
                        <div className="w-full py-3 text-foreground text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                          <ShoppingCart size={12} /> Add to Cart
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-0.5">{product.category}</p>
                      <h3 className="text-sm font-semibold text-foreground font-heading leading-tight mb-1 truncate">{product.name}</h3>
                      <p className="text-sm font-bold text-foreground">{formatPrice(product.price, product.currency)}</p>
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
              className="inline-flex items-center gap-2 border border-foreground text-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
            >
              View All Products
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FULL-WIDTH BANNER ── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img src={bannerImage || model4} alt="Premium Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/75 flex flex-col items-center justify-center text-center px-4">
          <ScrollReveal animation="fade-up">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">Bespoke Tailoring</p>
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-foreground mb-8 max-w-2xl leading-tight">
              Crafted to Your Exact Measurements
            </h2>
            <Link to="/order" className="inline-block bg-gold text-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-gold/90 transition-colors duration-300">
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
            <h2 className="text-2xl md:text-4xl font-heading font-semibold text-foreground">How It Works</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
            {[
              { step: "01", title: "Choose Your Style", desc: "Browse our curated collection or bring your own design vision to life." },
              { step: "02", title: "Take Measurements", desc: "Visit us in Kigali or submit your measurements online for a perfect fit." },
              { step: "03", title: "Receive Your Order", desc: "Your garment is handcrafted with precision and delivered ready to wear." },
            ].map((item, i) => (
              <ScrollReveal key={item.step} animation="fade-up" delay={i * 150}>
                <div className="text-center">
                  <p className="text-7xl md:text-8xl font-heading font-extrabold text-foreground/10 mb-0 select-none leading-none">{item.step}</p>
                  <h3 className="text-xs md:text-sm font-heading font-bold tracking-[0.3em] uppercase text-foreground mt-2 mb-4">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-16 md:py-24 bg-secondary text-foreground text-center">
        <ScrollReveal animation="fade-up">
          <div className="container px-4">
            <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4">Get Started</p>
            <h2 className="text-2xl md:text-4xl font-heading font-semibold mb-8">Ready to Define Your Style?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order" className="inline-block bg-gold text-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:bg-gold/90 transition-colors duration-300">
                {t("orderNow")}
              </Link>
              <a
                href="https://wa.me/250792417246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-foreground/30 text-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-10 py-3.5 hover:border-gold hover:text-gold transition-all duration-300"
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
