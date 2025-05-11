import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, setData } from "../utils/localStorageUtils";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const seedUsers = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
];

export function AuthProvider({ children }) {
  useEffect(() => {
    if (!getData("users")) setData("users", seedUsers);
  }, []);

  const [user, setUser] = useState(getData("sessionUser") || null);

  const login = (email, password) => {
    const users = getData("users") || [];
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setData("sessionUser", found);
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("sessionUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
