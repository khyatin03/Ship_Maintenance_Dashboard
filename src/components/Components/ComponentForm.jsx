import React, { useState } from "react";
import { useComponents } from "../../contexts/ComponentsContext";

export default function ComponentForm({ shipId }) {
  const { addComponent } = useComponents();
  const [form, setForm] = useState({
    id: `c${Date.now()}`,
    shipId,
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComponent(form);
    setForm({ ...form, id: `c${Date.now()}`, name: "", serialNumber: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h4>Add Component</h4>
      {["name", "serialNumber", "installDate", "lastMaintenanceDate"].map((f) => (
        <label key={f}>
          {f}
          <input
            name={f}
            type={f.includes("Date") ? "date" : "text"}
            value={form[f]}
            onChange={handleChange}
            required
          />
        </label>
      ))}
      <button className="btn-primary">Add</button>
    </form>
  );
}