import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Facebook, Instagram } from 'lucide-react';
import Logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 flex justify-center">
          <div className="flex items-center gap-8 max-w-2xl w-full">
            <div className="flex-shrink-0">
              <h3 className="font-semibold text-foreground mb-1">Grievance/Feedback</h3>
              <p className="text-sm text-muted-foreground">Stay Upto Date</p>
            </div>
            <div className="flex gap-2 flex-1">
              <Input 
                placeholder="Your Email..." 
                className="flex-1"
              />
              <Button size="icon" variant="default">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Legal Information</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">HELP CENTER</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Find a Room</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Why Us?</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Rental Guides</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">CONTACT INFO</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Phone: 1234567890</li>
              <li>Email: company@email.com</li>
              <li>Location: eafosefise</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;