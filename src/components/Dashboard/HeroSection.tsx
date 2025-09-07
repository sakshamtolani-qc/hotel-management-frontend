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
          <div className=" w-[700px]">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              HEY {firstName}!<br />
              HERE'S WHAT'S HAPPENING<br />
              TODAY.
            </h1>
            <Button className="mt-6">
              VIEW REPORT
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <img src='/Greetings.svg'/>
            
          </div>
        </div>
      </div>
    </section>
  );
};