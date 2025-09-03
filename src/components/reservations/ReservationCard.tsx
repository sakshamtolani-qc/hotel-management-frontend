import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/types/reservation';
import { Calendar, Users, Clock } from 'lucide-react';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel?: (id: string) => void;
  onCheckout?: (id: string) => void;
}

const ReservationCard = ({ reservation, onCancel, onCheckout }: ReservationCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-success text-success-foreground';
      case 'past':
        return 'bg-muted text-muted-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Room Image */}
          <div className="w-full md:w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={reservation.roomImage} 
              alt={reservation.roomType}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Reservation Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{reservation.roomType}</h3>
                  <Badge className={getStatusColor(reservation.status)} variant="secondary">
                    {reservation.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">Guest: {reservation.guestName}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Check In: {reservation.checkIn}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Duration: {reservation.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Guests: {reservation.guests}</span>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col md:items-end gap-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">₹ {reservation.price}</p>
                </div>
                
                {reservation.status === 'upcoming' && (
                  <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    {onCheckout && (
                      <Button 
                        variant="checkout" 
                        size="sm"
                        onClick={() => onCheckout(reservation.id)}
                        className="w-full md:w-auto"
                      >
                        Check Out
                      </Button>
                    )}
                    {onCancel && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onCancel(reservation.id)}
                        className="w-full md:w-auto"
                      >
                        Cancel Reservation
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;