import React from 'react';
import "./Loader.css"

// Enhanced Main Loader Component
const Loader = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  showText = true,
  variant = 'default' // 'default', 'dots', 'pulse', 'bars', 'hotel'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center p-4';

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full animate-bounce"
                style={{
                  backgroundColor: '#212121',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className="relative">
            <div 
              className={`${sizeClasses[size]} rounded-full animate-ping absolute`}
              style={{ backgroundColor: '#EFF0F2' }}
            />
            <div 
              className={`${sizeClasses[size]} rounded-full animate-pulse`}
              style={{ backgroundColor: '#212121' }}
            />
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="w-2 bg-gray-800 rounded-t animate-pulse"
                style={{
                  height: `${20 + Math.sin(index) * 10}px`,
                  backgroundColor: '#212121',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: `${0.6 + index * 0.1}s`
                }}
              />
            ))}
          </div>
        );

      case 'hotel':
        return (
          <div className="relative">
            {/* Building/Hotel icon loader */}
            <div className="relative">
              <svg 
                className={`${sizeClasses[size]} animate-pulse`}
                viewBox="0 0 24 24" 
                fill="none"
                style={{ color: '#212121' }}
              >
                <path 
                  d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
              </svg>
              {/* Animated dots around the building */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                <div 
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2"
                  style={{ backgroundColor: '#484848' }}
                />
                <div 
                  className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2"
                  style={{ backgroundColor: '#484848' }}
                />
                <div 
                  className="absolute left-0 top-1/2 w-2 h-2 rounded-full transform -translate-y-1/2"
                  style={{ backgroundColor: '#484848' }}
                />
                <div 
                  className="absolute right-0 top-1/2 w-2 h-2 rounded-full transform -translate-y-1/2"
                  style={{ backgroundColor: '#484848' }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            {/* Outer spinning ring */}
            <div 
              className={`${sizeClasses[size]} rounded-full border-4 animate-spin`}
              style={{
                borderColor: '#EFF0F2',
                borderTopColor: '#212121',
                animationDuration: '1s'
              }}
            />
            {/* Inner counter-rotating ring */}
            <div 
              className="absolute inset-2 rounded-full border-2 animate-spin"
              style={{
                borderColor: 'transparent',
                borderRightColor: '#484848',
                animationDirection: 'reverse',
                animationDuration: '1.5s'
              }}
            />
            {/* Center dot */}
            <div 
              className="absolute inset-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ backgroundColor: '#212121' }}
            />
          </div>
        );
    }
  };

  return (
    <div 
      className={containerClasses}
      style={{ fontFamily: 'Poppins, sans-serif' }}
      role="status" 
      aria-live="polite"
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Animated logo/brand area */}
        {fullScreen && (
          <div className="mb-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ backgroundColor: '#212121' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        )}

        {/* Spinner */}
        <div className="flex items-center justify-center">
          {renderSpinner()}
        </div>
        
        {/* Loading text with enhanced animation */}
        {showText && (
          <div className="text-center animate-fade-in">
            <p 
              className="text-lg font-medium mb-2"
              style={{ color: '#212121' }}
            >
              {text}
            </p>
            {/* Animated progress dots */}
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ 
                    backgroundColor: '#484848',
                    animationDelay: `${index * 0.15}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Page Loader with better visuals
export const PageLoader = ({ text = "Loading page...", variant = "hotel" }) => (
  <Loader fullScreen={true} size="large" text={text} variant={variant} />
);

// Inline Loader with variants
export const InlineLoader = ({ size = "medium", text = "Loading...", variant = "default" }) => (
  <Loader size={size} text={text} showText={true} variant={variant} />
);

// Enhanced Button Loader
export const ButtonLoader = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center space-x-3">
    <div className="relative">
      <div 
        className="w-4 h-4 rounded-full border-2 animate-spin"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderTopColor: '#FFFFFF',
          animationDuration: '0.8s'
        }}
      />
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

// Enhanced Skeleton Loader with shimmer effect
export const SkeletonLoader = ({ lines = 3, className = '', height = 'h-4' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="relative overflow-hidden rounded">
        <div 
          className={`${height} rounded ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
          style={{ backgroundColor: '#EFF0F2' }}
        />
        {/* Shimmer effect */}
        <div 
          className={`absolute inset-0 ${height} -skew-x-12 animate-shimmer`}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shimmer 2s infinite'
          }}
        />
      </div>
    ))}
  </div>
);

