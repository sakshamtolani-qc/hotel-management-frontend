import { useState, useEffect } from "react";
import axios from "axios";

export interface HotelAnalytics {
  arrivalsToday: number;
  departureToday: number;
  pendingPayments: number;
  upcomingReservation: number;
}
export interface DashboardMetrics {
  totalRevenue: { value: string; trend: string };
  avgTransactionValue: { value: string; trend: string };
  avgFootfall: { value: string; trend: string };
}

export interface RoomActivity {
  totalRooms: number;
  roomOccupancy: number;
  dirtyRooms: number;
  vacantRooms: number;
}

export const useDashboardData = () => {
  const [hotelAnalytics, setHotelAnalytics] = useState<HotelAnalytics>({
    arrivalsToday: 0,
    departureToday: 0,
    pendingPayments: 0,
    upcomingReservation: 0,
  });

  const [roomActivity, setRoomActivity] = useState<RoomActivity>({
    totalRooms: 0,
    roomOccupancy: 0,
    dirtyRooms: 0,
    vacantRooms: 0,
  });

  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --------- Rooms ---------
        const roomsRes = await axios.get("http://127.0.0.1:8000/api/rooms/");
        const roomsArray = Array.isArray(roomsRes.data.results)
          ? roomsRes.data.results
          : [];

        const totalRooms = roomsArray.length;
        const occupiedRooms = roomsArray.filter(
          (r: any) => r.status?.toLowerCase() === "occupied"
        ).length;
        const dirtyRooms = roomsArray.filter(
          (r: any) => r.status?.toLowerCase() === "dirty"
        ).length;
        const vacantRooms = roomsArray.filter(
          (r: any) => r.status?.toLowerCase() === "vacant"
        ).length;

        // **Update roomActivity state**
        setRoomActivity({
          totalRooms,
          roomOccupancy: occupiedRooms,
          dirtyRooms,
          vacantRooms,
        });

        // --------- Reservations ---------
        const reservationsRes = await axios.get(
          "http://127.0.0.1:8000/api/reservations/list/"
        );

        const reservationsArray = Array.isArray(reservationsRes.data.results)
          ? reservationsRes.data.results
          : [];

        const today = new Date();

        const arrivalsToday = reservationsArray.filter((r: any) => {
          const checkIn = new Date(r.checkIn);
          return checkIn.toDateString() === today.toDateString();
        }).length;

        const departureToday = reservationsArray.filter((r: any) => {
          const checkOut = new Date(r.checkOut);
          return checkOut.toDateString() === today.toDateString();
        }).length;

        const pendingPayments = reservationsArray.filter(
          (r: any) => r.status?.toLowerCase() === "pending"
        ).length;

        const upcomingReservation = reservationsArray.filter(
          (r: any) => r.status?.toLowerCase() === "upcoming"
        ).length;

        // **Update hotelAnalytics state**
        setHotelAnalytics({
          arrivalsToday,
          departureToday,
          pendingPayments,
          upcomingReservation,
        });

        // --------- Total Revenue ---------
        const revenue = reservationsArray.reduce(
          (sum: number, r: any) => sum + Number(r.total_amount || 0),
          0
        );

        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return { hotelAnalytics, roomActivity, totalRevenue };
};
