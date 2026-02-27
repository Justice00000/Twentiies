import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroMain from "@/assets/hero-main.jpg";
import model1 from "@/assets/model-1.png";
import model2 from "@/assets/model-2.png";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  display_order: number;
}

const FALLBACK_SLIDES = [
  {
    image: heroMain,
    tagline: "EACH SUIT IS CUT TO YOUR PRECISE MEASUREMENTS AND PERFECTED BY HAND.",
  },
  {
    image: model1,
    tagline: "CRAFTED FOR THE DISTINGUISHED GENTLEMAN.",
  },
  {
    image: model2,
    tagline: "WHERE TRADITION MEETS MODERN ELEGANCE.",
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      // Fetch hero section images from site_sections
      const { data: sections } = await supabase.from("site_sections").select("id").eq("section_key", "hero_slider").single();
      if (!sections) return;
      const { data, error } = await supabase
        .from("section_images")
        .select("id, image_url, alt_text, display_order")
        .eq("section_id", sections.id)
        .order("display_order", { ascending: true })
        .limit(5);

      if (!error && data && data.length > 0) {
        setSlides(
          data.map((img: any, i: number) => ({
            image: img.image_url,
            tagline: img.alt_text || FALLBACK_SLIDES[i % FALLBACK_SLIDES.length].tagline,
          }))
        );
      }
    };
    fetchImages();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>
      ))}

      {/* Text overlay bottom-left */}
      <div className="absolute bottom-16 left-8 md:left-16 max-w-sm z-10">
        <p
          className="text-foreground text-sm md:text-base font-medium tracking-widest uppercase leading-relaxed transition-all duration-500"
          key={current}
          style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
        >
          {slides[current]?.tagline}
        </p>
      </div>

      {/* Prev/Next Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-foreground hover:text-gold transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-foreground hover:text-gold transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-foreground/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
