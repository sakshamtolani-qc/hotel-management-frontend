// src/hooks/useRooms.ts
import { useState, useEffect, useCallback } from "react";
import { RoomsService } from "@/services/api/rooms";
import { Room } from "@/types/Room";

interface UseRoomsOptions {
  category?: string;
  status?: string[];
  autoFetch?: boolean;
}

interface UseRoomsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  toggleFavorite: (roomId: number) => Promise<void>;
}

export const useRooms = (options: UseRoomsOptions = {}): UseRoomsReturn => {
  const { category, status: statusFilters, autoFetch = true } = options;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRooms = await RoomsService.getRooms();

      let filteredRooms = fetchedRooms;

      if (category) {
        filteredRooms = filteredRooms.filter(room => room.category === category);
      }

      if (statusFilters && statusFilters.length > 0) {
        filteredRooms = filteredRooms.filter(room =>
          room.status ? statusFilters.includes(room.status) : true
        );
      }

      setRooms(filteredRooms);
    } catch (err: any) {
      console.error("useRooms fetch error:", err);
      setError(err.message || "Failed to fetch rooms");
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [category, statusFilters]);

  const toggleFavorite = useCallback(async (roomId: number) => {
    try {
      // Optimistic UI update
      setRooms(prev =>
        prev.map(room =>
          room.room_id === roomId ? { ...room, isFavorite: !room.isFavorite } : room
        )
      );

      await RoomsService.toggleFavorite(roomId);
    } catch (err: any) {
      // Revert if API fails
      setRooms(prev =>
        prev.map(room =>
          room.room_id === roomId ? { ...room, isFavorite: !room.isFavorite } : room
        )
      );
      console.error("Failed to toggle favorite:", err.message);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) fetchRooms();
  }, [fetchRooms, autoFetch]);

  return { rooms, loading, error, fetchRooms, toggleFavorite };
};
