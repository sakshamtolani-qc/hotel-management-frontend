import { create } from "zustand";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  reset: () => void;
  logout: () => void;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

// Helper functions for localStorage
const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token');
};

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('auth-user');
  return stored ? JSON.parse(stored) : null;
};

const setStoredToken = (token: string | null): void => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('auth-token', token);
  } else {
    localStorage.removeItem('auth-token');
  }
};

const setStoredUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('auth-user', JSON.stringify(user));
  } else {
    localStorage.removeItem('auth-user');
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,

  setUser: (user) => {
    setStoredUser(user);
    set({ user });
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setToken: (token) => {
    setStoredToken(token);
    set({ token });
  },

  clearError: () => set({ error: null }),

  reset: () => {
    setStoredToken(null);
    setStoredUser(null);
    set(initialState);
  },

  logout: () => {
    setStoredToken(null);
    setStoredUser(null);
    set({ token: null, user: null });
  },

  // Initialize from localStorage
  initialize: () => {
    const token = getStoredToken();
    const user = getStoredUser();
    set({ token, user });
  },
}));