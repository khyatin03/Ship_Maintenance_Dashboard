import React from "react";
import ShipList from "../components/Ships/ShipList";
import { Link, useLocation } from "react-router-dom";
import ShipForm from "../components/Ships/ShipForm";
import { useShips } from "../contexts/ShipsContext";

export default function ShipsPage() {
  const loc = useLocation();
  const adding = loc.pathname.endsWith("/new");
  const editingMatch = loc.pathname.match(/\/ships\/(.+)\/edit/);
  const editingId = editingMatch ? editingMatch[1] : null;
  const { ships } = useShips();
  const ship = ships.find((s) => s.id === editingId);

  return (
    <>
      <style>
        {`
          main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1.5rem;
          }

          .btn-back {
            display: inline-block;
            margin-bottom: 2rem;
            background-color: #0066ff;
            color: #fff;
            text-decoration: none;
            padding: 0.6rem 1.2rem;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s ease;
          }

          .btn-back:hover {
            background-color: #004dcc;
          }
        `}
      </style>

      <main>
        <Link to="/" className="btn-back">← Dashboard</Link>
        {adding || editingId ? <ShipForm ship={ship} /> : <ShipList />}
      </main>
    </>
  );
}
