import React from 'react';
import { Card } from '../ui/card';
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Hotel Analytics" subtitle="in Last 7 days">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">A</span>
                  </div>
                  <span className="text-gray-700">Arrivals Today</span>
                </div>
                <span className="font-semibold text-gray-900">{hotelAnalytics.arrivalsToday}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">D</span>
                  </div>
                  <span className="text-gray-700">Departure Today</span>
                </div>
                <span className="font-semibold text-gray-900">{hotelAnalytics.departureToday}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">P</span>
                  </div>
                  <span className="text-gray-700">Pending Payments</span>
                </div>
                <span className="font-semibold text-gray-900">{hotelAnalytics.pendingPayments}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">U</span>
                  </div>
                  <span className="text-gray-700">Upcoming Reservation</span>
                </div>
                <span className="font-semibold text-gray-900">{hotelAnalytics.upcomingReservation}</span>
              </div>
            </div>
          </Card>

          <Card title="Rooms Activity" subtitle="in Last 7 days">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">T</span>
                  </div>
                  <span className="text-gray-700">Total Rooms</span>
                </div>
                <span className="font-semibold text-gray-900">{roomActivity.totalRooms}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">R</span>
                  </div>
                  <span className="text-gray-700">Room Occupancy</span>
                </div>
                <span className="font-semibold text-gray-900">{roomActivity.roomOccupancy}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">D</span>
                  </div>
                  <span className="text-gray-700">Dirty Rooms</span>
                </div>
                <span className="font-semibold text-gray-900">{roomActivity.dirtyRooms}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">V</span>
                  </div>
                  <span className="text-gray-700">Vacant Rooms</span>
                </div>
                <span className="font-semibold text-gray-900">{roomActivity.vacantRooms}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};