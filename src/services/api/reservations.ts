// services/api/reservations.ts
import { Reservation } from "@/types/reservation";

const API_BASE = "/api/reservations"; // adjust based on your backend

export const ReservationsService = {
  // Fetch all reservations
  getReservations: async (): Promise<Reservation[]> => {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) throw new Error("Failed to fetch reservations");
    return res.json();
  },

  // Fetch single reservation
  getReservation: async (id: number): Promise<Reservation> => {
    const res = await fetch(`${API_BASE}/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch reservation");
    return res.json();
  },

  // Create reservation
  createReservation: async (data: Partial<Reservation>) => {
    const res = await fetch(`${API_BASE}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create reservation");
    return res.json();
  },

  // Cancel reservation
  cancelReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/cancel/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to cancel reservation");
    return res.json();
  },

  // Checkout reservation
  checkoutReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/checkout/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to checkout reservation");
    return res.json();
  },
};
