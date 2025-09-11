
export type Room = {
  id: number;
  title: string;
  description: string;
  priceRange: string;
  image: string;
  status?: "Dirty" | "Occupied" | "Vacant";
  category: "Standard" | "Deluxe" | "Luxury";
  amenities: {
    beds: number;
    guests: number;
    bathrooms: number;
    rating: number;
  };
  isFavorite: boolean;
};

export const mockRooms: Room[] = [
  {
    id: 1,
    title: "Room No. 1",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/bedroom.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 2,
    title: "Room No. 2",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/deluxe-room-2.jpg",
    status: "Vacant",
    category: "Deluxe",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 3,
    title: "Room No. 3",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/luxury-room-2.jpg",
    status: "Vacant",
    category: "Luxury",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 4,
    title: "Room No. 5",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/standard-room-2.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 5,
    title: "Room No. 6",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/bedroom.jpg",
    status: "Dirty",
    category: "Deluxe",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 6,
    title: "Room No. 7",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/bedroom.jpg",
    status: "Occupied",
    category: "Luxury",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 7,
    title: "Room No. 8",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/bedroom.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 8,
    title: "Room No. 9",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/bedroom.jpg",
    status: "Occupied",
    category: "Deluxe",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
  {
    id: 9,
    title: "Room No. 10",
    description: "Lorem ipsum",
    priceRange: "₹ 1000 - 5000 INR",
    image: "/standard-room-2.jpg",
    status: "Vacant",
    category: "Luxury",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 0 },
    isFavorite: false,
  },
];

export default mockRooms;
