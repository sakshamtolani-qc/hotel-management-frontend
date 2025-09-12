import { Reservation } from '@/types/reservation';
import singleRoom from "@/assets/rooms/single.jpg";
import doubleRoom from "@/assets/rooms/double.jpg";
export const mockReservations: Reservation[] = [
  {
    id: '1',
    guestName: 'John Smith',
    roomType: 'Standard Single Room',
    roomImage: singleRoom,
    checkIn: '5 Sept 2025',
    checkOut: '6 Sept 2025',
    duration: 'Short (0 - 1 days)',
    guests: 1,
    price: 2000,
    status: 'upcoming',
    createdAt: '2024-09-01'
  },
  {
    id: '2',
    guestName: 'Sarah Johnson',
    roomType: 'Deluxe Double Room',
    roomImage: doubleRoom,
    checkIn: '12 Sept 2025',
    checkOut: '17 Sept 2025',
    duration: 'Long (2 - 5 days)',
    guests: 2,
    price: 3750,
    status: 'upcoming',
    createdAt: '2024-09-02'
  },
  {
    id: '3',
    guestName: 'Michael Brown',
    roomType: 'Luxury Suite',
    roomImage: doubleRoom,
    checkIn: '15 Aug 2024',
    checkOut: '18 Aug 2024',
    duration: 'Medium (2 - 3 days)',
    guests: 2,
    price: 6500,
    status: 'past',
    createdAt: '2024-08-10'
  },
  {
    id: '4',
    guestName: 'Emily Davis',
    roomType: 'Executive Room',
    roomImage: singleRoom,
    checkIn: '20 Aug 2024',
    checkOut: '22 Aug 2024',
    duration: 'Short (1 - 2 days)',
    guests: 1,
    price: 3000,
    status: 'past',
    createdAt: '2024-08-15'
  },
  {
    id: '5',
    guestName: 'David Wilson',
    roomType: 'Presidential Suite',
    roomImage: singleRoom,
    checkIn: '10 Sept 2025',
    checkOut: '15 Sept 2025',
    duration: 'Long (4 - 5 days)',
    guests: 4,
    price: 12500,
    status: 'upcoming',
    createdAt: '2024-09-01'
  },
  {
    id: '6',
    guestName: 'Lisa Anderson',
    roomType: 'Deluxe Garden View',
    roomImage: doubleRoom,
    checkIn: '25 Aug 2024',
    checkOut: '28 Aug 2024',
    duration: 'Medium (2 - 3 days)',
    guests: 2,
    price: 4000,
    status: 'past',
    createdAt: '2024-08-20'
  },
  {
    id: '7',
    guestName: 'Robert Taylor',
    roomType: 'Penthouse Suite',
    roomImage: singleRoom,
    checkIn: '20 Sept 2025',
    checkOut: '25 Sept 2025',
    duration: 'Long (4 - 5 days)',
    guests: 4,
    price: 16000,
    status: 'upcoming',
    createdAt: '2024-09-05'
  },
  {
    id: '8',
    guestName: 'Maria Garcia',
    roomType: 'Standard Twin Room',
    roomImage: doubleRoom,
    checkIn: '30 Aug 2024',
    checkOut: '1 Sept 2024',
    duration: 'Short (1 - 2 days)',
    guests: 2,
    price: 2500,
    status: 'cancelled',
    createdAt: '2024-08-25'
  }
];