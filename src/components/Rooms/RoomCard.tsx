import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface RoomCardProps {
  title: string;
  description: string;
  price: string;
  beds: number;
  bathrooms: number;
  occupancy: number;
  amenities: number;
  images: string[]; // Array of image URLs
}

const RoomCard = ({ 
  title, 
  description, 
  price, 
  beds, 
  bathrooms, 
  occupancy, 
  amenities,
  images 
}: RoomCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        {/* Main Image */}
        <img 
          src={images[currentImageIndex]} 
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
        />
        
        {/* Price Badge */}
        <div className="absolute bottom-2 bg-hotel-warm text-white px-3 py-1 rounded-full text-sm font-medium">
          {price}
        </div>
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white opacity-50 hover:opacity-70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{occupancy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <span>{amenities}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;