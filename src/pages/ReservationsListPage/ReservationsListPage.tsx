import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import ReservationsList from "@/components/reservations/ReservationsList";
import { Reservation } from "@/types/reservation";
import { ReservationsService } from "@/services/api/reservations";

const ReservationsListPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const data = await ReservationsService.getReservations();
        setReservations(data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch reservations.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [toast]);

  const handleCancelReservation = async (id: string) => {
    try {
      await ReservationsService.cancelReservation(id);
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "cancelled" } : r));
      toast({ title: "Reservation Cancelled", description: "Reservation cancelled successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to cancel reservation.", variant: "destructive" });
    }
  };

  const handleCheckoutReservation = async (id: string) => {
    try {
      await ReservationsService.checkoutReservation(id);
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "past" } : r));
      toast({ title: "Checkout Complete", description: "Guest checked out successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to checkout reservation.", variant: "destructive" });
    }
  };

  if (loading) return <div className="text-center py-20">Loading reservations...</div>;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
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
