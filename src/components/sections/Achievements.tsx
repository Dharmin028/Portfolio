import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Award, Code, FileText, Medal } from "lucide-react";
import { achievementsData } from "@/lib/data";

const Achievements = () => {
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

    const section = document.querySelector("#achievements");
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
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
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
                <h2 className="text-3xl font-bold text-primary">Achievements</h2>
                <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full">
                {achievementsData.map((achievement, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 h-full">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary">
                            {achievement.icon === "award" && <Award className="h-6 w-6" />}
                            {achievement.icon === "code" && <Code className="h-6 w-6" />}
                            {achievement.icon === "medal" && <Medal className="h-6 w-6" />}
                            {achievement.icon === "file" && <FileText className="h-6 w-6" />}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">{achievement.title}</h3>
                            <p className="text-muted-foreground text-sm">{achievement.description}</p>
                            <Badge variant="outline">{achievement.date}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{achievement.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <p>{achievement.fullDescription}</p>
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline block mt-2"
                          >
                            View Certificate / Details
                          </a>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Achievements;