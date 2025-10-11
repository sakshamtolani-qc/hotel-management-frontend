import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  initialIndex?: number;
  showArrows?: boolean;
  showDots?: boolean;
  onImageClick?: (img: string) => void;
  className?: string;
  blurred?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  initialIndex = 0,
  showArrows = true,
  showDots = true,
  onImageClick,
  className,
  blurred = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const total = images.length;

  const next = () => setCurrentIndex((currentIndex + 1) % total);
  const prev = () => setCurrentIndex((currentIndex - 1 + total) % total);

  return (
    <div className={`relative ${className}`}>
      <img
        src={images[currentIndex] || "/placeholder.jpg"}
        alt={`Image ${currentIndex + 1}`}
        className={`w-full object-cover ${blurred ? "blur-sm" : ""}`}
        onClick={() => onImageClick?.(images[currentIndex])}
      />

      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
          >
            ›
          </button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
