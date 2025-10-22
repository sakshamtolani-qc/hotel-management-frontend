// src/services/api/RoomsService.ts

import axios from "axios";
import { Room } from "../../types/Room";

// ----------------------
// Axios API client setup
// ----------------------
export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Django base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: add interceptors for debugging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// ----------------------
// API endpoints
// ----------------------
const ROOMS_ENDPOINTS = {
  list: "/rooms/list/",
  create: "/rooms/create/",
  detail: (roomId: number) => `/rooms/${roomId}/detail/`,
  update: (roomId: number) => `/rooms/${roomId}/update/`,
  delete: (roomId: number) => `/rooms/${roomId}/delete/`,
  statistics: "/rooms/statistics/",
};

// ----------------------
// AddRoomPage form data
// ----------------------
export interface AddRoomFormData {
  roomNo: string;
  title?: string;
  category?: "Standard" | "Deluxe" | "Luxury";
  price_per_night: number;
  priceRange?: string; // optional, display only
  facilities: {
    beds: number;
    bathrooms: number;
    parking: number;
    guests: number;
  };
  amenities: {
    television: boolean;
    wifi: boolean;
    washer: boolean;
    balcony: boolean;
    airCondition: boolean;
    kitchen: boolean;
  };
  safety: {
    sanitizers: boolean;
    fireThrowers: boolean;
    dailyCleaner: boolean;
  };
  roomDescription: string;
  images: Array<{ file: File; preview: string; id: string }>;
}

// ----------------------
// Rooms API Service
// ----------------------
export class RoomsService {
  // ----------------------
  // Get all rooms
  // ----------------------
  static async getRooms(): Promise<Room[]> {
    try {
      const response = await apiClient.get(ROOMS_ENDPOINTS.list);
      let roomsData = response.data.results || response.data;

      // Normalize backend data (convert strings to numbers/booleans)
      roomsData = roomsData.map((room: any): Room => ({
        ...room,
        beds: Number(room.beds ?? 0),
        bathrooms: Number(room.bathrooms ?? 0),
        parking: Number(room.parking ?? 0),
        guests: Number(room.guests ?? 0),
        price_per_night: Number(room.price_per_night ?? 0),
        rating: Number(room.rating ?? 0),

        television: room.television === true || room.television === "true",
        wifi: room.wifi === true || room.wifi === "true",
        washer: room.washer === true || room.washer === "true",
        balcony: room.balcony === true || room.balcony === "true",
        air_condition: room.air_condition === true || room.air_condition === "true",
        kitchen: room.kitchen === true || room.kitchen === "true",
        sanitizers: room.sanitizers === true || room.sanitizers === "true",
        fire_extinguisher: room.fire_extinguisher === true || room.fire_extinguisher === "true",
        daily_cleaning: room.daily_cleaning === true || room.daily_cleaning === "true",

        additional_images: Array.isArray(room.additional_images)
          ? room.additional_images
          : [],

        category: room.category || room.room_type || "Standard",
        room_type: room.room_type || room.category || "Standard",
        status: room.status || "Vacant",
        price_range_display: room.price_range_display || `₹${room.price_per_night} per night`,
      }));

      return roomsData;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw new Error("Failed to fetch rooms. Please try again.");
    }
  }

