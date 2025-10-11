import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bed, Bath, User, Wifi, Heart } from "lucide-react";
import ImageCarousel from "@/components/Rooms/ImageCarousel";
import { Room } from "@/types/Room";

const RoomDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const room: Room = location.state?.room;

  if (!room) {
    return (
      <div className="text-center p-10">
        <h2>Room details not found.</h2>
        <button onClick={() => navigate("/rooms")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  const images = [room.image, ...room.additional_images];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Carousel */}
      <ImageCarousel images={images} blurred={room.status !== "Vacant"} className="h-96 rounded-lg overflow-hidden" />

      {/* Basic Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{room.title}</h1>
          <p className="text-muted-foreground mt-1">{room.description}</p>
        </div>

        {/* Favorite button */}
        <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
          <Heart className={`w-6 h-6 ${room.isFavorite ? "text-red-500" : "text-gray-500"}`} />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        <div className="flex items-center space-x-2">
          <Bed /> <span>{room.beds} Beds</span>
        </div>
        <div className="flex items-center space-x-2">
          <Bath /> <span>{room.bathrooms} Baths</span>
        </div>
        <div className="flex items-center space-x-2">
          <User /> <span>{room.guests} Guests</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wifi /> <span>{[
            room.television,
            room.wifi,
            room.washer,
            room.balcony,
            room.air_condition,
            room.kitchen,
          ].filter(Boolean).length} Amenities</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
  );
};

export default RoomDetails;
