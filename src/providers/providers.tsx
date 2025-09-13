import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useAuthStore } from "../store/useStore";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
}

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    token,
    setToken,
    user,
    setUser,
    isLoading,
    setIsLoading,
    error,
    setError,
    clearError,
    logout,
    initialize,
  } = useAuthStore();

  // Initialize store from localStorage on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // ✅ Replace with your real backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // --- LOGIN ---
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    clearError();

    try {
      // For demo purposes, simulate login without API call
      const demoUser = {
        id: 1,
        firstName: "Demo",
        lastName: "User",
        email: email,
        role: "admin"
      };

      const demoToken = "demo-token-" + Date.now();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setToken(demoToken);
      setUser(demoUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- SIGNUP ---
  const signup = async (userData: SignupData): Promise<void> => {
    setIsLoading(true);
    clearError();

    try {
      // For demo purposes, simulate signup without API call
      const demoUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: "user"
      };

      const demoToken = "demo-token-" + Date.now();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setToken(demoToken);
      setUser(demoUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // --- CHECK TOKEN ON MOUNT ---
  useEffect(() => {
    // Add a small delay to ensure hydration is complete
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Invalid token - clear it
            setToken(null);
          }
        } catch (error) {
          // Network error or invalid token
          setToken(null);
        }
      }
    };

    // Small delay to avoid hydration mismatch
    const timer = setTimeout(verifyToken, 100);
    return () => clearTimeout(timer);
  }, [token, setUser, setToken, API_BASE_URL]);

  const value: AuthContextType = {
    token,
    user,
    login,
    signup,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};