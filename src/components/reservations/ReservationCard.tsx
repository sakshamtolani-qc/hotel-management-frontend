import React from "react";
import { Reservation } from "@/types/reservation";

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  onCheckout?: (id: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onCancel,
  onCheckout,
}) => {
  const { id, guestName, roomType, checkIn, checkOut, guests, price, status } = reservation;

  const isUpcoming = status === "pending" || status === "confirmed";
  const isPast = status === "past";
  const isCancelled = status === "cancelled";

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "past":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row gap-4">
      <img
        src={reservation.roomImage || "/placeholder.jpg"}
        alt={roomType}
        className="w-full md:w-48 h-32 object-cover rounded-md"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{roomType}</h3>
          <p className="text-sm text-gray-600">
            Guest: {guestName} | {guests} {guests > 1 ? "guests" : "guest"}
          </p>
          <p className="text-sm text-gray-600">
            Check-in: {checkIn} | Check-out: {checkOut}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold">₹ {price}</span>
          <div className="flex gap-2">
            {isUpcoming && onCancel && (
              <button
                onClick={() => onCancel(id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Cancel
              </button>
            )}
            {isUpcoming && onCheckout && (
              <button
                onClick={() => onCheckout(id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button>
            )}
          </div>
        </div>

        <div className="mt-2">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusBadge()}`}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
