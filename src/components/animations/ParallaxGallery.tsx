import { useEffect, useRef, useState } from "react";

interface ParallaxGalleryProps {
  images: string[];
  className?: string;
}

const ParallaxGallery = ({ images, className = "" }: ParallaxGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeScroll = -rect.top;
      setScrollY(relativeScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getParallaxStyle = (index: number) => {
    const speed = 0.1 + (index % 3) * 0.05;
    const translateY = scrollY * speed;
    const rotation = Math.sin(scrollY * 0.002 + index) * 3;
    
    return {
      transform: `translateY(${translateY}px) rotate(${rotation}deg)`,
    };
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg group"
            style={getParallaxStyle(index)}
          >
            <div className={`aspect-[3/4] ${index % 3 === 0 ? "md:aspect-[4/5]" : index % 2 === 0 ? "md:aspect-square" : "md:aspect-[3/4]"}`}>
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxGallery;
