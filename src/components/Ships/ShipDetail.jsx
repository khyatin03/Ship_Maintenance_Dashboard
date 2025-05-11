import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useShips } from "../../contexts/ShipsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { canEditShip } from "../../roleUtils";

export default function ShipDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const { ships, deleteShip } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();
  const { user } = useAuth();

  const ship = ships.find((s) => s.id === id);

  /* ---------- graceful 404 + back link ---------- */
  if (!ship) {
    return (
      <div className="card">
        <p>Ship not found.</p>
        <Link to="/ships" className="btn-link">
          ← Back to Ships
        </Link>
      </div>
    );
  }

  const shipComponents = components.filter((c) => c.shipId === id);
  const shipJobs = jobs.filter((j) => j.shipId === id);

  return (
    <div className="card">
      <h2>{ship.name}</h2>
      <p>
        <b>IMO:</b> {ship.imo} &nbsp; <b>Flag:</b> {ship.flag} &nbsp; <b>Status:</b>{" "}
        {ship.status}
      </p>

      {canEditShip(user.role) && (
        <>
          <button
            onClick={() => nav(`/ships/${id}/edit`)}
            className="btn-primary"
          >
            Edit Ship
          </button>{" "}
          <button
            onClick={() => {
              deleteShip(id);
              nav("/ships");
            }}
            className="btn-danger"
          >
            Delete Ship
          </button>
        </>
      )}

      <hr />

      <h3>Components</h3>
      {shipComponents.length ? (
        <ul>
          {shipComponents.map((c) => (
            <li key={c.id}>
              {c.name} (SN:{c.serialNumber}) – Last Maint: {c.lastMaintenanceDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No components</p>
      )}

      <h3>Maintenance Jobs</h3>
      {shipJobs.length ? (
        <ul>
          {shipJobs.map((j) => (
            <li key={j.id}>
              {j.type} – {j.status} – {j.priority} – {j.scheduledDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs</p>
      )}

      <Link to="/ships" className="btn-link">
        ← Back
      </Link>
    </div>
  );
}
