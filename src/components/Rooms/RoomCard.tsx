import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Room } from "../../types/Room";
import { useNavigate } from "react-router-dom";

interface RoomCardProps {
  room: Room;
  onClick: (roomId: number) => void;
  onToggleFavorite?: () => void;
}

console.log("🧩 RoomCard rendering...");

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  const BASE_URL = "http://127.0.0.1:8000";
 const navigate = useNavigate();
  console.log("💰 FULL ROOM OBJECT ===>", JSON.stringify(room, null, 2));

  // const handleClick = () => {
  //   console.log("➡️ Room clicked:", room.room_id);
  //   if (onClick) onClick(room.room_id);
  // };
    const handleClick = () => {
  console.log("➡️ Room clicked:", room.room_id);
  navigate(`/rooms/${room.room_id}`, { state: { room } }); // ✅ pass room in state
};

  // Combine main + additional images safely
  const allImages = [
    room.image ? (room.image.startsWith("http") ? room.image : `${BASE_URL}${room.image}`) : "/placeholder.jpg",
    ...(room.additional_images?.map(img => img.startsWith("http") ? img : `${BASE_URL}${img}`) || []),
  ];

  console.log("🖼 All room images:", allImages);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    console.log("➡️ Next image index:", (currentImageIndex + 1) % allImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    console.log("⬅️ Prev image index:", (currentImageIndex - 1 + allImages.length) % allImages.length);
  };
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    console.log("🔹 Go to image index:", index);
  };

  // Normalize boolean-ish values safely
  const normalizeBool = (val: unknown): boolean => {
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val === 1;
    if (typeof val === "string") return val === "1" || val.toLowerCase() === "true";
    return false;
  };

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

  console.log("🛏 Beds:", beds, "🛁 Bathrooms:", bathrooms, "👤 Guests:", guests, "📶 Amenities count:", amenitiesCount);

  console.log("💰 Room Price Data:", room.price_range_display, room.price_per_night);

  const formatRoomPrice = (room: Room & { priceRange?: string }) => {
  // Use backend value if available
  if ((room as any).priceRange) return (room as any).priceRange;

  // Fallback to display string or min/max
  if (room.price_range_display) return room.price_range_display;

  if (room.price_range_min !== undefined && room.price_range_max !== undefined) {
    const min = room.price_range_min.toLocaleString();
    const max = room.price_range_max.toLocaleString();
    return `₹${min} - ₹${max} INR`;
  }

  return `₹${room.price_per_night.toLocaleString()} INR`;
};

  // const formatRoomPrice = (room: Room) => {
  //   // const range = room.price_range_display || `₹${room.price_per_night} INR`;
  //   const range = room.priceRange || "₹0 INR"; // use backend value safely
  //   console.log("💵 Format range:", range);

  //   const numbers = range.match(/\d[\d,]*/g);
  //   if (!numbers) return range;

  //   if (numbers.length === 1) {
  //     const price = parseInt(numbers[0].replace(/,/g, ""), 10);
  //     return `₹${price.toLocaleString()} INR`;
  //   }

  //   if (numbers.length >= 2) {
  //     const min = parseInt(numbers[0].replace(/,/g, ""), 10);
  //     const max = parseInt(numbers[1].replace(/,/g, ""), 10);
  //     return `₹${min.toLocaleString()} - ₹${max.toLocaleString()} INR`;
  //   }

  //   return range;
  // };

  useEffect(() => {
    console.log("📌 Current displayed image:", allImages[currentImageIndex]);
  }, [currentImageIndex, allImages]);

  return (
    <Card className="w-full max-w-sm overflow-hidden cursor-pointer" onClick={handleClick}>
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={allImages[currentImageIndex]}
          alt={`${room.title || "Room"} - Image ${currentImageIndex + 1}`}
          className="w-full h-48 object-cover"
        />

        {/* Price Badge */}
        <div className="absolute bottom-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {formatRoomPrice(room)}
        </div>

        {/* Image Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); goToImage(index); }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? "bg-white" : "bg-white opacity-50 hover:opacity-70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Room Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{room.title || "Room"}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description || "No description available."}</p>

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
