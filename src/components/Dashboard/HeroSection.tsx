import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../utils/button';

interface HeroSectionProps {
  firstName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ firstName }) => {
  const navigate = useNavigate();

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
            <div className="flex gap-4 mt-6">
              <Button onClick={() => navigate('/rooms')}>
                VIEW ROOMS
              </Button>
              <Button variant="outline" onClick={() => navigate('/reservations')}>
                VIEW RESERVATIONS
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <img src='/Greetings.svg'/>
            
          </div>
        </div>
      </div>
    </section>
  );
};