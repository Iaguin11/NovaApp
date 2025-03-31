
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { user, isAuthenticated, logout} = useAuth()
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout()
    toast.success("Sessão encerrada com sucesso.")
    navigate("/")
  }

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Listas", path: "/shopping-lists" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "py-2 bg-background/80 backdrop-blur-md border-b" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-gradient"
        >
          MentorLista
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link to="/dashboard" className="flex items-center space-x-2">
                    <User className="h-4 w-4"/>
                    <span>{user?.name}</span>
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="ghost" size="icon">
                  <LogOut className="h-4 w-4"/>
                </Button>
              </div>
             ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b shadow-lg animate-slideDown">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                    location.pathname === link.path ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <User className="h-4 w-" />
                      <span>{user?.name}</span>
                    </Link>
                  </Button>
                  <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4"/>
                    <span>Sair</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Button asChild variant="outline">
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Cadastrar</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
