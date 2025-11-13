import { Reservation } from "@/types/reservation";

const API_BASE = "http://127.0.0.1:8000/api/reservations";

interface PaginatedResponse<T> {
  count: number;
  results: T[];
}

export const ReservationsService = {
  /**
   * ✅ Create reservation (sends roomId as query param)
   */
  createReservation: async (data: any, roomId?: number) => {
    // If a roomId is provided, attach it as query parameter
    const url = roomId
      ? `${API_BASE}/create/?roomId=${roomId}`
      : `${API_BASE}/create/`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorText = "";
      try {
        const errorData = await res.json();
        console.error("Backend error response:", errorData);
        errorText = JSON.stringify(errorData);
      } catch {
        errorText = await res.text();
      }
      throw new Error(errorText || "Failed to create reservation");
    }

    return res.json();
  },

  /**
   * Fetch all reservations (list view)
   */
  getReservations: async (): Promise<Reservation[]> => {
    const res = await fetch(`${API_BASE}/list/`);
    if (!res.ok) throw new Error("Failed to fetch reservations");
    const data: PaginatedResponse<Reservation> = await res.json();
    return data.results;
  },

  /**
   * Cancel reservation
   */
  cancelReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/cancel/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to cancel reservation");
    return res.json();
  },

  /**
   * Checkout reservation
   */
  checkoutReservation: async (id: string | number) => {
    const res = await fetch(`${API_BASE}/${id}/checkout/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to checkout reservation");
    return res.json();
  },

    /**
   * ✅ Assign one or more rooms to a reservation
   */
  assignRoom: async (data: { reservation_id: number; room_ids: number[] }) => {
    const res = await fetch(`${API_BASE}/room/assign/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let errorText = "";
      try {
        const errorData = await res.json();
        console.error("Backend error response:", errorData);
        errorText = JSON.stringify(errorData);
      } catch {
        errorText = await res.text();
      }
      throw new Error(errorText || "Failed to assign room");
    }

    return res.json();
  },

  
};
