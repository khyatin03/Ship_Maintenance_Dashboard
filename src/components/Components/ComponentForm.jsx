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
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .component-form {
            font-family: 'Poppins', sans-serif;
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .component-form h4 {
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
            font-weight: 600;
            text-align: center;
            color: #333;
          }

          .component-form label {
            display: block;
            margin-bottom: 1rem;
            font-size: 0.95rem;
            color: #333;
          }

          .component-form input {
            width: 100%;
            padding: 0.6rem;
            margin-top: 0.4rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.95rem;
            background-color: #f9f9f9;
          }

          .component-form button {
            display: block;
            width: 100%;
            padding: 0.75rem;
            margin-top: 1rem;
            background-color: #111;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
          }

          .component-form button:hover {
            background-color: #333;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="component-form">
        <h4>Add Component</h4>
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
        <button type="submit">Add</button>
      </form>
    </>
  );
}
