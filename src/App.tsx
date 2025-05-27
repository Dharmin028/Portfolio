import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useEffect, useRef, useState } from 'react';

function App() {
  // Custom cursor logic
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      if (dotRef.current) dotRef.current.classList.add('clicking');
      if (ringRef.current) ringRef.current.classList.add('clicking');
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      if (dotRef.current) dotRef.current.classList.remove('clicking');
      if (ringRef.current) ringRef.current.classList.remove('clicking');
    };

    document.body.classList.add('custom-cursor');
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.left = `${cursor.x}px`;
      dotRef.current.style.top = `${cursor.y}px`;
    }
    if (ringRef.current) {
      // Add smooth movement to the ring
      ringRef.current.style.left = `${cursor.x}px`;
      ringRef.current.style.top = `${cursor.y}px`;
    }
  }, [cursor]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-preference">
      <CustomCursor />
      <div className="min-h-screen w-full">
        {/* Custom Cursor */}
        <div ref={ringRef} className="cursor-ring" />
        <div ref={dotRef} className="cursor-dot" />
        <Navbar />
        <main className="w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;