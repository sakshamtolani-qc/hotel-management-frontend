import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grievance Form */}
        <div className="mb-12">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="font-semibold text-gray-900">Grievance/Feedback</h3>
              <p className="text-sm text-gray-600">Stay Upto Date</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="Quorium Consulting" className="w-12 h-12" />
              <div>
                <div className="text-xl font-bold text-gray-900">QUORIUM</div>
                <div className="text-sm text-gray-600">CONSULTING</div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">COMPANY</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button className="hover:text-gray-900 transition-colors">About Us</button></li>
              <li><button className="hover:text-gray-900 transition-colors">Legal Information</button></li>
              <li><button className="hover:text-gray-900 transition-colors">Contact Us</button></li>
              <li><button className="hover:text-gray-900 transition-colors">Blogs</button></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">HELP CENTER</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button className="hover:text-gray-900 transition-colors">Find a Room</button></li>
              <li><button className="hover:text-gray-900 transition-colors">Why Us?</button></li>
              <li><button className="hover:text-gray-900 transition-colors">FAQs</button></li>
              <li><button className="hover:text-gray-900 transition-colors">Rental Guides</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">CONTACT INFO</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Phone: 1234567890</p>
              <p>Email: company@email.com</p>
              <p>Location: eafoodsice</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};