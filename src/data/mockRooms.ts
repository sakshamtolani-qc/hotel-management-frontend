
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
    title: "Standard Single Room",
    description: "Comfortable single room with modern amenities, perfect for business travelers and solo guests.",
    priceRange: "₹ 1,500 - 2,500 INR",
    image: "/bedroom.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 4.2 },
    isFavorite: false,
  },
  {
    id: 2,
    title: "Deluxe Double Room",
    description: "Spacious deluxe room with premium furnishings, ideal for couples and small families.",
    priceRange: "₹ 3,000 - 4,500 INR",
    image: "/deluxe-room-2.jpg",
    status: "Vacant",
    category: "Deluxe",
    amenities: { beds: 2, guests: 2, bathrooms: 1, rating: 4.5 },
    isFavorite: false,
  },
  {
    id: 3,
    title: "Luxury Suite",
    description: "Elegant luxury suite with separate living area, premium amenities, and stunning city views.",
    priceRange: "₹ 5,000 - 8,000 INR",
    image: "/luxury-room-2.jpg",
    status: "Vacant",
    category: "Luxury",
    amenities: { beds: 2, guests: 4, bathrooms: 2, rating: 4.8 },
    isFavorite: false,
  },
  {
    id: 4,
    title: "Standard Twin Room",
    description: "Two single beds in a standard room, perfect for friends traveling together.",
    priceRange: "₹ 2,000 - 3,000 INR",
    image: "/standard-room-2.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 2, guests: 2, bathrooms: 1, rating: 4.1 },
    isFavorite: false,
  },
  {
    id: 5,
    title: "Deluxe Family Room",
    description: "Large family room with connecting beds, perfect for families with children.",
    priceRange: "₹ 3,500 - 5,000 INR",
    image: "/bedroom.jpg",
    status: "Dirty",
    category: "Deluxe",
    amenities: { beds: 3, guests: 4, bathrooms: 1, rating: 4.3 },
    isFavorite: false,
  },
  {
    id: 6,
    title: "Presidential Suite",
    description: "Ultimate luxury with panoramic views, private balcony, and exclusive butler service.",
    priceRange: "₹ 10,000 - 15,000 INR",
    image: "/bedroom.jpg",
    status: "Occupied",
    category: "Luxury",
    amenities: { beds: 1, guests: 2, bathrooms: 2, rating: 4.9 },
    isFavorite: false,
  },
  {
    id: 7,
    title: "Executive Room",
    description: "Business-class room with work desk, high-speed internet, and complimentary breakfast.",
    priceRange: "₹ 2,500 - 3,500 INR",
    image: "/bedroom.jpg",
    status: "Vacant",
    category: "Standard",
    amenities: { beds: 1, guests: 1, bathrooms: 1, rating: 4.4 },
    isFavorite: false,
  },
  {
    id: 8,
    title: "Deluxe Garden View",
    description: "Beautiful room overlooking our garden with natural lighting and peaceful ambiance.",
    priceRange: "₹ 3,200 - 4,800 INR",
    image: "/bedroom.jpg",
    status: "Occupied",
    category: "Deluxe",
    amenities: { beds: 2, guests: 2, bathrooms: 1, rating: 4.6 },
    isFavorite: false,
  },
  {
    id: 9,
    title: "Penthouse Suite",
    description: "Exclusive penthouse with private terrace, jacuzzi, and 360-degree city views.",
    priceRange: "₹ 12,000 - 20,000 INR",
    image: "/standard-room-2.jpg",
    status: "Vacant",
    category: "Luxury",
    amenities: { beds: 2, guests: 4, bathrooms: 3, rating: 5.0 },
    isFavorite: false,
  },
];

export default mockRooms;
