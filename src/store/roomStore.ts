import { create } from 'zustand';
import standardRoomImage from '@/assets/standard-room-2.jpg';
import deluxeRoomImage from '@/assets/deluxe-room-2.jpg';
import luxuryRoomImage from '@/assets/luxury-room-2.jpg';

export type RoomStatus = 'vacant' | 'occupied' | 'dirty';
export type RoomCategory = 'standard' | 'deluxe' | 'luxury';

export interface Room {
  id: string;
  number: string;
  category: RoomCategory;
  status: RoomStatus;
  price: number;
  image: string;
  amenities: {
    wifi: boolean;
    bed: boolean;
    person: boolean;
  };
}

export interface PriceFilter {
  min: number;
  max: number;
}

export interface AmenityFilter {
  wifi: boolean;
  bed: boolean;
  person: boolean;
}

interface RoomState {
  rooms: Room[];
  selectedStatus: RoomStatus | 'all';
  searchQuery: string;
  priceFilter: PriceFilter;
  amenityFilter: AmenityFilter;
  setSelectedStatus: (status: RoomStatus | 'all') => void;
  setSearchQuery: (query: string) => void;
  setPriceFilter: (filter: PriceFilter) => void;
  setAmenityFilter: (filter: AmenityFilter) => void;
  resetFilters: () => void;
  getFilteredRooms: () => Room[];
  getPriceRange: () => { min: number; max: number };
}

const mockRooms: Room[] = [
  // Standard Rooms
  {
    id: '101',
    number: '101',
    category: 'standard',
    status: 'vacant',
    price: 160.0,
    image: standardRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },
  {
    id: '102',
    number: '102',
    category: 'standard',
    status: 'occupied',
    price: 120.0,
    image: standardRoomImage,
    amenities: { wifi: true, bed: true, person: true }
  },
  {
    id: '103',
    number: '103',
    category: 'standard',
    status: 'occupied',
    price: 135.0,
    image: standardRoomImage,
    amenities: { wifi: true, bed: true, person: true }
  },
  {
    id: '104',
    number: '104',
    category: 'standard',
    status: 'vacant',
    price: 135.0,
    image: standardRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },

  // Deluxe Rooms
  {
    id: '105',
    number: '105',
    category: 'deluxe',
    status: 'occupied',
    price: 200.0,
    image: deluxeRoomImage,
    amenities: { wifi: true, bed: true, person: true }
  },
  {
    id: '106',
    number: '106',
    category: 'deluxe',
    status: 'dirty',
    price: 250.0,
    image: deluxeRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },
  {
    id: '107',
    number: '107',
    category: 'deluxe',
    status: 'vacant',
    price: 240.0,
    image: deluxeRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },
  {
    id: '108',
    number: '108',
    category: 'deluxe',
    status: 'vacant',
    price: 250.0,
    image: deluxeRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },

  // Luxury Rooms
  {
    id: '201',
    number: '201',
    category: 'luxury',
    status: 'occupied',
    price: 400.0,
    image: luxuryRoomImage,
    amenities: { wifi: true, bed: true, person: true }
  },
  {
    id: '202',
    number: '202',
    category: 'luxury',
    status: 'vacant',
    price: 450.0,
    image: luxuryRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  },
  {
    id: '203',
    number: '203',
    category: 'luxury',
    status: 'occupied',
    price: 500.0,
    image: luxuryRoomImage,
    amenities: { wifi: true, bed: true, person: true }
  },
  {
    id: '204',
    number: '204',
    category: 'luxury',
    status: 'dirty',
    price: 380.0,
    image: luxuryRoomImage,
    amenities: { wifi: true, bed: true, person: false }
  }
];

export const useRoomStore = create<RoomState>((set, get) => {
  // Calculate initial price range from rooms
  const prices = mockRooms.map(room => room.price);
  const initialPriceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };

  return {
    rooms: mockRooms,
    selectedStatus: 'all',
    searchQuery: '',
    priceFilter: initialPriceRange,
    amenityFilter: { wifi: false, bed: false, person: false },
  
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPriceFilter: (filter) => set({ priceFilter: filter }),
  setAmenityFilter: (filter) => set({ amenityFilter: filter }),
  
  resetFilters: () => {
    const { rooms } = get();
    const prices = rooms.map(room => room.price);
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
    
    set({ 
      selectedStatus: 'all',
      searchQuery: '',
      priceFilter: priceRange,
      amenityFilter: { wifi: false, bed: false, person: false }
    });
  },
  
  getPriceRange: () => {
    const { rooms } = get();
    const prices = rooms.map(room => room.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  },
  
  getFilteredRooms: () => {
    const { rooms, selectedStatus, searchQuery, priceFilter, amenityFilter } = get();
    let filtered = [...rooms];
    
    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(room => room.status === selectedStatus);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(room => 
        room.number.toLowerCase().includes(query) ||
        room.category.toLowerCase().includes(query) ||
        room.status.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(room => 
      room.price >= priceFilter.min && room.price <= priceFilter.max
    );
    
    // Filter by amenities (if any amenity filter is enabled)
    const hasAmenityFilters = amenityFilter.wifi || amenityFilter.bed || amenityFilter.person;
    if (hasAmenityFilters) {
      filtered = filtered.filter(room => {
        return (!amenityFilter.wifi || room.amenities.wifi) &&
               (!amenityFilter.bed || room.amenities.bed) &&
               (!amenityFilter.person || room.amenities.person);
      });
    }
    
    return filtered;
  }
}});