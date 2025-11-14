import { Button } from "@/utils/button";
import { Card, CardContent } from "@/utils/card";
import { Badge } from "@/utils/badge";
import { Reservation } from "@/types/reservation";
import { Calendar, Users, Clock } from "lucide-react";

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  onCheckout?: (id: string) => void;
}

const CLOUDINARY_BASE = "https://res.cloudinary.com/dxrsrhqqn/image/upload/";

const ReservationCard = ({ reservation, onCancel, onCheckout }: ReservationCardProps) => {

  // ✅ FIX: Put image URL logic here
  // const imageUrl = reservation.roomImage
  //   ? `${CLOUDINARY_BASE}${reservation.roomImage}`
  //   : "/rooms/default.jpg";
  const rawImage = reservation.room_image || reservation.roomImage;

// If backend gives full URL, use it directly
const imageUrl = rawImage?.startsWith("http")
  ? rawImage
  : rawImage
    ? `${CLOUDINARY_BASE}${rawImage}`
    : "/rooms/default.jpg";


  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
      case "booked":
      case "confirmed":
      case "checked_in":
        return "bg-green-100 text-green-700";
      case "past":
      case "checked_out":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const canAct =
    reservation.status === "upcoming" ||
    reservation.status === "booked" ||
    reservation.status === "confirmed" ||
    reservation.status === "checked_in";

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col md:flex-row gap-6">

        {/* ROOM IMAGE */}
        <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={reservation.roomType || "Room"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ROOM DETAILS */}
        <div className="flex-1 flex flex-col md:flex-row md:justify-between">

          <div>
            <h3 className="font-semibold text-foreground">
              {reservation.roomType || "Standard Room"}
            </h3>

            <Badge className={getStatusColor(reservation.status)}>
              {reservation.status}
            </Badge>

            <p className="text-sm text-muted-foreground">
              Guest: {reservation.guestName}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> <span>{reservation.checkIn}</span>
              <Clock className="h-4 w-4" /> <span>{reservation.checkOut || "N/A"}</span>
              <Users className="h-4 w-4" /> <span>{reservation.guests}</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3 items-end">
            <p className="text-2xl font-bold">₹ {reservation.price}</p>

            {canAct && (
              <div className="flex gap-2">
                {onCheckout && (
                  <Button onClick={() => onCheckout(reservation.id)}>Check Out</Button>
                )}
                {onCancel && (
                  <Button onClick={() => onCancel(reservation.id)}>Cancel</Button>
                )}
              </div>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
