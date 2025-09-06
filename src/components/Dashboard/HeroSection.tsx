import React from 'react';
import { Button } from '../ui/button';

interface HeroSectionProps {
  firstName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ firstName }) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              HEY ({firstName}_name)!<br />
              HERE'S WHAT'S HAPPENING<br />
              TODAY.
            </h1>
            <Button className="mt-6">
              VIEW REPORT
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="w-96 h-80 bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-orange-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-orange-400 rounded-full"></div>
                </div>
                <div className="w-24 h-16 bg-blue-300 rounded-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};