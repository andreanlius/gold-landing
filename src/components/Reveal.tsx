import { useState, useEffect, useRef, type ReactNode } from 'react';

// Custom Hook for Scroll Reveal Animation
export const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return [domRef, isVisible] as const;
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'zoom';
}

export const Reveal = ({ children, className = "", delay = 0, direction = "up" }: RevealProps) => {
  const [ref, isVisible] = useScrollReveal();
  
  const getDirectionClass = () => {
    switch(direction) {
      case "left": return isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0";
      case "right": return isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0";
      case "zoom": return isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0";
      default: return isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1200ms] cubic-bezier(0.21, 0.45, 0.32, 0.9) ${getDirectionClass()}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
