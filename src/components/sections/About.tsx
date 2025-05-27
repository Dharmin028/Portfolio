import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, GraduationCap, MapPin } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#about");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-12 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">About Me</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-muted mx-auto w-full max-w-4xl">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                    {!imageError ? (
                      <img
                        src="/profile.jpg"
                        alt="Dharmin Rajkotiya"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <User className="w-24 h-24 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 text-center space-y-2">
                    <p className="font-medium text-lg flex items-center gap-2 justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      B.Tech at Charusat University
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2 justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                      Bhavnagar, Gujarat
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-2/3 space-y-4 text-center md:text-center">
                  <p className="text-lg">
                  Hi, I'm Dharmin Rajkotiya, Computer Science student driven by a deep interest in artificial intelligence and machine learning. My technical strengths lie in machine learning, computer vision, and natural language processing, all grounded in a solid understanding of data structures and algorithms, especially with Python.
                  </p>
                  <p className="text-lg">
                  I've earned an NPTEL certification in Deep Learning (2025), ranking in the top 5%, which deepened my understanding of neural networks and model optimization. I’ve also been an active participant in the Smart India Hackathon (SIH) in both 2023 and 2024, where I collaborated on innovative solutions to real-world challenges. Alongside this, I’ve solved 100+ problems on LeetCode, continuously working to enhance my problem-solving and coding abilities..
                  </p>
                  {/* <p className="text-lg font-medium italic">
                    Fun Fact: I once created a portfolio themed like a video game. Now I focus on clean and impactful design that showcases my work effectively.
                  </p> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;