// Enhanced Card Skeleton with shimmer
export const CardSkeletonLoader = ({ variant = "default" }) => {
  if (variant === "room") {
    return (
      <div 
        className="border rounded-lg overflow-hidden animate-pulse"
        style={{ borderColor: '#EFF0F2' }}
      >
        {/* Room image placeholder */}
        <div 
          className="h-48 relative overflow-hidden"
          style={{ backgroundColor: '#EFF0F2' }}
        >
          <div 
            className="absolute inset-0 -skew-x-12 animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>
        
        {/* Room details */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2 flex-1">
              <div 
                className="h-5 w-3/4 rounded"
                style={{ backgroundColor: '#EFF0F2' }}
              />
              <div 
                className="h-4 w-1/2 rounded"
                style={{ backgroundColor: '#EFF0F2' }}
              />
            </div>
            <div 
              className="w-16 h-8 rounded-full"
              style={{ backgroundColor: '#EFF0F2' }}
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <div 
              className="h-3 w-full rounded"
              style={{ backgroundColor: '#EFF0F2' }}
            />
            <div 
              className="h-3 w-5/6 rounded"
              style={{ backgroundColor: '#EFF0F2' }}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div 
              className="h-6 w-20 rounded"
              style={{ backgroundColor: '#EFF0F2' }}
            />
            <div 
              className="h-10 w-24 rounded-lg"
              style={{ backgroundColor: '#EFF0F2' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="border rounded-lg p-6 animate-pulse overflow-hidden relative"
      style={{ borderColor: '#EFF0F2' }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div 
          className="w-12 h-12 rounded-full"
          style={{ backgroundColor: '#EFF0F2' }}
        />
        <div className="space-y-2 flex-1">
          <div 
            className="h-4 w-1/2 rounded"
            style={{ backgroundColor: '#EFF0F2' }}
          />
          <div 
            className="h-3 w-1/3 rounded"
            style={{ backgroundColor: '#EFF0F2' }}
          />
        </div>
      </div>
      <div className="space-y-3">
        <div 
          className="h-3 w-full rounded"
          style={{ backgroundColor: '#EFF0F2' }}
        />
        <div 
          className="h-3 w-5/6 rounded"
          style={{ backgroundColor: '#EFF0F2' }}
        />
        <div 
          className="h-3 w-4/6 rounded"
          style={{ backgroundColor: '#EFF0F2' }}
        />
      </div>
      
      {/* Shimmer overlay */}
      <div 
        className="absolute inset-0 -skew-x-12 animate-shimmer pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          animation: 'shimmer 2s infinite'
        }}
      />
    </div>
  );
};

// Typing Animation Loader
export const TypingLoader = ({ text = "Processing..." }) => (
  <div className="flex items-center space-x-2">
    <span style={{ color: '#212121' }}>{text}</span>
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-1 h-1 rounded-full animate-bounce"
          style={{
            backgroundColor: '#484848',
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  </div>
);

// Progress Bar Loader
export const ProgressLoader = ({ progress = 0, text = "Loading..." }) => (
  <div className="w-full max-w-md mx-auto">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium" style={{ color: '#212121' }}>
        {text}
      </span>
      <span className="text-sm" style={{ color: '#484848' }}>
        {Math.round(progress)}%
      </span>
    </div>
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#EFF0F2' }}>
      <div 
        className="h-2 rounded-full transition-all duration-300 ease-out"
        style={{ 
          backgroundColor: '#212121',
          width: `${progress}%`
        }}
      />
    </div>
  </div>
);

// Search Loader
export const SearchLoader = () => (
  <div className="flex items-center space-x-2">
    <div className="relative">
      <svg 
        className="w-5 h-5 animate-spin" 
        style={{ color: '#484848' }}
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25"/>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
      </svg>
    </div>
    <span className="text-sm" style={{ color: '#484848' }}>Searching...</span>
  </div>
);

export default Loader;