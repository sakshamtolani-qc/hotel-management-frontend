// types/reservation.ts

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "past";

export interface Reservation {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: ReservationStatus;
  price: number;
  roomImage?: string; // <-- Add this optional field
}

export interface ReservationFilters {
  status: ReservationStatus | "all";
  search: string;
}
