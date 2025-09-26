// AdminAuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adminProfile")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (admin) {
      localStorage.setItem("adminProfile", JSON.stringify(admin));
    } else {
      localStorage.removeItem("adminProfile");
    }
  }, [admin]);

  const login = ({ token, profile }) => {
    localStorage.setItem("adminToken", token);
    setAdmin(profile);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminProfile");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
