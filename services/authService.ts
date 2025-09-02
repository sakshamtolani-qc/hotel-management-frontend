import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '../types/auth';

//const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-api-endpoint.com';

const authAPI = axios.create({
  //baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.emailOrPhone === 'admin@test.com' && credentials.password === 'password') {
        const mockResponse = {
          success: true,
          token: 'mock-jwt-token-12345',
          user: {
            id: '1',
            email: credentials.emailOrPhone,
            name: 'Admin User'
          }
        };
        
        localStorage.setItem('authToken', mockResponse.token);
        return mockResponse;
      } else {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }
      
      // Uncomment this for real API integration:
      /*
      const response = await authAPI.post('/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        authAPI.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      return response.data;
      */
    } catch (error: any) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Login failed'
        };
      } else if (error.request) {
        return {
          success: false,
          message: 'Network error. Please check your connection.'
        };
      } else {
        return {
          success: false,
          message: 'An unexpected error occurred.'
        };
      }
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    delete authAPI.defaults.headers.common['Authorization'];
  },

  getStoredToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
};