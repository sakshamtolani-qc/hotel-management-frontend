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

  console.log(roomId);
// CreateReservationsPage.tsx (replace your current function)
const handleReservationSuccess = async (reservationData: any) => {
  if (!selectedRoom) return;

  console.log("🟢 Selected Room before API call:", selectedRoom);
  console.log("🟢 roomId being sent:", selectedRoom.room_id);

  try {
    // If the child (ReservationForm) already created the reservation,
    // it will pass the createdReservation back (object with .reservation or .reservation_id).
    // Otherwise, reservationData is the raw form payload and we must create it here.
    let createdReservation: any = null;

    // Case A: child already created reservation and returned API response
    if (reservationData && reservationData.reservation && reservationData.reservation.reservation_id) {
      createdReservation = reservationData;
      console.log("🟢 Received created reservation from child:", createdReservation);
    } else if (reservationData && reservationData.reservation_id) {
      // sometimes the child may return a flat reservation object
      createdReservation = { reservation: reservationData };
      console.log("🟢 Received created reservation object:", createdReservation);
    } else {
      // Case B: fallback — create reservation here (if child didn't)
      console.log("🟡 Child did not create reservation; creating now with form payload.");
      createdReservation = await ReservationsService.createReservation({
        ...reservationData,
        status: "upcoming",
        roomType: selectedRoom.room_type || "Standard Room",
      });
      console.log("🟢 Reservation created by parent:", createdReservation);
    }

    // Ensure we have reservation id
    const reservationId =
      createdReservation?.reservation?.reservation_id ||
      createdReservation?.reservation_id ||
      createdReservation?.id; // defensive

    if (!reservationId) {
      console.error("❌ Reservation ID not found in response — aborting room assignment", createdReservation);
      // still navigate or show toast depending on your UX
      return;
    }

    // Now assign the room (single call)
    console.log("🟢 Assigning room:", selectedRoom.room_id, "to reservation:", reservationId);
    await ReservationsService.assignRoom({
      reservation_id: reservationId,
      room_ids: [selectedRoom.room_id],
    });
    console.log("✅ Room assigned successfully!");

    // Navigate to invoice (use createdReservation returned by the API)
    navigate("/invoice", {
      state: { reservationData: createdReservation, roomData: selectedRoom },
    });
  } catch (error) {
    console.error("❌ Failed to create or assign reservation:", error);
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
