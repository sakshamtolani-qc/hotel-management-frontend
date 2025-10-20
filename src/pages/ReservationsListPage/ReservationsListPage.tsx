import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ReservationsList from "@/components/reservations/ReservationsList";
import { ReservationsService } from "@/services/api/reservations";
import { Reservation } from "@/types/reservation";
import { PageLoader } from "@/components/Loader/Loader";

const ReservationsListPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch reservations from backend
  const fetchReservations = async () => {
  setLoading(true);
  try {
    const data = await ReservationsService.getReservations();
    console.log("Fetched reservations:", data); // this will show an array
    setReservations(data); // <-- just use data directly
  } catch (err) {
    toast({ title: "Error", description: "Failed to load reservations." });
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchReservations();
  }, []);

  // Cancel reservation
  const handleCancelReservation = async (id: string) => {
    try {
      await ReservationsService.cancelReservation(id);
      toast({ title: "Reservation Cancelled", description: "Reservation successfully cancelled." });
      fetchReservations(); // Refresh list
    } catch {
      toast({ title: "Error", description: "Failed to cancel reservation." });
    }
  };

  // Checkout reservation
  const handleCheckoutReservation = async (id: string) => {
    try {
      await ReservationsService.checkoutReservation(id);
      toast({ title: "Checkout Complete", description: "Guest checked out successfully." });
      fetchReservations(); // Refresh list
    } catch {
      toast({ title: "Error", description: "Failed to checkout reservation." });
    }
  };

  if (loading) {
    return <PageLoader text="Loading reservations..." variant="hotel" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8 pr-20 pl-20">
        <ReservationsList
          reservations={reservations}
          onCancelReservation={handleCancelReservation}
          onCheckoutReservation={handleCheckoutReservation}
        />
      </main>
    </div>
  );
};

export default ReservationsListPage;
