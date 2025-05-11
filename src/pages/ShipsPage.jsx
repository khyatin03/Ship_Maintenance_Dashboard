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
    <main>
      <Link to="/" className="btn-link">← Dashboard</Link>
      {adding || editingId ? <ShipForm ship={ship} /> : <ShipList />}
    </main>
  );
}
