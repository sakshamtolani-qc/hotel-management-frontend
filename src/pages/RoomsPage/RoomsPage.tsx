// src/pages/RoomsPage/RoomsPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRooms } from "@/hooks/useRooms";
import { Room } from "@/types/Room";

const RoomsPage: React.FC = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, toggleFavorite } = useRooms();

  const handleRoomClick = (room: Room) => {
    navigate(`/rooms/${room.room_id}`, { state: { room } });
  };

  const handleToggleFavorite = (room: Room, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(room.room_id);
  };

  if (loading) return <div className="text-center mt-10">Loading rooms...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!rooms || rooms.length === 0)
    return <div className="text-center mt-10">No rooms available.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rooms.map((room) => (
  <div
    key={room.room_id?.toString() || Math.random()} // fallback just in case
    className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition relative"
    onClick={() => handleRoomClick(room)}
  >
    <img
      src={room.image || "/bedroom.jpg"}
      alt={room.title || `Room ${room.room_number}`}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{room.title || `Room ${room.room_number}`}</h3>
      <p className="text-gray-600">{room.description || "No description available."}</p>
      <p className="mt-2 font-bold">₹{room.price_per_night} / night</p>
    </div>
    <button
      onClick={(e) => handleToggleFavorite(room, e)}
      className="absolute top-2 right-2 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
    >
      {room.isFavorite ? "★" : "☆"}
    </button>
  </div>
))}

    </div>
  );
};

export default RoomsPage;
