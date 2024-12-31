import { createContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);