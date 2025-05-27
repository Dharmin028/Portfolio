import { 
  Code, 
  Database, 
  FileCode, 
  Github, 
  Globe, 
  Layout, 
  Server,
  Terminal,
  FileText,
  Box,
  Container,
  Cpu,
  Brain,
  BookOpen,
  MessageSquare,
  Monitor,
  GitBranch,
  Book,
  Cloud,
  Ship
} from "lucide-react";

interface SkillIconProps {
  name: string;
  icon: string;
}

const SkillIcon = ({ name, icon }: SkillIconProps) => {
  const getIcon = () => {
    switch (icon) {
      // Languages
      case "python":
        return <Code className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "cpp":
        return <Code className="h-8 w-8 text-blue-600 dark:text-blue-600" />;
      case "javascript":
        return <FileCode className="h-8 w-8 text-yellow-500 dark:text-yellow-500" />;
      case "html":
        return <Globe className="h-8 w-8 text-orange-500 dark:text-orange-500" />;
      case "css":
        return <Layout className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "bash":
        return <Terminal className="h-8 w-8 text-green-500 dark:text-green-500" />;

      // Databases
      case "mysql":
        return <Database className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "database":
        return <Database className="h-8 w-8 text-red-500 dark:text-red-500" />;

      // Tools
      case "vscode":
        return <Monitor className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "git":
        return <GitBranch className="h-8 w-8 text-orange-500 dark:text-orange-500" />;
      case "github":
        return <Github className="h-8 w-8 text-gray-700 dark:text-gray-300" />;
      case "jupyter":
        return <Book className="h-8 w-8 text-orange-500 dark:text-orange-500" />;
      case "colab":
        return <Cloud className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "docker":
        return <Ship className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "terminal":
        return <Terminal className="h-8 w-8 text-green-500 dark:text-green-500" />;

      // Frameworks & Libraries
      case "numpy":
        return <Box className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "pandas":
        return <FileText className="h-8 w-8 text-blue-500 dark:text-blue-500" />;
      case "tensorflow":
        return <Cpu className="h-8 w-8 text-orange-500 dark:text-orange-500" />;
      case "scikit":
        return <Brain className="h-8 w-8 text-orange-500 dark:text-orange-500" />;
      case "nltk":
        return <MessageSquare className="h-8 w-8 text-green-500 dark:text-green-500" />;
      case "huggingface":
        return <Brain className="h-8 w-8 text-yellow-500 dark:text-yellow-500" />;
      case "streamlit":
        return <Terminal className="h-8 w-8 text-red-500 dark:text-red-500" />;
      case "opencv":
        return <Container className="h-8 w-8 text-green-600 dark:text-green-600" />;
      default:
        return <Code className="h-8 w-8" />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:scale-110 group bg-card border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div className="p-4 rounded-full bg-background shadow-sm border border-border group-hover:border-primary group-hover:shadow-md hidden">
        {getIcon()}
      </div>
      {getIcon()}
      <span className="text-sm font-medium mt-2">{name}</span>
    </div>
  );
};

export default SkillIcon;