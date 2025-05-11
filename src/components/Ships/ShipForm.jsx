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
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .ship-form {
            font-family: 'Poppins', sans-serif;
            max-width: 400px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }

          .ship-form h3 {
            margin-bottom: 1rem;
            font-weight: 600;
            font-size: 1.25rem;
            text-align: center;
          }

          .ship-form label {
            display: block;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #333;
          }

          .ship-form input {
            width: 100%;
            padding: 0.6rem;
            margin-top: 0.4rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.95rem;
          }

          .ship-form button {
            display: block;
            width: 100%;
            padding: 0.75rem;
            background-color: #111;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .ship-form button:hover {
            background-color: #333;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="ship-form">
        <h3>{isEdit ? "Edit" : "Add"} Ship</h3>
        {["name", "imo", "flag", "status"].map((field) => (
          <label key={field}>
            {field.toUpperCase()}
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </label>
        ))}
        <button type="submit">Save</button>
      </form>
    </>
  );
}
