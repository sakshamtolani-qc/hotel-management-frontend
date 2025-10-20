import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection/HeroSection";
import RoomCard from "@/components/Rooms/RoomCard";
import ReservationForm from "@/components/reservations/ReservationForm";
import { PageLoader } from "@/components/Loader/Loader";
import { Room } from "@/types/Room";
import { RoomsService } from "@/services/api/rooms";
import { ReservationsService } from "@/services/api/reservations";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        if (roomId) {
          const room = await RoomsService.getRoom(parseInt(roomId));
          setSelectedRoom(room);
        }
      } catch (error) {
        console.error("Failed to fetch room:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleReservationSuccess = async (reservationData: any) => {
    if (!selectedRoom) return;

    try {
      const createdReservation = await ReservationsService.createReservation({
        ...reservationData,
        room_id: selectedRoom.room_id, // ensure backend receives room id
        status: "upcoming",
        // price: selectedRoom.price || 1000, // optional: set default price
        roomType: selectedRoom.room_type || "Standard Room",
      });

      // Navigate to invoice page
      navigate("/invoice", {
        state: { reservationData: createdReservation, roomData: selectedRoom },
      });
    } catch (error) {
      console.error("Failed to create reservation:", error);
    }
  };

  if (loading) {
    return <PageLoader text="Loading reservation page..." variant="hotel" />;
  }

  return (
    <div className="min-h-screen bg-background mt-20">
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Room Card */}
          {selectedRoom && (
            <div className="flex justify-between">
              <RoomCard
                room={selectedRoom}
                onClick={() => console.log("Room clicked")}
                onToggleFavorite={() => console.log("Toggle favorite")}
              />
            </div>
          )}

          {/* Reservation Form */}
          <div className="flex justify-center">
            <ReservationForm onSuccess={handleReservationSuccess} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
