import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-full hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-yellow-400 transition-all dark:rotate-0 dark:scale-100 pointer-events-none"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-gray-100 transition-all dark:-rotate-90 dark:scale-0 pointer-events-none hover:text-gray-900"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}