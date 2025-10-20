// src/pages/Rooms/RoomDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Bed, Bath, Users, Wifi, Heart, Tv, PawPrint, Car, ChefHat } from "lucide-react";
import ImageCarousel from "@/components/Rooms/ImageCarousel";
import { Room } from "@/types/Room";
import axios from "axios";

const RoomDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();

  const [room, setRoom] = useState<Room | null>(location.state?.room || null);
  const [loading, setLoading] = useState(!room);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://127.0.0.1:8000"; // match your backend

  // Fetch room if not in location.state
  useEffect(() => {
    if (!room && roomId) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/rooms/${roomId}`) // exact same URL as old page
        .then((res) => setRoom(res.data))
        .catch((err) => {
          console.error("Failed to fetch room:", err);
          setError("Room not found or server error.");
        })
        .finally(() => setLoading(false));
    }
  }, [room, roomId]);

  if (loading) return <div className="text-center p-10">Loading room details...</div>;

  if (error || !room) {
    return (
      <div className="text-center p-10">
        <h2>{error || "Room details not found."}</h2>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Prepare images safely
  const images = [
    room.image ? (room.image.startsWith("http") ? room.image : `${BASE_URL}${room.image}`) : "/placeholder.jpg",
    ...(room.additional_images?.map((img) => (img.startsWith("http") ? img : `${BASE_URL}${img}`)) || []),
  ];

  // Count available amenities
  const amenitiesCount = [
    room.amenities?.television,
    room.amenities?.wifi,
    room.amenities?.washer,
    room.amenities?.balcony,
    room.amenities?.airCondition,
    room.amenities?.kitchen,
  ].filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Image Carousel */}
      <ImageCarousel
        images={images}
        blurred={room.status !== "Vacant"}
        className="h-96 rounded-lg overflow-hidden"
      />

      {/* Room Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{room.title}</h1>
          <p className="text-gray-600 mt-1">{room.description}</p>
        </div>

        {/* Favorite button */}
        <button className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
          <Heart className={`w-6 h-6 ${room.isFavorite ? "text-red-500" : "text-gray-500"}`} />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        <div className="flex items-center space-x-2"><Bed /> <span>{room.amenities?.beds} Beds</span></div>
        <div className="flex items-center space-x-2"><Bath /> <span>{room.amenities?.bathrooms} Baths</span></div>
        <div className="flex items-center space-x-2"><Users /> <span>{room.amenities?.guests} Guests</span></div>
        <div className="flex items-center space-x-2"><Wifi /> <span>{amenitiesCount} Amenities</span></div>
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
