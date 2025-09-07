import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { User, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center space-x-2">
            <img src="/logo2.svg" alt="Quorium Consulting" className="logo" />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex space-x-8">
            <button 
              onClick={() => navigateTo('/dashboard')}
              className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
            >
              Hotel Analytics
            </button>
            <button 
              onClick={() => navigateTo('/dashboard')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('/api/reservations')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Employee's list
            </button>
          </nav>
        </div>
        
         {/* User Avatar - Desktop */}
       <div className="hidden lg:flex items-center">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-50">
            <nav className="flex flex-col space-y-4 px-6 py-4">
              <button 
                onClick={() => {
                  navigateTo('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-900 font-medium hover:text-gray-600 transition-colors text-left"
              >
                Hotel Analytics
              </button>
              <button 
                onClick={() => {
                  navigateTo('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  navigateTo('/api/reservations');
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors text-left"
              >
                Employee's list
              </button>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-600">Profile</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};