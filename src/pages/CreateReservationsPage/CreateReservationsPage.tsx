// // src/pages/ReservationPage.tsx
// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import HeroSection from "@/components/HeroSection/HeroSection";
// import RoomCard from "@/components/Rooms/RoomCard";
// import ReservationForm from "@/components/reservations/ReservationForm";
// import { PageLoader } from "@/components/Loader/Loader";
// import axios from "axios";
// import { Room } from "@/types/Room";

// const ReservationPage = () => {
//   const [loading, setLoading] = useState(true);
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const roomId = searchParams.get("roomId"); // Get roomId from URL query params

//   // Fetch room data from backend when page loads
//   useEffect(() => {
//     if (!roomId) {
//       setError("No room selected.");
//       setLoading(false);
//       return;
//     }

//     const fetchRoom = async () => {
//       try {
//         const response = await axios.get(`/api/rooms/${roomId}/`); // Django RoomDetailView

//         // Map the response to a full Room object
//         const roomData: Room = {
//           ...response.data,
//           room_number: response.data.room_number || "N/A",
//           category: response.data.category || "Standard",
//           price_per_night: response.data.price_per_night || 0,
//           status: response.data.status || "Vacant",
//           television: response.data.television ?? false,
//           wifi: response.data.wifi ?? false,
//           washer: response.data.washer ?? false,
//           balcony: response.data.balcony ?? false,
//           air_condition: response.data.air_condition ?? false,
//           kitchen: response.data.kitchen ?? false,
//           sanitizers: response.data.sanitizers ?? false,
//           fire_extinguisher: response.data.fire_extinguisher ?? false,
//           daily_cleaning: response.data.daily_cleaning ?? false,
//           isFavorite: response.data.isFavorite ?? false,
//           created_at: response.data.created_at || "",
//           updated_at: response.data.updated_at || "",
//           price_range_min: response.data.price_range_min,
//           price_range_max: response.data.price_range_max,
//           price_range_display: response.data.price_range_display || "",
//           rating: response.data.rating || 0,
//           image: response.data.image || "/placeholder.jpg",
//           additional_images: response.data.additional_images || [],
//           beds: response.data.beds || 0,
//           bathrooms: response.data.bathrooms || 0,
//           parking: response.data.parking || 0,
//           guests: response.data.guests || 0,
//         };

//         setSelectedRoom(roomData);
//       } catch (err: any) {
//         console.error("Error fetching room data:", err);
//         setError(err.response?.data?.detail || "Failed to fetch room details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoom();
//   }, [roomId]);

//   // Callback after reservation is successful
//   const handleReservationSuccess = (reservationData: any) => {
//     navigate("/invoice", { state: { reservationData, roomData: selectedRoom } });
//   };

//   // Show loader while fetching data
//   if (loading)
//     return <PageLoader text="Loading reservation page..." variant="hotel" />;

//   // Show error message if something went wrong
//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background mt-20">
//       {/* Hero Section */}
//       <HeroSection />

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
//           {/* Room Card */}
//           <div className="flex justify-center">
//             {selectedRoom && (
//               <RoomCard
//                 room={selectedRoom} // Pass the fetched Room object
//                 onToggleFavorite={(id) => console.log("Toggle favorite for", id)}
//               />
//             )}
//           </div>

//           {/* Reservation Form */}
//           <div className="flex justify-center">
//             <ReservationForm onSuccess={handleReservationSuccess} />
//           </div>
//         </div>
//       </main>
//     </div> 
//   );
// };

// export default ReservationPage;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection/HeroSection";
import RoomCard from "@/components/Rooms/RoomCard";
import ReservationForm from "@/components/reservations/ReservationForm";
import { PageLoader } from "@/components/Loader/Loader";
import { mockRooms } from "@/data/mockRooms"; 

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');

    // Simulate data fetching
    useEffect(() => {
        if (roomId) {
            const room = mockRooms.find(r => r.id === parseInt(roomId));
            if (room) {
                setSelectedRoom(room);
            }
        }
        
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [roomId]);

    const handleReservationSuccess = (reservationData: any) => {
        // Navigate to invoice page with reservation data
        navigate('/invoice', { state: { reservationData, roomData: selectedRoom } });
    };

    if (loading) {
        return <PageLoader text="Loading reservation page..." variant="hotel" />;
    }

    return (
        <div className="min-h-screen bg-background mt-20"> {/* Added space at the top */}
            <HeroSection />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"> 
                    {/* Room Card */}
                    <div className="flex justify-space-bewteen">
                        {selectedRoom ? (
                            <RoomCard
                                title={selectedRoom.title}
                                description={selectedRoom.description}
                                price={selectedRoom.priceRange}
                                beds={selectedRoom.amenities.beds}
                                bathrooms={selectedRoom.amenities.bathrooms}
                                occupancy={selectedRoom.amenities.guests}
                                amenities={selectedRoom.amenities.rating}
                                images={[selectedRoom.image]}
                            />
                        ) : (
                            <RoomCard
                                title="Single room set"
                                description="Lorem Ipsum"
                                price="₹ 1000 - 5000 INR"
                                beds={1}
                                bathrooms={1}
                                occupancy={1}
                                amenities={0}
                                images={[
                                    "/rooms/single.jpg",
                                    "/rooms/double.jpg",
                                    "/deluxe-room-2.jpg",
                                    "/luxury-room-2.jpg"
                                ]}
                            />
                        )}
                    </div>

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