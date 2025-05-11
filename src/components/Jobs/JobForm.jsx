import React, { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

export default function JobForm() {
  const { addJob }                 = useJobs();
  const { ships }                  = useShips();
  const { components }             = useComponents();

  /* -------- initial form state -------- */
  const [form, setForm] = useState({
    id:                `j${Date.now()}`,
    shipId:            ships[0]?.id || "",
    componentId:       "",
    type:              "Inspection",
    priority:          "Medium",
    status:            "Open",
    assignedEngineerId:"",
    scheduledDate:     "",
  });

  /* -------- reset componentId whenever ship changes -------- */
  useEffect(() => {
    setForm((prev) => ({ ...prev, componentId: "" }));
  }, [form.shipId]);

  const compsOnShip = components.filter((c) => c.shipId === form.shipId);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.componentId) return alert("Select a component first!");
    addJob(form);
    alert("Job created ✔");
    /* reset quick‑add */
    setForm((f) => ({ ...f, id: `j${Date.now()}`, componentId: "", scheduledDate: "" }));
  };

  /* -------------- UI -------------- */
  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create Job</h3>

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

      <button className="btn-primary">Create Job</button>
    </form>
  );
}
