import React, { createContext, useContext, useState } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = (m = "signin") => {
    setMode(m);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const signIn = () => {
    setIsAuthenticated(true);
    setOpen(false);
  };
  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthModalContext.Provider value={{ open, mode, openModal, closeModal, setMode, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
