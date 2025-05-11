import React from "react";
import { Link } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";
import { useAuth } from "../../contexts/AuthContext";
import { canEditShip } from "../../roleUtils";

export default function ShipList() {
  const { ships, deleteShip } = useShips();
  const { user }             = useAuth();

  return (
    <div className="card">
      <h3>Ships</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IMO</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Components</th>
            {canEditShip(user.role) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {ships.map((s) => (
            <tr key={s.id}>
              {/* click name OR “Manage” to open detail‑page where you add components */}
              <td><Link to={`/ships/${s.id}`}>{s.name}</Link></td>
              <td>{s.imo}</td>
              <td>{s.flag}</td>
              <td>{s.status}</td>
              <td>
                <Link to={`/ships/${s.id}`} className="btn-link">
                  Manage Components
                </Link>
              </td>
              {canEditShip(user.role) && (
                <td>
                  <button onClick={() => deleteShip(s.id)}>🗑</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {canEditShip(user.role) && (
        <Link to="/ships/new" className="btn-primary">
          + Add Ship
        </Link>
      )}
    </div>
  );
}
