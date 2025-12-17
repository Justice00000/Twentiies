import ScrollReveal from "./ScrollReveal";

interface MasonryGalleryProps {
  images: string[];
  className?: string;
}

const animations = [
  "fade-up",
  "fade-left",
  "fade-right",
  "zoom-in",
  "rotate-in",
  "bounce-in",
] as const;

const MasonryGallery = ({ images, className = "" }: MasonryGalleryProps) => {
  return (
    <div className={`columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 ${className}`}>
      {images.map((image, index) => (
        <ScrollReveal
          key={index}
          animation={animations[index % animations.length]}
          delay={index * 100}
          duration={800}
        >
          <div className="break-inside-avoid group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Masonry ${index + 1}`}
                className="w-full h-auto transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="h-0.5 w-12 bg-gold mb-2" />
                <p className="text-primary-foreground text-sm font-medium">View Collection</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
};

export default MasonryGallery;
