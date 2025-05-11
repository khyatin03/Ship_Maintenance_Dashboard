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

  const inProgress = jobs.filter((j) => j.status === "Open" || j.status === "In Progress");
  const completed = jobs.filter((j) => j.status === "Completed");

  const cards = [
    { label: "Total Ships", value: ships.length },
    { label: "Overdue Components", value: overdueComponents.length },
    { label: "Jobs In Progress", value: inProgress.length },
    { label: "Jobs Completed", value: completed.length },
  ];

  return (
    <div className="grid kpi-grid">
      {cards.map((c) => (
        <div key={c.label} className="card kpi-card">
          <p className="kpi-value">{c.value}</p>
          <p className="kpi-label">{c.label}</p>
        </div>
      ))}
    </div>
  );
}