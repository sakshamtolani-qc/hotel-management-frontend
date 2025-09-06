import { Card } from '@/utils/card';
import { Badge } from '@/utils/badge';
import type { Room } from '@/store/roomStore';


import { Wifi, Bed, User } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

const statusConfig = {
  vacant: {
    variant: 'vacant' as const,
    label: 'Vacant'
  },
  occupied: {
    variant: 'occupied' as const,
    label: 'Occupied'
  },
  dirty: {
    variant: 'dirty' as const,
    label: 'Dirty'
  }
};

export const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img
            src={room.image}
            alt={`Room ${room.number}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.background = 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--secondary)) 100%)';
            }}
          />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant={statusConfig[room.status].variant}>
            {statusConfig[room.status].label}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
          ${room.price.toFixed(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-3">Room {room.number}</h3>
        
        <div className="flex items-center justify-center gap-4">
          {room.amenities.wifi && (
            <Wifi className="w-5 h-5 text-muted-foreground" />
          )}
          {room.amenities.bed && (
            <Bed className="w-5 h-5 text-muted-foreground" />
          )}
          {room.amenities.person && (
            <User className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </div>
    </Card>
  );
};