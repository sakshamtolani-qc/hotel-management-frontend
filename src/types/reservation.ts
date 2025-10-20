// export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "past" | "upcoming";

export type ReservationStatus =
  | "upcoming"
  | "past"
  | "cancelled"
  | "booked"
  | "checked_in"
  | "confirmed"
  | "checked_out";


export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phoneNumber: string;
  aadharNo: string;
  roomType: string;
  checkIn: string;
  checkOut?: string;
  guests: number;
  status: ReservationStatus;
  price: number;
  roomImage?: string;
}

export interface ReservationFilters {
  status: ReservationStatus | "all";
  search: string;
}
