import React, { useMemo } from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function Charts() {
  const { jobs } = useJobs();

  const { priorities, counts, max } = useMemo(() => {
    const active = jobs.filter((j) => j.status !== "Completed");

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
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .chart-container {
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background-color: var(--card-light, #fff);
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          html.dark .chart-container {
            background-color: var(--card-dark, #1f2937);
          }

          .chart-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: inherit;
            text-align: center;
          }

          .chart-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .chart-label {
            width: 70px;
            font-size: 0.95rem;
            color: inherit;
            font-weight: 500;
          }

          .chart-bar {
            flex: 1;
            height: 12px;
            border-radius: 6px;
            background: #e5e7eb;
            overflow: hidden;
            position: relative;
          }

          html.dark .chart-bar {
            background: #334155;
          }

          .chart-fill {
            height: 100%;
            background: linear-gradient(to right, #60a5fa, #06b6d4);
            border-radius: 6px;
          }

          .chart-count {
            width: 30px;
            text-align: right;
            font-size: 0.9rem;
            font-weight: 600;
            color: inherit;
          }
        `}
      </style>

      <div className="chart-container">
        <h3 className="chart-title">Jobs by Priority (Active)</h3>
        {priorities.map((p, idx) => {
          const percent = (counts[idx] / max) * 100;
          return (
            <div key={p} className="chart-row">
              <span className="chart-label">{p}</span>
              <div className="chart-bar">
                <div className="chart-fill" style={{ width: `${percent}%` }}></div>
              </div>
              <span className="chart-count">{counts[idx]}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
