import React from "react";
import { Link } from "react-router-dom";
import ShipForm from "../components/Ships/ShipForm";

export default function ShipFormPage() {
  return (
    <>
      <style>
        {`
          main {
            max-width: 800px;
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
        <Link to="/ships" className="btn-back">← Back to Ships</Link>
        <ShipForm />
      </main>
    </>
  );
}
