import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center w-full h-full min-h-[70vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-4 sm:space-y-6 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="text-base sm:text-lg md:text-2xl font-mono text-foreground/80 tracking-wider mb-2">
              Hello, I&apos;m
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-center">
              <span className="flex items-center justify-center mb-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 leading-[1.3]">
                  Dharmin Rajkotiya
                </span>
                <span className="animate-wave text-4xl sm:text-5xl ml-2">👋</span>
              </span>
              <span className="block text-foreground text-3xl sm:text-4xl md:text-5xl">
                I design intelligent &amp;
                <br className="hidden sm:block" /> creative solutions.
              </span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl text-center mt-2 px-4 sm:px-0">
            An AI/ML Engineer with a passion for crafting user-friendly interfaces and building data-driven applications.
            <br className="hidden sm:block" />
            I love blending art, technology, and machine learning to solve real-world problems and deliver impactful solutions.
          </p>
        </div>
      </div>
      {/* Custom cursor will be added globally */}
    </section>
  );
};

export default Hero;
