import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import brand1 from "@/assets/brand-1.jpg";
import brand2 from "@/assets/brand-2.jpg";
import brand3 from "@/assets/brand-3.jpg";
import heroImage from "@/assets/hero-main.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const images = [
    { src: heroImage, category: "kaftan", title: "Black Kaftan with Gold Embroidery" },
    { src: gallery1, category: "agbada", title: "Brown Agbada Set" },
    { src: gallery2, category: "kaftan", title: "White Kaftan with Gold Details" },
    { src: gallery3, category: "trousers", title: "Contemporary Business Style" },
    { src: brand1, category: "kaftan", title: "Signature Black Collection" },
    { src: brand2, category: "traditional", title: "Modern Traditional Wear" },
    { src: brand3, category: "agbada", title: "Premium Agbada Design" },
  ];

  const filters = ["all", "kaftan", "agbada", "traditional", "trousers"];

  const filteredImages = activeFilter === "all" 
    ? images 
    : images.filter(img => img.category === activeFilter);

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
              Style Gallery
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Browse our lookbook and discover the craftsmanship behind every Twentiies creation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 capitalize ${
                  activeFilter === filter
                    ? "bg-charcoal text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-charcoal/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image.src)}
                className={`relative overflow-hidden rounded-lg group cursor-pointer animate-fade-up stagger-${(index % 5) + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-gold text-xs uppercase tracking-widest">
                      {image.category}
                    </span>
                    <h3 className="text-primary-foreground font-heading text-lg mt-1">
                      {image.title}
                    </h3>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-primary-foreground" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-h-[85vh] max-w-full object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* CTA */}
      <section className="py-24 bg-cream">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6 text-charcoal">
              Like What You See?
            </h2>
            <p className="text-lg text-charcoal/70 mb-8">
              Get your own custom piece crafted by Twentiies Tailored.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/order">
                <Button variant="hero" size="lg" className="group">
                  Order Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://instagram.com/Twentiies_Tailored"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Follow on Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
