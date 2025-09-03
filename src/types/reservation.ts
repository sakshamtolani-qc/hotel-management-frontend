export interface Reservation {
  id: string;
  guestName: string;
  roomType: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  guests: number;
  price: number;
  status: 'upcoming' | 'past' | 'cancelled';
  createdAt: string;
}

export interface ReservationFilters {
  status: 'all' | 'upcoming' | 'past';
  search: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}