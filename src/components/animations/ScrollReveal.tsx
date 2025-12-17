import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "zoom-in" 
  | "zoom-out"
  | "flip-up"
  | "flip-left"
  | "rotate-in"
  | "slide-up"
  | "slide-down"
  | "bounce-in";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animations: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-16",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-16",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-16",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-16",
    animate: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    initial: "opacity-0 scale-50",
    animate: "opacity-100 scale-100",
  },
  "zoom-out": {
    initial: "opacity-0 scale-150",
    animate: "opacity-100 scale-100",
  },
  "flip-up": {
    initial: "opacity-0 rotateX-90",
    animate: "opacity-100 rotateX-0",
  },
  "flip-left": {
    initial: "opacity-0 rotateY-90",
    animate: "opacity-100 rotateY-0",
  },
  "rotate-in": {
    initial: "opacity-0 rotate-180 scale-50",
    animate: "opacity-100 rotate-0 scale-100",
  },
  "slide-up": {
    initial: "translate-y-full",
    animate: "translate-y-0",
  },
  "slide-down": {
    initial: "-translate-y-full",
    animate: "translate-y-0",
  },
  "bounce-in": {
    initial: "opacity-0 scale-0",
    animate: "opacity-100 scale-100",
  },
};

const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset for re-animation on scroll back
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const { initial, animate } = animations[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ${isVisible ? animate : initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: animation === "bounce-in" ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
