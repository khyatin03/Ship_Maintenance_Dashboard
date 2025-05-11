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

  const shipComponents = components.filter((c) => c.shipId === id);
  const shipJobs = jobs.filter((j) => j.shipId === id);

  if (!ship) {
    return (
      <>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

            .ship-detail {
              font-family: 'Poppins', sans-serif;
              max-width: 600px;
              margin: 2rem auto;
              padding: 2rem;
              border: 1px solid #eee;
              border-radius: 8px;
              background-color: #fff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }

            .ship-detail h2 {
              margin-bottom: 0.5rem;
            }

            .ship-detail h3 {
              margin-top: 1.5rem;
              font-size: 1.1rem;
            }

            .ship-detail p,
            .ship-detail li {
              font-size: 0.95rem;
              line-height: 1.5;
              color: #333;
            }

            .ship-detail ul {
              padding-left: 1.2rem;
            }

            .ship-detail button {
              margin-right: 0.75rem;
              margin-top: 1rem;
              padding: 0.6rem 1.2rem;
              border: none;
              border-radius: 4px;
              font-size: 0.95rem;
              cursor: pointer;
            }

            .btn-primary {
              background-color: #111;
              color: #fff;
            }

            .btn-primary:hover {
              background-color: #333;
            }

            .btn-danger {
              background-color: #e53935;
              color: #fff;
            }

            .btn-danger:hover {
              background-color: #c62828;
            }

            .btn-link {
              display: inline-block;
              margin-top: 1.5rem;
              text-decoration: none;
              color: #0077cc;
              font-size: 0.95rem;
            }

            .btn-link:hover {
              text-decoration: underline;
            }

            hr {
              border: none;
              border-top: 1px solid #eee;
              margin: 2rem 0;
            }
          `}
        </style>

        <div className="ship-detail">
          <p>Ship not found.</p>
          <Link to="/ships" className="btn-link">← Back to Ships</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .ship-detail {
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }

          .ship-detail h2 {
            margin-bottom: 0.5rem;
          }

          .ship-detail h3 {
            margin-top: 1.5rem;
            font-size: 1.1rem;
          }

          .ship-detail p,
          .ship-detail li {
            font-size: 0.95rem;
            line-height: 1.5;
            color: #333;
          }

          .ship-detail ul {
            padding-left: 1.2rem;
          }

          .ship-detail button {
            margin-right: 0.75rem;
            margin-top: 1rem;
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 4px;
            font-size: 0.95rem;
            cursor: pointer;
          }

          .btn-primary {
            background-color: #111;
            color: #fff;
          }

          .btn-primary:hover {
            background-color: #333;
          }

          .btn-danger {
            background-color: #e53935;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #c62828;
          }

          .btn-link {
            display: inline-block;
            margin-top: 1.5rem;
            text-decoration: none;
            color: #0077cc;
            font-size: 0.95rem;
          }

          .btn-link:hover {
            text-decoration: underline;
          }

          hr {
            border: none;
            border-top: 1px solid #eee;
            margin: 2rem 0;
          }
        `}
      </style>

      <div className="ship-detail">
        <h2>{ship.name}</h2>
        <p>
          <b>IMO:</b> {ship.imo} &nbsp; <b>Flag:</b> {ship.flag} &nbsp; <b>Status:</b> {ship.status}
        </p>

        {canEditShip(user.role) && (
          <>
            <button onClick={() => nav(`/ships/${id}/edit`)} className="btn-primary">Edit Ship</button>
            <button
              onClick={() => {
                deleteShip(id);
                nav("/ships");
              }}
              className="btn-danger"
            >
              Delete Ship
            </button>
          </>
        )}

        <hr />

        <h3>Components</h3>
        {shipComponents.length ? (
          <ul>
            {shipComponents.map((c) => (
              <li key={c.id}>
                {c.name} (SN: {c.serialNumber}) – Last Maint: {c.lastMaintenanceDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No components</p>
        )}

        <h3>Maintenance Jobs</h3>
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

        <Link to="/ships" className="btn-link">← Back</Link>
      </div>
    </>
  );
}
