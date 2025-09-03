import { type ReactNode, createContext, useContext } from "react";
import { useAuthStore } from "../store/useStore";

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, user?: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, user, setToken, setUser, logout } = useAuthStore();

  const login = (token: string, user?: any) => {
    setToken(token);
    if (user) setUser(user);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