  // ----------------------
  // Get specific room
  // ----------------------
  static async getRoom(roomId: number): Promise<Room> {
    try {
      const response = await apiClient.get(ROOMS_ENDPOINTS.detail(roomId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${roomId}:`, error);
      throw new Error("Failed to fetch room details. Please try again.");
    }
  }

  // ----------------------
  // Create a new room
  // Supports optional upload progress callback
  // ----------------------
  static async createRoom(
    formData: AddRoomFormData,
    onUploadProgress?: (progress: number) => void
  ): Promise<Room> {
    try {
      const multipartData = new FormData();

      // Basic info
      multipartData.append("roomNo", formData.roomNo);
      multipartData.append("title", formData.title || `Room ${formData.roomNo}`);
      multipartData.append("roomDescription", formData.roomDescription);
      multipartData.append("category", formData.category || "Standard");
      multipartData.append("price_per_night", formData.price_per_night.toString());
      multipartData.append("price_range_min", formData.price_per_night.toString());
      multipartData.append("price_range_max", formData.price_per_night.toString());

      // Facilities
      multipartData.append("beds", formData.facilities.beds.toString());
      multipartData.append("bathrooms", formData.facilities.bathrooms.toString());
      multipartData.append("parking", formData.facilities.parking.toString());
      multipartData.append("guests", formData.facilities.guests.toString());

      // Amenities
      multipartData.append("television", String(formData.amenities.television));
      multipartData.append("wifi", String(formData.amenities.wifi));
      multipartData.append("washer", String(formData.amenities.washer));
      multipartData.append("balcony", String(formData.amenities.balcony));
      multipartData.append("air_condition", String(formData.amenities.airCondition));
      multipartData.append("kitchen", String(formData.amenities.kitchen));

      // Safety
      multipartData.append("sanitizers", String(formData.safety.sanitizers));
      multipartData.append("fire_extinguisher", String(formData.safety.fireThrowers));
      multipartData.append("daily_cleaning", String(formData.safety.dailyCleaner));

      // Default rating
      multipartData.append("rating", "4.0");

      // Images
      if (formData.images && formData.images.length > 0) {
        multipartData.append("image", formData.images[0].file);
        formData.images.slice(1).forEach((img) =>
          multipartData.append("additional_images", img.file)
        );
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/rooms/create/",
        multipartData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (onUploadProgress && progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onUploadProgress(percentCompleted);
            }
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("❌ Error creating room:", error);

      if (error.response?.status === 400) {
        const errorMessage = RoomsService.extractErrorMessage(error.response.data);
        throw new Error(errorMessage);
      }

      throw new Error("Failed to create room. Please try again.");
    }
  }

  // ----------------------
  // Update a room
  // ----------------------
  static async updateRoom(roomId: number, roomData: Partial<Room>): Promise<Room> {
    try {
      const response = await apiClient.patch(ROOMS_ENDPOINTS.update(roomId), roomData);
      return response.data;
    } catch (error) {
      console.error(`Error updating room ${roomId}:`, error);

      if (error.response?.status === 400) {
        const errorMessage = RoomsService.extractErrorMessage(error.response.data);
        throw new Error(errorMessage);
      }

      if (error.response?.status === 404) {
        throw new Error("Room not found.");
      }

      throw new Error("Failed to update room. Please try again.");
    }
  }

  // ----------------------
  // Delete a room
  // ----------------------
  static async deleteRoom(roomId: number): Promise<void> {
    try {
      await apiClient.delete(ROOMS_ENDPOINTS.delete(roomId));
    } catch (error) {
      console.error(`Error deleting room ${roomId}:`, error);

      if (error.response?.status === 404) {
        throw new Error("Room not found.");
      }

      throw new Error("Failed to delete room. Please try again.");
    }
  }

  // ----------------------
  // Toggle room favorite status
  // ----------------------
  static async toggleFavorite(roomId: number): Promise<Room> {
    try {
      const currentRoom = await this.getRoom(roomId);
      const updatedRoom = await this.updateRoom(roomId, {
        isFavorite: !currentRoom.isFavorite,
      });
      return updatedRoom;
    } catch (error) {
      console.error(`Error toggling favorite for room ${roomId}:`, error);
      throw new Error("Failed to update favorite status. Please try again.");
    }
  }

  // ----------------------
  // Helper: extract first number from price range string
  // ----------------------
  private static extractPriceFromRange(priceRange: string): string {
    const match = priceRange.match(/[₹\s]*([0-9,]+)/);
    if (match) {
      return match[1].replace(/,/g, "");
    }
    return "1000"; // Default price
  }

  // ----------------------
  // Helper: parse Django error messages
  // ----------------------
  private static extractErrorMessage(errorData: any): string {
    if (typeof errorData === "string") return errorData;
    if (errorData.error) return errorData.details || errorData.error;
    if (errorData.detail) return errorData.detail;
    if (errorData.details) return errorData.details;
    if (errorData.non_field_errors) return errorData.non_field_errors[0] || "Invalid data provided.";
    for (const field in errorData) {
      if (Array.isArray(errorData[field]) && errorData[field].length > 0) {
        return `${field}: ${errorData[field][0]}`;
      }
    }
    return "Invalid room data provided.";
  }
}

// ----------------------
// Export functions for easier importing
// ----------------------
export const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  toggleFavorite,
} = RoomsService;
