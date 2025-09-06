import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Logo from '@/assets/logo.png';

const Header = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Quorium Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              Find a room
            </a>
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors font-medium">
              Reservations
            </a>
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              About
            </a>
          </nav>

          {/* User Profile */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;