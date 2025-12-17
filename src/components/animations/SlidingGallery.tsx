import { useEffect, useState } from "react";

interface SlidingGalleryProps {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const SlidingGallery = ({ 
  images, 
  direction = "left", 
  speed = 30,
  className = "" 
}: SlidingGalleryProps) => {
  const [isPaused, setIsPaused] = useState(false);
  
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
