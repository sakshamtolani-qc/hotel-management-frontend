import { apiClient } from './config';
import { Room } from '../../data/mockRooms'; // Use existing Room interface

// API endpoints based on your Django URLs
const ROOMS_ENDPOINTS = {
  list: '/rooms/list/',
  create: '/rooms/create/',
  detail: (roomId: number) => `/rooms/${roomId}/detail/`,
  update: (roomId: number) => `/rooms/${roomId}/update/`,
  delete: (roomId: number) => `/rooms/${roomId}/delete/`,
  statistics: '/rooms/statistics/',
};

// Interface for AddRoomPage form data
interface AddRoomFormData {
  roomNo: string;
  priceRange: string;
  facilities: {
    beds: number;
    bathrooms: number;
    parking: number;
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
  images: Array<{file: File, preview: string, id: string}>;
}

/**
 * Rooms API Service - matches your existing frontend structure
 */
export class RoomsService {
  /**
   * Get list of all rooms
   */
  static async getRooms(): Promise<Room[]> {
    try {
      const response = await apiClient.get(ROOMS_ENDPOINTS.list);
      // Backend returns {results: Room[]} format, extract the results array
      return response.data.results || response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Failed to fetch rooms. Please try again.');
    }
  }

  /**
   * Get a specific room by ID
   */
  static async getRoom(roomId: number): Promise<Room> {
    try {
      const response = await apiClient.get(ROOMS_ENDPOINTS.detail(roomId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching room ${roomId}:`, error);
      throw new Error('Failed to fetch room details. Please try again.');
    }
  }

  /**
   * Create a new room from AddRoomPage form data
   */
  static async createRoom(formData: AddRoomFormData): Promise<Room> {
    try {
      // Transform form data to match backend expectations
      const roomData = {
        room_number: formData.roomNo,
        title: `Room ${formData.roomNo}`, // Generate title from room number
        description: formData.roomDescription,
        category: "Standard", // Default category, can be enhanced later
        price_range_display: formData.priceRange,
        price_per_night: RoomsService.extractPriceFromRange(formData.priceRange),
        beds: formData.facilities.beds,
        bathrooms: formData.facilities.bathrooms,
        parking: formData.facilities.parking,
        guests: formData.facilities.beds, // Assume guests = beds for now
        television: formData.amenities.television,
        wifi: formData.amenities.wifi,
        washer: formData.amenities.washer,
        balcony: formData.amenities.balcony,
        air_condition: formData.amenities.airCondition,
        kitchen: formData.amenities.kitchen,
        sanitizers: formData.safety.sanitizers,
        fire_extinguisher: formData.safety.fireThrowers,
        daily_cleaning: formData.safety.dailyCleaner,
        rating: "4.0", // Default rating
        image: "/bedroom.jpg", // Default image for now
        additional_images: []
      };

      const response = await apiClient.post(ROOMS_ENDPOINTS.create, roomData);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      
      // Handle validation errors from Django
      if (error.response?.status === 400) {
        const errorMessage = RoomsService.extractErrorMessage(error.response.data);
        throw new Error(errorMessage);
      }
      
      throw new Error('Failed to create room. Please try again.');
    }
  }

  /**
   * Update an existing room
   */
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
        throw new Error('Room not found.');
      }
      
      throw new Error('Failed to update room. Please try again.');
    }
  }

  /**
   * Delete a room
   */
  static async deleteRoom(roomId: number): Promise<void> {
    try {
      await apiClient.delete(ROOMS_ENDPOINTS.delete(roomId));
    } catch (error) {
      console.error(`Error deleting room ${roomId}:`, error);
      
      if (error.response?.status === 404) {
        throw new Error('Room not found.');
      }
      
      throw new Error('Failed to delete room. Please try again.');
    }
  }

  /**
   * Toggle room favorite status
   */
  static async toggleFavorite(roomId: number): Promise<Room> {
    try {
      // First get current room data
      const currentRoom = await this.getRoom(roomId);
      
      // Update with opposite favorite status
      const updatedRoom = await this.updateRoom(roomId, {
        isFavorite: !currentRoom.isFavorite
      });
      
      return updatedRoom;
    } catch (error) {
      console.error(`Error toggling favorite for room ${roomId}:`, error);
      throw new Error('Failed to update favorite status. Please try again.');
    }
  }

  // Helper methods
  private static extractPriceFromRange(priceRange: string): string {
    // Extract first number from price range string like "₹ 1,500 - 2,500 INR"
    const match = priceRange.match(/[₹\s]*([0-9,]+)/);
    if (match) {
      return match[1].replace(/,/g, '');
    }
    return "1000"; // Default price
  }

  private static extractErrorMessage(errorData: any): string {
    // Extract meaningful error message from Django response
    if (typeof errorData === 'string') {
      return errorData;
    }
    
    if (errorData.detail) {
      return errorData.detail;
    }
    
    if (errorData.non_field_errors) {
      return errorData.non_field_errors[0] || 'Invalid data provided.';
    }
    
    // Extract first field error
    for (const field in errorData) {
      if (Array.isArray(errorData[field]) && errorData[field].length > 0) {
        return `${field}: ${errorData[field][0]}`;
      }
    }
    
    return 'Invalid room data provided.';
  }
}

// Export individual functions for easier importing
export const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  toggleFavorite
} = RoomsService;