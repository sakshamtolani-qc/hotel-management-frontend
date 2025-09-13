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
