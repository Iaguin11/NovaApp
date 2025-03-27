
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation: "fadeIn" | "slideUp" | "slideDown" | "slideInRight" | "slideInLeft";
  delay?: number;
  className?: string;
}

export function AnimatedContainer({ 
  children, 
  animation, 
  delay = 0, 
  className 
}: AnimatedContainerProps) {
  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case "fadeIn":
        return "animate-fadeIn";
      case "slideUp":
        return "animate-slideUp";
      case "slideDown":
        return "animate-slideDown";
      case "slideInRight":
        return "animate-slideInRight";
      case "slideInLeft":
        return "animate-slideInLeft";
      default:
        return "animate-fadeIn";
    }
  };

  return (
    <div 
      className={cn(getAnimationClass(animation), className)}
      style={{ 
        animationDelay: `${delay}ms`,
        opacity: 0, // Start invisible
        animationFillMode: "forwards" // Keep the end state
      }}
    >
      {children}
    </div>
  );
}

// Staggered animation for lists
export function StaggeredList({ 
  children, 
  animation = "slideUp", 
  baseDelay = 100, 
  staggerAmount = 50 
}: {
  children: React.ReactNode[];
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideInRight" | "slideInLeft";
  baseDelay?: number;
  staggerAmount?: number;
}) {
  return (
    <>
      {children.map((child, index) => (
        <AnimatedContainer 
          key={index}
          animation={animation}
          delay={baseDelay + (index * staggerAmount)}
        >
          {child}
        </AnimatedContainer>
      ))}
    </>
  );
}
