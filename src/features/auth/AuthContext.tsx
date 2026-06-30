import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { getToken, setToken, clearToken } from "../../utils/tokenStorage";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  loginWithToken: (token: string) => void;
  logout: () => void;
}

// undefined by default so we can detect if useAuth is called outside the provider
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // initialize from localStorage so the user stays logged in after a page refresh
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const loginWithToken = (newToken: string) => {
    setToken(newToken); // persist to localStorage
    setTokenState(newToken); 
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  const value: AuthContextValue = {
    token,
    isAuthenticated: Boolean(token), // true whenever we have a token
    loginWithToken,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// throws if someone forgets to wrap the app in AuthProvider
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}