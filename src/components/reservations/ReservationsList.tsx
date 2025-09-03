import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Reservation, ReservationFilters } from '@/types/reservation';
import ReservationCard from './ReservationCard';
import SearchFilter from './SearchFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReservationsListProps {
  reservations: Reservation[];
  onCancelReservation?: (id: string) => void;
  onCheckoutReservation?: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const ReservationsList = ({ reservations, onCancelReservation, onCheckoutReservation }: ReservationsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ReservationFilters>({
    status: 'all',
    search: ''
  });

  // Filter reservations based on search and status
  const filteredReservations = useMemo(() => {
    return reservations.filter(reservation => {
      const matchesSearch = 
        reservation.guestName.toLowerCase().includes(filters.search.toLowerCase()) ||
        reservation.roomType.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = filters.status === 'all' || reservation.status === filters.status;
      
      return matchesSearch && matchesStatus;
    });
  }, [reservations, filters]);

  // Group reservations by status for tabs
  const upcomingReservations = filteredReservations.filter(r => r.status === 'upcoming');
  const pastReservations = filteredReservations.filter(r => r.status === 'past');

  // Pagination logic
  const getCurrentPageReservations = (reservationList: Reservation[]) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return reservationList.slice(startIndex, endIndex);
  };

  const getTotalPages = (reservationList: Reservation[]) => {
    return Math.ceil(reservationList.length / ITEMS_PER_PAGE);
  };

  const resetPagination = () => setCurrentPage(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
        <div className="text-sm text-muted-foreground">
          Total: {filteredReservations.length} reservations
        </div>
      </div>

      <SearchFilter 
        filters={filters} 
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          resetPagination();
        }} 
      />

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={resetPagination}>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="upcoming" className="relative">
            Upcoming
            {upcomingReservations.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {upcomingReservations.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="relative">
            Past
            {pastReservations.length > 0 && (
              <span className="ml-2 bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                {pastReservations.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingReservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming reservations found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {getCurrentPageReservations(upcomingReservations).map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onCancel={onCancelReservation}
                    onCheckout={onCheckoutReservation}
                  />
                ))}
              </div>
              
              {getTotalPages(upcomingReservations) > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {getTotalPages(upcomingReservations)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(getTotalPages(upcomingReservations), p + 1))}
                    disabled={currentPage === getTotalPages(upcomingReservations)}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastReservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past reservations found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {getCurrentPageReservations(pastReservations).map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
              
              {getTotalPages(pastReservations) > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {getTotalPages(pastReservations)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(getTotalPages(pastReservations), p + 1))}
                    disabled={currentPage === getTotalPages(pastReservations)}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReservationsList;