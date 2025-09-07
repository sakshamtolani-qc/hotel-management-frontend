import React from 'react';

export const MiniChart: React.FC = () => {
  return (
    <div className="w-full h-12">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <path
          d="M5,30 Q15,35 25,25 T45,20 T65,15 T85,10"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          className="opacity-80"
        />
      </svg>
    </div>
  );
};