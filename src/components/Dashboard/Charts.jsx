import React, { useMemo } from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function Charts() {
  const { jobs } = useJobs();

  /*  ⚙️  Compute counts only for non‑completed jobs  */
  const { priorities, counts, max } = useMemo(() => {
    const active = jobs.filter(
      (j) => j.status !== "Completed"       // ← exclude completed
    );

    const p = ["Low", "Medium", "High"];
    const c = p.map(
      (lvl) =>
        active.filter(
          (j) => (j.priority || "").toLowerCase() === lvl.toLowerCase()
        ).length
    );

    return { priorities: p, counts: c, max: Math.max(...c, 1) };
  }, [jobs]);

  return (
    <div className="card">
      <h3>Jobs by Priority (Active)</h3>
      {priorities.map((p, idx) => (
        <div key={p} className="bar-row">
          <span>{p}</span>
          <progress value={counts[idx]} max={max} />
          <span>{counts[idx]}</span>
        </div>
      ))}
    </div>
  );
}
