import React from "react";
import { useParams, Link } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import ShipForm from "../components/Ships/ShipForm";

export default function ShipEditPage() {
  const { id }  = useParams();
  const { ships } = useShips();
  const ship     = ships.find((s) => s.id === id);

  if (!ship)
    return (
      <main className="card">
        <p>Ship not found.</p>
        <Link to="/ships" className="btn-link">← Back to Ships</Link>
      </main>
    );

  return (
    <main>
      <Link to={`/ships/${id}`} className="btn-link">← Back to Ship</Link>
      <ShipForm ship={ship} />
    </main>
  );
}
