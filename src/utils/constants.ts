export const ROUTES = {
  DASHBOARD: '/dashboard',
  RESERVATIONS: '/api/reservations',
  LOGIN: '/login',
  SIGNUP: '/signup'
} as const;

export const API_ENDPOINTS = {
  METRICS: '/api/metrics',
  HOTEL_ANALYTICS: '/api/hotel-analytics',
  ROOM_ACTIVITY: '/api/room-activity'
} as const;

export const COLORS = {
  PRIMARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    900: '#0f172a'
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a'
  },
  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706'
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626'
  }
} as const;