import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Facebook, Instagram } from "lucide-react";
import Logo from "../assets/logo.jpg";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-hotel-neutral border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-1 text-foreground">Grievance/Feedback</h3>
              <p className="text-muted-foreground text-sm">Stay Upto Date</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                  type="email"
                  placeholder="Your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64 mr-2"
                />
                <Button 
                  type="submit" 
                  className="bg-hotel-dark hover:bg-hotel-dark/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div>
              <img 
                src={Logo}
                alt="Quorium Consulting" 
                style={{ height: '130px', width: 'auto' }} 
              />
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">COMPANY</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-hotel-warm transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Legal Information</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Blogs</a></li>
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">HELP CENTER</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Find a Room</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Why Us?</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-hotel-warm transition-colors">Rental Guides</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">CONTACT INFO</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Phone: 1234567890</li>
                <li>Email: company@email.com</li>
                <li>Location: eafosefise</li>
              </ul>
              <div className="flex space-x-3 mt-4">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-hotel-warm cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-hotel-warm cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;