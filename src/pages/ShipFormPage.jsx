import React from "react";
import { Link } from "react-router-dom";
import ShipForm from "../components/Ships/ShipForm";

export default function ShipFormPage() {
  return (
    <main>
      <Link to="/ships" className="btn-link">
        ← Back to Ships
      </Link>
      <ShipForm />
    </main>
  );
}
