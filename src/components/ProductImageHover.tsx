import { useState, useMemo } from "react";

interface ProductImageHoverProps {
  mainImage: string | null;
  additionalImages?: { image_url: string }[];
  alt: string;
  className?: string;
}

const ProductImageHover = ({ mainImage, additionalImages = [], alt, className = "" }: ProductImageHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverImage = useMemo(() => {
    if (additionalImages.length > 0) {
      return additionalImages[0].image_url;
    }
    return null;
  }, [additionalImages]);

  if (!mainImage) {
    return (
      <div className={`w-full h-full flex items-center justify-center text-muted-foreground text-xs bg-muted ${className}`}>
        No Image
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image */}
      <img
        src={mainImage}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
          isHovered && hoverImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      />
      {/* Hover image (back/side view) */}
      {hoverImage && (
        <img
          src={hoverImage}
          alt={`${alt} - alternate view`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      )}
    </div>
  );
};

export default ProductImageHover;
