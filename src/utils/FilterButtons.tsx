import { Button } from '@/utils/button';
import { useRoomStore, RoomStatus } from '@/store/roomStore';
import { useMemo } from 'react';

const filterOptions = [
  { key: 'all' as const, label: 'All Rooms' },
  { key: 'vacant' as const, label: 'Vacant' },
  { key: 'occupied' as const, label: 'Occupied' },
  { key: 'dirty' as const, label: 'Dirty' }
];

export const FilterButtons = () => {
  const { selectedStatus, setSelectedStatus, rooms, getFilteredRooms } = useRoomStore();
  
  // Calculate counts for each status
  const counts = useMemo(() => {
    return {
      all: rooms.length,
      vacant: rooms.filter(room => room.status === 'vacant').length,
      occupied: rooms.filter(room => room.status === 'occupied').length,
      dirty: rooms.filter(room => room.status === 'dirty').length
    };
  }, [rooms]);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-3">
        {filterOptions.map((option) => (
          <Button
            key={option.key}
            variant={selectedStatus === option.key ? "default" : "secondary"}
            onClick={() => setSelectedStatus(option.key)}
            className="px-4 py-2 text-sm font-medium rounded-md"
          >
            {option.label}
            <span className="ml-2 bg-background/20 text-current px-2 py-0.5 rounded-full text-xs">
              {counts[option.key]}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};