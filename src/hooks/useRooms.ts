import { useState, useEffect, useCallback } from 'react';
import { getRooms, toggleFavorite } from '../services/api/rooms';
// import { Room } from '../data/mockRooms';
import { Room } from '../types/Room'; 

interface UseRoomsOptions {
  category?: string;
  status?: string[];
  autoFetch?: boolean;
}

interface UseRoomsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  toggleRoomFavorite: (roomId: number) => Promise<void>;
  updateRoomStatus: (roomId: number, status: Room['status']) => void;
}

/**
 * Custom hook to manage rooms data from API
 */
export const useRooms = (options: UseRoomsOptions = {}): UseRoomsReturn => {
  const { category, status: statusFilters, autoFetch = true } = options;
  
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      console.log('useRooms: Starting to fetch rooms...');
      setLoading(true);
      setError(null);
      
      console.log('useRooms: Calling getRooms API...');
      const fetchedRooms = await getRooms();
      console.log('useRooms: Received rooms from API:', fetchedRooms);
      
      // Apply client-side filtering if needed
      let filteredRooms = fetchedRooms;
      
      // Filter by category
      if (category && category !== 'Rooms') {
        filteredRooms = filteredRooms.filter(room => room.category === category);
      }
      
      // Filter by status
      if (statusFilters && statusFilters.length > 0) {
        filteredRooms = filteredRooms.filter(room => {
          if (!room.status) return false;
          return statusFilters.includes(room.status);
        });
      }
      
      console.log('useRooms: Filtered rooms:', filteredRooms);
      setRooms(filteredRooms);
      console.log('useRooms: Successfully set rooms state');
    } catch (err) {
      console.error('useRooms: Error in fetchRooms:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch rooms';
      setError(errorMessage);
      console.error('Error fetching rooms:', err);
      
      // Fallback to empty array on error
      setRooms([]);
    } finally {
      console.log('useRooms: Setting loading to false');
      setLoading(false);
    }
  }, [category, statusFilters]);

  const toggleRoomFavorite = useCallback(async (roomId: number) => {
    try {
      // Optimistically update the UI first
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.room_id  === roomId 
            ? { ...room, isFavorite: !room.isFavorite }
            : room
        )
      );
      
      // Make API call
      await toggleFavorite(roomId);
      
      // If the API call fails, the error will be caught and the UI will be reverted
    } catch (err) {
      // Revert the optimistic update
      setRooms(prevRooms => 
        prevRooms.map(room => 
          room.room_id  === roomId 
            ? { ...room, isFavorite: !room.isFavorite }
            : room
        )
      );
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle favorite';
      console.error('Error toggling favorite:', errorMessage);
      // You could show a toast notification here
    }
  }, []);

  const updateRoomStatus = useCallback((roomId: number, status: Room['status']) => {
    // Optimistic update for status changes
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.room_id  === roomId 
          ? { ...room, status }
          : room
      )
    );
    
    // Note: If you need to persist status changes to backend, 
    // you would add an API call here similar to toggleRoomFavorite
  }, []);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchRooms();
    }
  }, [fetchRooms, autoFetch]);

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
    toggleRoomFavorite,
    updateRoomStatus,
  };
};