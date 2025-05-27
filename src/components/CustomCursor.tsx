import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    // Only add mouse event listeners if not a touch device
    if (!isTouchDevice) {
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousemove', updateCursorState);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mousemove', updateCursorState);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 w-4 h-4 rounded-full bg-primary/50 pointer-events-none mix-blend-difference z-50 transition-transform duration-100 ease-out",
          isHidden && "opacity-0",
          isPointer && "scale-150"
        )}
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      />
      <div
        className={cn(
          "fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none mix-blend-difference z-50 transition-all duration-300 ease-out",
          isHidden && "opacity-0",
          isPointer && "scale-150"
        )}
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
        }}
      />
    </>
  );
};

export default CustomCursor; 