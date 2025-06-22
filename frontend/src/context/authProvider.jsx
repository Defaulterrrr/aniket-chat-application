import { useState, createContext, useContext, useMemo } from "react";
import cookies from "js-cookie";
// This file creates a context for managing authentication state
// and provides a way to access the current authenticated user.

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState =
    cookies.get("jwt") || localStorage.getItem("ChatAppUser");
  const [authUser, setAuthUser] = useState(
    initialState ? JSON.parse(initialState) : undefined
  );

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => [authUser, setAuthUser], [authUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
