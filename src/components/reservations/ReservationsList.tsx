import React, { useEffect, useState } from "react";
import { Reservation, ReservationFilters } from "@/types/reservation";
import ReservationCard from "./ReservationCard";
import SearchFilter from "./SearchFilter";

interface ReservationsListProps {
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onCheckoutReservation: (id: string) => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({ reservations, onCancelReservation, onCheckoutReservation }) => {
  const [filters, setFilters] = useState<ReservationFilters>({ status: "all", search: "" });
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(reservations);

  useEffect(() => {
    let filtered = [...reservations];
    if (filters.status !== "all") filtered = filtered.filter(r => r.status === filters.status);
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(r => r.guestName.toLowerCase().includes(query) || r.roomType.toLowerCase().includes(query));
    }
    setFilteredReservations(filtered);
  }, [filters, reservations]);

  return (
    <div>
      <SearchFilter filters={filters} onFiltersChange={setFilters} />
      {filteredReservations.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No reservations found.</p>
      ) : (
        <div className="grid gap-4">
          {filteredReservations.map(r => (
            <ReservationCard
              key={r.id}
              reservation={r}
              onCancel={onCancelReservation}
              onCheckout={onCheckoutReservation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsList;
