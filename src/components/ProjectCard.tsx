import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink?: string;
  githubLink: string;
  index: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  demoLink,
  githubLink,
  index,
}: ProjectCardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Stagger the animations
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-700 transform h-full",
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 group"
      )}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {demoLink && (
              <Button size="sm" asChild>
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button size="sm" variant="outline" asChild>
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <Badge key={i} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;