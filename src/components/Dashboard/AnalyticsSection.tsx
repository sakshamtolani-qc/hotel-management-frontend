import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../utils/card";
import { useDashboardData } from "../../hooks/useDashboardData";

export const AnalyticsSection: React.FC = () => {
  const { hotelAnalytics, roomActivity } = useDashboardData();

  // Safe defaults (in case data is not loaded yet)
  const ha = hotelAnalytics || {
    arrivalsToday: 0,
    departureToday: 0,
    pendingPayments: 0,
    upcomingReservation: 0,
  };

  const ra = roomActivity || {
    totalRooms: 0,
    roomOccupancy: 0,
    dirtyRooms: 0,
    vacantRooms: 0,
  };
  

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Hotel Analytics */}
          <Card className="border border-gray-200 shadow-none rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Hotel Analytics
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                in Last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Arrivals Today</span>
                  <span>{ha.arrivalsToday}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Departure Today</span>
                  <span>{ha.departureToday}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Pending Payments</span>
                  <span>{ha.pendingPayments}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Upcoming Reservation</span>
                  <span>{ha.upcomingReservation}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Activity */}
          <Card className="border border-gray-200 shadow-none rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Rooms Activity
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                in Last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Total Rooms</span>
                  <span>{ra.totalRooms}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Room Occupancy</span>
                  <span>{ra.roomOccupancy}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Dirty Rooms</span>
                  <span>{ra.dirtyRooms}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Vacant Rooms</span>
                  <span>{ra.vacantRooms}</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};
