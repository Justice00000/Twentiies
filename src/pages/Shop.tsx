import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import ProductImageHover from "@/components/ProductImageHover";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image_url: string | null;
  in_stock: boolean;
  product_sizes: { size: string; in_stock: boolean }[];
  product_images: { id: string; image_url: string }[];
}

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("name").order("display_order");
    if (data) setCategories(["All", ...data.map((c) => c.name)]);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`*, product_sizes (size, in_stock), product_images (id, image_url)`)
      .order("created_at", { ascending: false });
    if (!error && data) setProducts(data);
    setIsLoading(false);
  };

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const formatPrice = (price: number, currency: string) => {
    const symbol = currency === "RWF" ? "RWF " : "₦";
    return `${symbol}${price.toLocaleString()}`;
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/shop/${product.id}`);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-charcoal text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">Our Collection</span>
            <h1 className="text-3xl md:text-6xl font-heading font-semibold mt-3 md:mt-4 mb-4 md:mb-6">Shop</h1>
            <p className="text-base md:text-lg text-primary-foreground/80">Curated pieces for the modern gentleman.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-3 md:py-6 border-b border-border bg-background sticky top-[100px] md:top-[108px] z-40">
        <div className="container px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-16 bg-background">
        <div className="container px-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.id}`}
                  className="group block animate-fade-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    <ProductImageHover
                      mainImage={product.image_url}
                      additionalImages={product.product_images}
                      alt={product.name}
                    />
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center z-10">
                        <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                      </div>
                    )}
                    {/* Add to Cart overlay */}
                    {product.in_stock && (
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-charcoal z-10">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full py-3 text-primary-foreground text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={12} />
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="pt-3 md:pt-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-heading font-semibold text-sm md:text-base mt-1 truncate">{product.name}</h3>
                    <p className="text-gold font-medium mt-1 text-sm md:text-base">
                      {formatPrice(product.price, product.currency)}
                    </p>
                    {product.product_sizes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.product_sizes.slice(0, 4).map((size) => (
                          <Badge key={size.size} variant={size.in_stock ? "secondary" : "outline"} className="text-xs px-1.5 py-0.5">
                            {size.size}
                          </Badge>
                        ))}
                        {product.product_sizes.length > 4 && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">+{product.product_sizes.length - 4}</Badge>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-12 md:py-16">
              <p className="text-muted-foreground">No products in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="container text-center px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold mb-4">Ready to Order?</h2>
          <p className="text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">Place your custom order with your measurements.</p>
          <Link to="/order">
            <Button variant="hero" size="lg" className="group">
              Place Order
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
