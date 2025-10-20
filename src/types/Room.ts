// src/types/Room.ts
export interface Room {
  room_id: number;
  room_number: string;
  title: string;
  room_type: "Standard" | "Deluxe" | "Luxury"; // ✅ add this
  description: string;
  category: "Standard" | "Deluxe" | "Luxury";

  price_per_night: number;
  price_range_min?: number;
  price_range_max?: number;
  price_range_display: string;

  status: "Vacant" | "Occupied" | "Dirty" | "Maintenance";
  amenities: {
    beds: number;
    bathrooms: number;
    parking: number;
    guests: number;

    // Room amenities
    television: boolean;
    wifi: boolean;
    washer: boolean;
    balcony: boolean;
    airCondition: boolean;
    kitchen: boolean;
  };

  // Safety
  sanitizers: boolean;
  fire_extinguisher: boolean;
  daily_cleaning: boolean;

  rating: number;
  isFavorite: boolean;

  // Images
  image: string;
  additional_images: string[];

  // Timestamps
  created_at: string;
  updated_at: string;
}
