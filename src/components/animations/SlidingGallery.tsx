import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SlidingGalleryProps {
  fallbackImages?: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  title: string | null;
  display_order: number;
}

const SlidingGallery = ({ 
  fallbackImages = [], 
  direction = "left", 
  speed = 30,
  className = "" 
}: SlidingGalleryProps) => {
  const [isPaused, setIsPaused] = useState(false);
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

  // Use database images if available, otherwise use fallback
  const images = dbImages.length > 0 
    ? dbImages.map(img => img.image_url) 
    : fallbackImages;

  // Don't render if no images
  if (!isLoading && images.length === 0) {
    return null;
  }

  // Double the images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-4 ${direction === "left" ? "animate-slide-left" : "animate-slide-right"}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 md:w-80 h-80 md:h-96 rounded-lg overflow-hidden group"
          >
            <img
              src={image}
              alt={`Sliding gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingGallery;
