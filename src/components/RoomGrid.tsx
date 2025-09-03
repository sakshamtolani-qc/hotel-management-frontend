import { useRoomStore } from '@/store/roomStore';   
import type { RoomCategory } from '@/store/roomStore'; 

import { RoomCard } from './RoomCard';
import { useMemo } from 'react';

const categoryLabels: Record<RoomCategory, string> = {
  standard: 'Standard Rooms',
  deluxe: 'Deluxe Rooms',
  luxury: 'Luxury Rooms'
};

export const RoomGrid = () => {
    // Added _priceFilter and _amenityFilter just to subscribe for re-renders
  const { getFilteredRooms, selectedStatus, searchQuery, priceFilter, amenityFilter } = useRoomStore();


  
  // Get filtered rooms and memoize with proper dependencies
 const filteredRooms = useMemo(() => getFilteredRooms(), [
  getFilteredRooms,
  selectedStatus,
  searchQuery,
  priceFilter,
  amenityFilter,
]);

  // Group rooms by category
  const roomsByCategory = useMemo(() => {
    return filteredRooms.reduce((acc, room) => {
      if (!acc[room.category]) {
        acc[room.category] = [];
      }
      acc[room.category].push(room);
      return acc;
    }, {} as Record<RoomCategory, typeof filteredRooms>);
  }, [filteredRooms]);

  const categories: RoomCategory[] = ['standard', 'deluxe', 'luxury'];

  // Show message if no rooms found
  if (filteredRooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No rooms found matching your search criteria.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryRooms = roomsByCategory[category] || [];
        if (categoryRooms.length === 0) return null;
        
        return (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              {categoryLabels[category]} ({categoryRooms.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};