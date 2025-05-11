import React from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useComponents } from "../../contexts/ComponentsContext";
import { useJobs } from "../../contexts/JobsContext";

export default function KPICards() {
  const { ships } = useShips();
  const { components } = useComponents();
  const { jobs } = useJobs();

  const overdueComponents = components.filter((c) => {
    const last = new Date(c.lastMaintenanceDate);
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    return last < yearAgo;
  });

  const inProgress = jobs.filter(
    (j) => j.status === "Open" || j.status === "In Progress"
  );
  const completed = jobs.filter((j) => j.status === "Completed");

  const cards = [
    { label: "Total Ships", value: ships.length },
    { label: "Overdue Components", value: overdueComponents.length },
    { label: "Jobs In Progress", value: inProgress.length },
    { label: "Jobs Completed", value: completed.length },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .kpi-grid {
            font-family: 'Poppins', sans-serif;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            max-width: 900px;
            margin: 2rem auto;
            padding: 1rem;
          }

          .kpi-card {
            padding: 1.5rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            text-align: center;
          }

          .kpi-value {
            font-size: 2rem;
            font-weight: 600;
            margin: 0;
            color: #111;
          }

          .kpi-label {
            margin-top: 0.5rem;
            font-size: 0.95rem;
            color: #555;
          }
        `}
      </style>

      <div className="kpi-grid">
        {cards.map((c) => (
          <div key={c.label} className="kpi-card">
            <p className="kpi-value">{c.value}</p>
            <p className="kpi-label">{c.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
