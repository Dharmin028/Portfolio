import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.querySelector("#resume");
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
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-12 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          {isVisible && (
            <>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary">Resume</h2>
                <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
              </div>

              <Card className="overflow-hidden mx-auto w-full max-w-2xl">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] w-full bg-muted flex items-center justify-center">
                    <div className="text-center p-8 space-y-4 w-full">
                      <FileText className="h-20 w-20 mx-auto text-muted-foreground" />
                      <h3 className="text-xl font-medium">Resume Preview</h3>
                      <p className="text-muted-foreground">
                        View or download my complete resume with all details about my education, experience, and skills.
                      </p>
                      <Button asChild className="gap-2">
                        <a href="/resume.jpg" download="Dharmin_Rajkotiya_Resume.jpg">
                          Download Resume
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resume;