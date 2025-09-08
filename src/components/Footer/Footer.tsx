import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Grievance Form */}
    <div className="mb-12">
      <div className="flex items-center space-x-16">
        {/* Left Title */}
        <div>
          <h3 className="font-montserrat font-bold text-[18px] leading-[20px] text-[#484848]">
            Grievance/Feedback
          </h3>
          <p className="font-montserrat font-medium text-[14px] leading-[20px] text-[#484848]">
            Stay Upto Date
          </p>
        </div>

        {/* Input Field */}
        <div className="flex-1 max-w-3xl">
          <div className="relative">
            <input
              type="email"
              placeholder="Your Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] pl-6 pr-16 rounded-full border border-[#E8EAEC] bg-white font-montserrat font-medium text-[14px] text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button className="absolute right-0 top-0 w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#9A9A9A] hover:bg-gray-700 transition">
              <img src='/ph_paper-plane.svg'/>
              
            </button>
          </div>
        </div>
      </div>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="col-span-1">
            <div className="col-span-1 w-40 h-40 flex items-center justify-center">
              <img src="/logo_big.svg" alt="Quorium Consulting" className="w-full h-full object-contain" />
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