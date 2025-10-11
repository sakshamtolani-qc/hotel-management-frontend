import React, { useState } from "react";
import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Room } from "@/types/Room";

interface RoomCardProps {
  room: Room;
  onToggleFavorite: (roomId: number) => void; // Callback to toggle favorite
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onToggleFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [room.image, ...room.additional_images];

  // Navigate to next image in carousel
  const nextImage = () => {
    if (images.length > 0) setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Navigate to previous image in carousel
  const prevImage = () => {
    if (images.length > 0) setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow hover:shadow-lg transition-shadow">
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={images[currentImageIndex] || "/placeholder.jpg"}
          alt={`${room.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
        />

        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 bg-hotel-warm text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹ {room.price_per_night} / night
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(room.room_id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
        >
          <Heart
            className={`w-5 h-5 ${room.isFavorite ? "text-red-500" : "text-gray-700"}`}
          />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition duration-200 ${
                  index === currentImageIndex ? "bg-white" : "bg-white opacity-50 hover:opacity-70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{room.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{room.description}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" /> <span>{room.beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" /> <span>{room.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" /> <span>{room.guests}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />{" "}
            <span>
              {[
                room.television,
                room.wifi,
                room.washer,
                room.balcony,
                room.air_condition,
                room.kitchen,
              ].filter(Boolean).length}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              room.status === "Vacant"
                ? "bg-green-200 text-green-800"
                : room.status === "Occupied"
                ? "bg-red-200 text-red-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {room.status}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
