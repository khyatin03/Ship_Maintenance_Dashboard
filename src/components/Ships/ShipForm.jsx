import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";

export default function ShipForm({ ship }) {
  const isEdit = Boolean(ship);
  const [form, setForm] = useState(
    ship || { id: `s${Date.now()}`, name: "", imo: "", flag: "", status: "Active" }
  );
  const { addShip, updateShip } = useShips();
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) updateShip(ship.id, form);
    else addShip(form);
    nav("/ships");
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEdit ? "Edit" : "Add"} Ship</h3>
      {["name", "imo", "flag", "status"].map((field) => (
        <label key={field}>
          {field.toUpperCase()}
          <input name={field} value={form[field]} onChange={handleChange} required />
        </label>
      ))}
      <button className="btn-primary" type="submit">
        Save
      </button>
    </form>
  );
}