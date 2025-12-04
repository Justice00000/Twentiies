import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

import galleryImg1 from "@/assets/gallery-1.jpg";
import galleryImg2 from "@/assets/gallery-2.jpg";
import galleryImg3 from "@/assets/gallery-3.jpg";
import fabricsImg from "@/assets/fabrics.jpg";

const categories = ["All", "Agbada", "Kaftan", "Senator", "Fabrics"];

const products = [
  {
    id: 1,
    name: "Classic Agbada Set",
    category: "Agbada",
    price: "₦185,000",
    image: galleryImg1,
  },
  {
    id: 2,
    name: "Modern Kaftan",
    category: "Kaftan",
    price: "₦95,000",
    image: galleryImg2,
  },
  {
    id: 3,
    name: "Senator Ensemble",
    category: "Senator",
    price: "₦120,000",
    image: galleryImg3,
  },
  {
    id: 4,
    name: "Premium Fabric Bundle",
    category: "Fabrics",
    price: "₦45,000",
    image: fabricsImg,
  },
  {
    id: 5,
    name: "Royal Agbada",
    category: "Agbada",
    price: "₦220,000",
    image: galleryImg2,
  },
  {
    id: 6,
    name: "Embroidered Kaftan",
    category: "Kaftan",
    price: "₦110,000",
    image: galleryImg1,
  },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-none bg-transparent animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="px-0 pt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-semibold text-lg mt-1">
                    {product.name}
                  </h3>
                  <p className="text-gold font-medium mt-1">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
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
