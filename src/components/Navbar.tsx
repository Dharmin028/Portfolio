import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeSection: string;
}

const Navbar = ({ activeSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* DR Logo link */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
          >
            DR
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "text-sm font-medium text-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-2",
                  activeSection === link.id
                    ? "text-primary font-semibold"
                    : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="md:hidden text-foreground border-border/50 hover:bg-primary/10 hover:border-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "block py-2.5 px-3 text-base font-medium rounded-md transition-colors border border-border/50",
                  activeSection === link.id
                    ? "text-primary font-semibold bg-primary/10 border-primary/20"
                    : "text-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/20"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;