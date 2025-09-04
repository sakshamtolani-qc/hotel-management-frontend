import Header from "@/components/Header";
import ReservationManagement from "@/components/ReservationManagement";
import Footer from "@/components/Footer";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ReservationManagement />
      </main>
      <Footer />
    </div>
  );
};

export default Reservations;