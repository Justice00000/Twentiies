import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface FlowerBloomProps {
  fallbackImages?: string[];
  className?: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  display_order: number;
}

const FlowerBloom = ({ fallbackImages = [], className = "" }: FlowerBloomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        setDbImages(data);
      }
      setIsLoading(false);
    };

    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate progress based on element position
      const distanceFromCenter = elementCenter - viewportCenter;
      const maxDistance = windowHeight;
      
      // Progress from 0 (not in view) to 1 (centered)
      const progress = Math.max(0, Math.min(1, 1 - Math.abs(distanceFromCenter) / maxDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use database images if available, otherwise use fallback
  const images = dbImages.length > 0 
    ? dbImages.map(img => img.image_url) 
    : fallbackImages;

  // Don't render if no images
  if (!isLoading && images.length === 0) {
    return null;
  }

  const getTransform = (index: number, total: number) => {
    const angle = (index / total) * 360;
    const radians = (angle * Math.PI) / 180;
    const distance = scrollProgress * 150; // Max distance of 150px
    const rotation = scrollProgress * (index % 2 === 0 ? 15 : -15);
    
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;
    
    return {
      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${0.6 + scrollProgress * 0.4})`,
      opacity: 0.3 + scrollProgress * 0.7,
    };
  };

  return (
    <div ref={containerRef} className={`relative h-[600px] flex items-center justify-center ${className}`}>
      {/* Center image */}
      {images.length > 0 && (
        <div 
          className="absolute w-48 h-64 md:w-64 md:h-80 rounded-lg overflow-hidden shadow-2xl z-10 transition-all duration-300"
          style={{
            transform: `scale(${1 - scrollProgress * 0.2})`,
          }}
        >
          <img 
            src={images[0]} 
            alt="Center piece" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Blooming petals */}
      {images.slice(1).map((image, index) => (
        <div
          key={index}
          className="absolute w-40 h-52 md:w-52 md:h-72 rounded-lg overflow-hidden shadow-xl transition-all duration-500 ease-out"
          style={getTransform(index, images.length - 1)}
        >
          <img 
            src={image} 
            alt={`Petal ${index + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
        </div>
      ))}
    </div>
  );
};

export default FlowerBloom;
