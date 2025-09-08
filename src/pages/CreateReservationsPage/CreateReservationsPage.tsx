import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import RoomCard from "@/components/Rooms/RoomCard";
import ReservationForm from "@/components/reservations/ReservationForm";
import { PageLoader } from "@/components/Loader/Loader"; 

const Index = () => {
    const [loading, setLoading] = useState(true);

    // Simulate data fetching
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <PageLoader text="Loading reservation page..." variant="hotel" />;
    }

    return (
        <div className="min-h-screen bg-background mt-20"> {/* Added space at the top */}
            <HeroSection />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Room Card */}
                    <div className="flex justify-center">
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
                    </div>

                    {/* Reservation Form */}
                    <div className="flex justify-center">
                        <ReservationForm />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
