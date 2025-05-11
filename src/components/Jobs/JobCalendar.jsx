import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function JobCalendar() {
  const { jobs } = useJobs();
  const [selected, setSelected] = useState(null);

  /* --- group jobs by local YYYY‑MM‑DD (avoid UTC shift) --- */
  const events = jobs.reduce((acc, j) => {
    acc[j.scheduledDate] = (acc[j.scheduledDate] || []).concat(j);
    return acc;
  }, {});

  /* ---- simple monthly grid for CURRENT month ---- */
  const today       = new Date();
  const year        = today.getFullYear();
  const month       = today.getMonth();                 // 0‑based
  const monthName   = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [...Array(daysInMonth)].map((_, i) => {
    /* build key strictly in local time */
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i + 1
    ).padStart(2, "0")}`;

    return {
      key,
      day:  i + 1,
      jobs: events[key] || [],
    };
  });

  return (
    <div className="card">
      <h3>
        Job Calendar – {monthName} {year}
      </h3>

      <div className="grid calendar-grid">
        {cells.map((c) => (
          <div
            key={c.key}
            className={`cal-cell ${c.jobs.length ? "has-jobs" : ""}`}
            onClick={() => setSelected(c)}
          >
            <span>{c.day}</span>
            {c.jobs.map((_, idx) => (
              <div key={idx} className="event-dot">
                ●
              </div>
            ))}
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal">
          <h4>Jobs on {selected.key}</h4>
          {selected.jobs.length ? (
            <ul>
              {selected.jobs.map((j) => (
                <li key={j.id}>
                  #{j.id} – {j.type} – {j.status} – {j.priority}
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs scheduled.</p>
          )}
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
