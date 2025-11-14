// src/components/RoomCard/RoomCard.tsx
import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Room } from "../../types/Room";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: Room;
  onClick?: (roomId: number) => void;
  onToggleFavorite?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  const navigate = useNavigate();
  const CLOUDINARY_BASE = "https://res.cloudinary.com/dxrsrhqqn/";

  const defaultImage = "/rooms/default.jpg";

  // Helper to normalize images (Cloudinary or full URL)
  const normalizeImage = (img?: string) => {
  if (!img) return defaultImage;

  // If full URL, return as is
  if (img.startsWith("http")) return img;

  // Cloudinary public_id → prepend base
  return `${CLOUDINARY_BASE}${img}`;
};

  // const normalizeImage = (img?: string) => {
  //   if (!img) return defaultImage;
  //   // If Cloudinary URL already complete or includes "res.cloudinary.com", return as is
  //   if (img.startsWith("http") || img.includes("res.cloudinary.com")) return img;

  //   // If backend includes "image/upload/", remove duplication
  //   const cleanPath = img.startsWith("image/upload/")
  //     ? img.replace("image/upload/", "")
  //     : img;

  //   return `${CLOUDINARY_BASE}${cleanPath}`;
  // };

  const mainImage = normalizeImage(room.image);
  const additionalImages = (room.additional_images || []).map(normalizeImage);
  const allImages = [mainImage, ...additionalImages];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel navigation
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  const goToImage = (index: number) => setCurrentImageIndex(index);

  // Normalize boolean-ish values
  const normalizeBool = (val: unknown): boolean => {
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val === 1;
    if (typeof val === "string") return val === "1" || val.toLowerCase() === "true";
    return false;
  };

  // Room amenities counts
  const beds = Number(room.amenities?.beds ?? 0);
  const bathrooms = Number(room.amenities?.bathrooms ?? 0);
  const guests = Number(room.amenities?.guests ?? 0);
  const amenitiesCount = [
    room.amenities?.television,
    room.amenities?.wifi,
    room.amenities?.washer,
    room.amenities?.balcony,
    room.amenities?.airCondition,
    room.amenities?.kitchen,
  ].filter(normalizeBool).length;

  // Format price
   const formatRoomPrice = (room: Room & { priceRange?: string }) => {
    if ((room as any).priceRange) return (room as any).priceRange;
    if (room.price_range_display) return room.price_range_display;
    if (room.price_range_min !== undefined && room.price_range_max !== undefined) {
      const min = room.price_range_min.toLocaleString();
      const max = room.price_range_max.toLocaleString();
      return `₹${min} - ₹${max} INR`;
    }
    return `₹${room.price_per_night.toLocaleString()} INR`;
  };

  // Only Vacant rooms are clickable
  const isClickable = room.status === "Vacant";

  const handleClick = () => {
    if (!isClickable) return;
    if (onClick) onClick(room.room_id);
    else navigate(`/rooms/${room.room_id}`, { state: { room } });
  };

  return (
    <Card
      className={`w-full max-w-sm overflow-hidden transition-transform duration-200 ${
        isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed opacity-70"
      }`}
      onClick={handleClick}
      aria-disabled={!isClickable}
    >
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={allImages[currentImageIndex]}
          alt={`${room.title || "Room"} - Image ${currentImageIndex + 1}`}
          className={`w-full h-48 object-cover ${!isClickable ? "filter blur-sm" : ""}`}
        />

        {/* Price Badge */}
        <div className="absolute bottom-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {formatRoomPrice(room)}
        </div>

        {/* Carousel navigation buttons */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white opacity-50 hover:opacity-70"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Room Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{room.title || "Room"}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description || "No description available."}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
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
            <span>{guests}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <span>{amenitiesCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
