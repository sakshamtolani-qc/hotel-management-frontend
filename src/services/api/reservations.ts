// src/services/api/reservations.ts
import { Reservation } from "@/types/reservation";

const API_BASE = "http://127.0.0.1:8000/api/reservations";

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export const ReservationsService = {
  createReservation: async (data: any) => {
    const res = await fetch(`${API_BASE}/create/`, {  // <-- add /create/
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create reservation");
    }
    return res.json();
  },

  // getReservations: async (): Promise<Reservation[]> => {
  //   const res = await fetch(`${API_BASE}/`);
  //   if (!res.ok) throw new Error("Failed to fetch reservations");
  //   return res.json();
  // },
 getReservations: async (): Promise<Reservation[]> => {
  const res = await fetch(`${API_BASE}/list/`);
  if (!res.ok) throw new Error("Failed to fetch reservations");
  const data: PaginatedResponse<Reservation> = await res.json();
  return data.results;  // return the array directly;
},

  cancelReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/cancel/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to cancel reservation");
    return res.json();
  },

  checkoutReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/checkout/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to checkout reservation");
    return res.json();
  },
};
