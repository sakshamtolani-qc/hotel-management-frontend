import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

interface ImageCarouselProps {
  images: string[];
  blurred?: boolean;
  className?: string;
}


const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0)
    return (
      <img
        src="/placeholder.jpg"
        alt="No images"
        className="w-full h-48 object-cover rounded-2xl"
      />
    );

  const formatImageUrl = (url: string) =>
    url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-2xl">
      <img
        src={formatImageUrl(images[currentIndex])}
        alt={`Room ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-300"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
