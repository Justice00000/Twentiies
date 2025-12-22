import { useState, useEffect } from "react";

interface HeroSlideshowProps {
  images: string[];
  interval?: number;
}

const HeroSlideshow = ({ images, interval = 5000 }: HeroSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 flex">
      {/* Background that merges with charcoal */}
      <div className="absolute inset-0 bg-charcoal" />
      
      {/* Right side - images */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] flex items-center justify-center md:justify-end">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center md:justify-end transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Twentiies Tailored - Slide ${index + 1}`}
              className="h-[70%] md:h-[85%] w-auto object-contain pr-4 md:pr-8 lg:pr-16"
            />
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-gold w-8"
                  : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlideshow;
