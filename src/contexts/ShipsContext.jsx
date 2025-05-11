import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, setData } from "../utils/localStorageUtils";

const initialShips = [
  { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
  { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" },
];

const ShipsContext = createContext();
export const useShips = () => useContext(ShipsContext);

export function ShipsProvider({ children }) {
  useEffect(() => {
    if (!getData("ships")) setData("ships", initialShips);
  }, []);

  const [ships, setShips] = useState(getData("ships") || []);

  const save = (newShips) => {
    setShips(newShips);
    setData("ships", newShips);
  };

  const addShip = (ship) => save([...ships, ship]);
  const updateShip = (id, data) => save(ships.map((s) => (s.id === id ? { ...s, ...data } : s)));
  const deleteShip = (id) => save(ships.filter((s) => s.id !== id));

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
}
