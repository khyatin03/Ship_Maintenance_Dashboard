import React from "react";
import { Link } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";
import { useAuth } from "../../contexts/AuthContext";
import { canEditShip } from "../../roleUtils";

export default function ShipList() {
  const { ships, deleteShip } = useShips();
  const { user } = useAuth();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .ship-list {
            font-family: 'Poppins', sans-serif;
            max-width: 900px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }

          .ship-list h3 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .ship-list table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
          }

          .ship-list th,
          .ship-list td {
            text-align: left;
            padding: 0.75rem;
            border-bottom: 1px solid #eee;
            font-size: 0.95rem;
          }

          .ship-list th {
            background-color: #f9f9f9;
            font-weight: 500;
            color: #444;
          }

          .ship-list td a {
            color: #0077cc;
            text-decoration: none;
          }

          .ship-list td a:hover {
            text-decoration: underline;
          }

          .ship-list button {
            background: none;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            color: #e53935;
          }

          .btn-link {
            color: #0077cc;
            text-decoration: none;
            font-size: 0.9rem;
          }

          .btn-link:hover {
            text-decoration: underline;
          }

          .btn-primary {
            display: inline-block;
            padding: 0.7rem 1.2rem;
            background-color: #111;
            color: #fff;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            margin-top: 1rem;
          }

          .btn-primary:hover {
            background-color: #333;
          }
        `}
      </style>

      <div className="ship-list">
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
    </>
  );
}
