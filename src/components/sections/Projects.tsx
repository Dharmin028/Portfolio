import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/lib/data";

const Projects = () => {
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

    const section = document.querySelector("#projects");
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-12 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Projects</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;