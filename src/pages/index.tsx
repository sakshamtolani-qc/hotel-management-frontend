import Header from "@/components/layout/Header";
import HeroSection from "@/components/HeroSection";
import RoomCard from "@/components/reservations/RoomCard";
import ReservationForm from "@/components/reservations/ReservationForm";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
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
            />
          </div>
          
          {/* Reservation Form */}
          <div className="flex justify-center">
            <ReservationForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
