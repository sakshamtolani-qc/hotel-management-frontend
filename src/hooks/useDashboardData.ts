import { useState, useEffect } from 'react';

export interface DashboardMetrics {
  totalRevenue: { value: string; trend: string };
  avgTransactionValue: { value: string; trend: string };
  avgFootfall: { value: string; trend: string };
}

export interface HotelAnalytics {
  arrivalsToday: number;
  departureToday: number;
  pendingPayments: number;
  upcomingReservation: number;
}

export interface RoomActivity {
  totalRooms: number;
  roomOccupancy: number;
  dirtyRooms: number;
  vacantRooms: number;
}

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: { value: '20k', trend: '12.5%' },
    avgTransactionValue: { value: '3.4k', trend: '1.5%' },
    avgFootfall: { value: '27', trend: '0.5%' }
  });

  const [hotelAnalytics, setHotelAnalytics] = useState<HotelAnalytics>({
    arrivalsToday: 10,
    departureToday: 3,
    pendingPayments: 4,
    upcomingReservation: 3
  });

  const [roomActivity, setRoomActivity] = useState<RoomActivity>({
    totalRooms: 40,
    roomOccupancy: 20,
    dirtyRooms: 4,
    vacantRooms: 20
  });

  const [firstName, setFirstName] = useState('John');

  return {
    metrics,
    hotelAnalytics,
    roomActivity,
    firstName
  };
};