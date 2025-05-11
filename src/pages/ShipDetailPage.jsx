import React from "react";
import ShipDetail from "../components/Ships/ShipDetail";
import ComponentList from "../components/Components/ComponentList";
import ComponentForm from "../components/Components/ComponentForm";
import { useParams } from "react-router-dom";

export default function ShipDetailPage() {
  const { id } = useParams();

  return (
    <>
      <style>
        {`
          main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1.5rem;
          }

          .ship-layout {
            display: grid;
            grid-template-columns: 1.2fr 1.8fr;
            gap: 1.5rem; /* Moderate spacing between left and right columns */
          }

          .ship-left {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* Moderate spacing between cards */
          }

          .ship-right {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* Moderate spacing between ComponentList and ComponentForm */
          }

          @media (max-width: 900px) {
            .ship-layout {
              grid-template-columns: 1fr;
            }

            .ship-left,
            .ship-right {
              gap: 1.5rem;
            }
          }
        `}
      </style>

      <main>
        <div className="ship-layout">
          <div className="ship-left">
            <ShipDetail />
          </div>
          <div className="ship-right">
            <ComponentList shipId={id} />
            <ComponentForm shipId={id} />
          </div>
        </div>
      </main>
    </>
  );
}
