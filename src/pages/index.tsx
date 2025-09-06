import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReservationsList from '@/components/reservations/ReservationsList';
import { mockReservations } from '@/data/mockReservations';
import { Reservation } from '@/types/reservation';

const Index = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const { toast } = useToast();

  const handleCancelReservation = (id: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'cancelled' as const }
          : reservation
      )
    );
    
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been successfully cancelled.",
    });
  };

  const handleCheckoutReservation = (id: string) => {
    setReservations(prev => 
      prev.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: 'past' as const }
          : reservation
      )
    );
    
    toast({
      title: "Checkout Complete",
      description: "Guest has been successfully checked out.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <ReservationsList 
          reservations={reservations}
          onCancelReservation={handleCancelReservation}
          onCheckoutReservation={handleCheckoutReservation}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
