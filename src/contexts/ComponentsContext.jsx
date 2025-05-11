import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, setData } from "../utils/localStorageUtils";

const initialComponents = [
  {
    id: "c1",
    shipId: "s1",
    name: "Main Engine",
    serialNumber: "ME-1234",
    installDate: "2020-01-10",
    lastMaintenanceDate: "2024-03-12",
  },
  {
    id: "c2",
    shipId: "s2",
    name: "Radar",
    serialNumber: "RAD-5678",
    installDate: "2021-07-18",
    lastMaintenanceDate: "2023-12-01",
  },
];

const ComponentsContext = createContext();
export const useComponents = () => useContext(ComponentsContext);

export function ComponentsProvider({ children }) {
  useEffect(() => {
    if (!getData("components")) setData("components", initialComponents);
  }, []);

  const [components, setComponents] = useState(getData("components") || []);

  const save = (next) => {
    setComponents(next);
    setData("components", next);
  };

  const addComponent = (comp) => save([...components, comp]);
  const updateComponent = (id, data) =>
    save(components.map((c) => (c.id === id ? { ...c, ...data } : c)));
  const deleteComponent = (id) => save(components.filter((c) => c.id !== id));

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
}
