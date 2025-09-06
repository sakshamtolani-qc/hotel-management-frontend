import { Card } from "@/utils/card";
import { Bed, Bath, User, Wifi } from "lucide-react";
import roomImage from "@/assets/rooms/single.jpg";

interface RoomCardProps {
  title: string;
  description: string;
  price: string;
  beds: number;
  bathrooms: number;
  occupancy: number;
  amenities: number;
}

const RoomCard = ({ 
  title, 
  description, 
  price, 
  beds, 
  bathrooms, 
  occupancy, 
  amenities 
}: RoomCardProps) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <img 
          src={roomImage} 
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-hotel-warm text-hotel-warm-foreground px-3 py-1 rounded-full text-sm font-medium">
          {price}
        </div>
        <div className="absolute top-4 right-4 flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full opacity-70" />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{occupancy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4" />
            <span>{amenities}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;