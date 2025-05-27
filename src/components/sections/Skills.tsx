import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import SkillIcon from "@/components/SkillIcon";

// Assuming you have or will add icons for categories like Code, Globe, Server, Database, Package
import { Code, Globe, Server, Database, Package, LayoutList } from "lucide-react";

const Skills = () => {
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

    const section = document.querySelector("#skills");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const skillCategories = [
    {
      name: "Languages",
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Python", icon: "python" },
        { name: "C++", icon: "cpp" },
        { name: "JavaScript", icon: "javascript" },
        { name: "HTML5", icon: "html" },
        { name: "CSS3", icon: "css" },
        { name: "Bash", icon: "bash" },
      ]
    },
    {
      name: "Databases",
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: [
        { name: "MySQL", icon: "mysql" },
        { name: "Oracle", icon: "database" },
      ]
    },
    {
      name: "Tools",
      icon: <Package className="h-6 w-6 text-primary" />,
      skills: [
        { name: "VS Code", icon: "vscode" },
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Jupyter", icon: "jupyter" },
        { name: "Colab", icon: "colab" },
        { name: "Docker", icon: "docker" },
        { name: "Linux", icon: "terminal" },
      ]
    },
    {
      name: "Libraries & Frameworks",
      icon: <LayoutList className="h-6 w-6 text-primary" />,
      skills: [
        { name: "NumPy", icon: "numpy" },
        { name: "Pandas", icon: "pandas" },
        { name: "TensorFlow", icon: "tensorflow" },
        { name: "Scikit-learn", icon: "scikit" },
        { name: "NLTK", icon: "nltk" },
        { name: "Hugging Face", icon: "huggingface" },
        { name: "Streamlit", icon: "streamlit" },
        { name: "OpenCV", icon: "opencv" },
      ]
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-12 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Skills</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 sm:px-6 lg:px-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="p-6 space-y-6 border border-primary">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillIcon key={skillIndex} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;