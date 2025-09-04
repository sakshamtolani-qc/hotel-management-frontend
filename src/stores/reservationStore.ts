import { create } from 'zustand';

export interface Reservation {
  id: string;
  guestName: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out';
  guests: number;
  email: string;
  phone: string;
  totalAmount: number;
}

interface ReservationState {
  reservations: Reservation[];
  filteredReservations: Reservation[];
  searchTerm: string;
  statusFilter: string;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  
  // Actions
  setReservations: (reservations: Reservation[]) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setCurrentPage: (page: number) => void;
  filterReservations: () => void;
  addReservation: (reservation: Omit<Reservation, 'id'>) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
}

// Dummy data
const dummyReservations: Reservation[] = [
  {
    id: '1',
    guestName: 'John Smith',
    room: 'Deluxe Single Room',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    status: 'confirmed',
    guests: 1,
    email: 'john.smith@email.com',
    phone: '+1 234 567 8901',
    totalAmount: 4500,
  },
  {
    id: '2',
    guestName: 'Sarah Johnson',
    room: 'Executive Suite',
    checkIn: '2024-01-20',
    checkOut: '2024-01-23',
    status: 'pending',
    guests: 2,
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8902',
    totalAmount: 8900,
  },
  {
    id: '3',
    guestName: 'Michael Brown',
    room: 'Standard Room',
    checkIn: '2024-01-25',
    checkOut: '2024-01-27',
    status: 'checked-in',
    guests: 1,
    email: 'michael.brown@email.com',
    phone: '+1 234 567 8903',
    totalAmount: 3200,
  },
  {
    id: '4',
    guestName: 'Emily Davis',
    room: 'Family Suite',
    checkIn: '2024-01-28',
    checkOut: '2024-02-01',
    status: 'confirmed',
    guests: 4,
    email: 'emily.davis@email.com',
    phone: '+1 234 567 8904',
    totalAmount: 12000,
  },
  {
    id: '5',
    guestName: 'Robert Wilson',
    room: 'Deluxe Single Room',
    checkIn: '2024-02-05',
    checkOut: '2024-02-07',
    status: 'cancelled',
    guests: 1,
    email: 'robert.w@email.com',
    phone: '+1 234 567 8905',
    totalAmount: 4500,
  },
];

export const useReservationStore = create<ReservationState>((set, get) => ({
  reservations: dummyReservations,
  filteredReservations: dummyReservations,
  searchTerm: '',
  statusFilter: 'all',
  currentPage: 1,
  itemsPerPage: 5,
  isLoading: false,

  setReservations: (reservations) =>
    set({ reservations, filteredReservations: reservations }),

  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 1 });
    get().filterReservations();
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status, currentPage: 1 });
    get().filterReservations();
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  filterReservations: () => {
    const { reservations, searchTerm, statusFilter } = get();
    let filtered = [...reservations];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reservation.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((reservation) => reservation.status === statusFilter);
    }

    set({ filteredReservations: filtered });
  },

  addReservation: (newReservation) => {
    const reservation: Reservation = {
      ...newReservation,
      id: Date.now().toString(),
    };
    set((state) => ({
      reservations: [reservation, ...state.reservations],
    }));
    get().filterReservations();
  },

  updateReservationStatus: (id, status) => {
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      ),
    }));
    get().filterReservations();
  },
}));