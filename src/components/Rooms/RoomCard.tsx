import React from "react";
import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi, Heart } from "lucide-react";
import { Room } from "@/types/Room";
import ImageCarousel from "@/components/Rooms/ImageCarousel"; // Import the new carousel

interface RoomCardProps {
  room: Room;
  onToggleFavorite: (roomId: number) => void;
  onClick?: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onToggleFavorite, onClick }) => {
  const images = [room.image, ...room.additional_images];

  return (
    <Card className="w-full max-w-sm overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onClick?.(room)}>
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={images} blurred={room.status !== "Vacant"} />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent navigating to details
            onToggleFavorite(room.room_id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition"
        >
          <Heart
            className={`w-5 h-5 ${room.isFavorite ? "text-red-500" : "text-gray-700"}`}
          />
        </button>
      </div>

      {/* Room Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{room.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{room.description}</p>

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
            <Wifi className="w-4 h-4" />
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
        <div className="mt-2">
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
