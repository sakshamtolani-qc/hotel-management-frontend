import { useState } from "react";
import { Button } from "@/utils/button";
import { Menu, User } from "lucide-react";
import Logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={Logo}
            alt="Quorium Consulting" 
            className="h-20 w-auto"
          />
        </div>

        {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-foreground hover:text-hotel-warm transition-colors">
              Find a room
            </a>
            <a href="/reservations" className="text-foreground hover:text-hotel-warm transition-colors">
              Reservations
            </a>
            <a href="#" className="text-foreground hover:text-hotel-warm transition-colors">
              About
            </a>
          </nav>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <a href="/" className="block py-2 text-foreground hover:text-hotel-warm transition-colors">
              Find a room
            </a>
            <a href="/reservations" className="block py-2 text-foreground hover:text-hotel-warm transition-colors">
              Reservations
            </a>
            <a href="#" className="block py-2 text-foreground hover:text-hotel-warm transition-colors">
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;