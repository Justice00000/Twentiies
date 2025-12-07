import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  product_sizes: { size: string; in_stock: boolean }[];
}

const categories = ["All", "Agbada", "Kaftan", "Senator", "Fabrics"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_sizes (size, in_stock)
      `)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-charcoal text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-gold font-medium tracking-widest uppercase text-sm">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-semibold mt-4 mb-6">
              Shop
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Curated pieces for the modern gentleman.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <Link key={product.id} to={`/shop/${product.id}`}>
                  <Card
                    className="group overflow-hidden border-0 shadow-none bg-transparent animate-fade-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                          <Badge variant="destructive" className="text-sm">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="px-0 pt-4">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-heading font-semibold text-lg mt-1">
                        {product.name}
                      </h3>
                      <p className="text-gold font-medium mt-1">
                        {formatPrice(product.price)}
                      </p>
                      {product.product_sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.product_sizes.map((size) => (
                            <Badge
                              key={size.size}
                              variant={size.in_stock ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {size.size}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
            Ready to Order?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Place your custom order with your measurements.
          </p>
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
