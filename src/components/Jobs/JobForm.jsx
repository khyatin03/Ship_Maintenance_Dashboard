import React, { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

export default function JobForm() {
  const { addJob } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();

  const [form, setForm] = useState({
    id: `j${Date.now()}`,
    shipId: ships[0]?.id || "",
    componentId: "",
    type: "Inspection",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, componentId: "" }));
  }, [form.shipId]);

  const compsOnShip = components.filter((c) => c.shipId === form.shipId);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.componentId) return alert("Select a component first!");
    addJob(form);
    alert("Job created ✔");
    setForm((f) => ({
      ...f,
      id: `j${Date.now()}`,
      componentId: "",
      scheduledDate: "",
    }));
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .job-form {
            font-family: 'Poppins', sans-serif;
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .job-form h3 {
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            font-weight: 600;
            text-align: center;
          }

          .job-form label {
            display: block;
            margin-bottom: 1rem;
            font-size: 0.95rem;
            color: #333;
          }

          .job-form input,
          .job-form select {
            width: 100%;
            padding: 0.6rem;
            margin-top: 0.4rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.95rem;
            background-color: #f9f9f9;
          }

          .job-form button {
            display: block;
            width: 100%;
            margin-top: 1.5rem;
            padding: 0.75rem;
            background-color: #111;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
          }

          .job-form button:hover {
            background-color: #333;
          }
        `}
      </style>

      <form onSubmit={handleSubmit} className="job-form">
        <h3>Create Job</h3>

        <label>
          Ship
          <select name="shipId" value={form.shipId} onChange={handleChange} required>
            {ships.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Component
          <select
            name="componentId"
            value={form.componentId}
            onChange={handleChange}
            required
          >
            <option value="">-- select --</option>
            {compsOnShip.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {["type", "priority", "assignedEngineerId", "scheduledDate"].map((f) => (
          <label key={f}>
            {f}
            <input
              name={f}
              type={f === "scheduledDate" ? "date" : "text"}
              value={form[f]}
              onChange={handleChange}
              required={f !== "assignedEngineerId"}
            />
          </label>
        ))}

        <button type="submit">Create Job</button>
      </form>
    </>
  );
}
