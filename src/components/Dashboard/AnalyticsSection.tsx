import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { HotelAnalytics, RoomActivity } from '../../hooks/useDashboardData';

interface AnalyticsSectionProps {
  hotelAnalytics: HotelAnalytics;
  roomActivity: RoomActivity;
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ 
  hotelAnalytics, 
  roomActivity 
}) => {
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
                {/* Row */}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">A</span>
                    </div>
                    <span className="text-sm text-gray-700">Arrivals Today</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {hotelAnalytics.arrivalsToday}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">D</span>
                    </div>
                    <span className="text-sm text-gray-700">Departure Today</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {hotelAnalytics.departureToday}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">P</span>
                    </div>
                    <span className="text-sm text-gray-700">Pending Payments</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {hotelAnalytics.pendingPayments}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">U</span>
                    </div>
                    <span className="text-sm text-gray-700">Upcoming Reservation</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {hotelAnalytics.upcomingReservation}
                  </span>
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
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">T</span>
                    </div>
                    <span className="text-sm text-gray-700">Total Rooms</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {roomActivity.totalRooms}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">R</span>
                    </div>
                    <span className="text-sm text-gray-700">Room Occupancy</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {roomActivity.roomOccupancy}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">D</span>
                    </div>
                    <span className="text-sm text-gray-700">Dirty Rooms</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {roomActivity.dirtyRooms}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">V</span>
                    </div>
                    <span className="text-sm text-gray-700">Vacant Rooms</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 pr-7">
                    {roomActivity.vacantRooms}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
