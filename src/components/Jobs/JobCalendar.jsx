import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function JobCalendar() {
  const { jobs } = useJobs();
  const [selected, setSelected] = useState(null);

  const events = jobs.reduce((acc, j) => {
    acc[j.scheduledDate] = (acc[j.scheduledDate] || []).concat(j);
    return acc;
  }, {});

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [...Array(daysInMonth)].map((_, i) => {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
    return {
      key,
      day: i + 1,
      jobs: events[key] || [],
    };
  });

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .calendar-container {
            font-family: 'Poppins', sans-serif;
            width: 100%;
            flex: 1;
            margin: 0 auto;
            padding: 1.5rem;
            border-radius: 8px;
            background: var(--card-light, #fff);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
            border: 1px solid var(--border-light, #e5e7eb);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          html.dark .calendar-container {
            background: var(--card-dark, #1e293b);
            border-color: var(--border-dark, #334155);
            color: var(--text-dark, #f3f4f6);
          }

          .calendar-container h3 {
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 600;
            color: inherit;
          }

          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1rem;
          }

          .cal-cell {
            position: relative;
            background: #f9f9f9;
            border-radius: 6px;
            text-align: left;
            cursor: pointer;
            transition: background 0.2s ease, box-shadow 0.2s ease;
            min-height: 80px;
            padding: 0.75rem;
            border: 1px solid transparent;
          }

          .cal-cell:hover {
            background: #eaeaea;
            box-shadow: 0 2px 6px rgba(0,0,0,0.06);
          }

          html.dark .cal-cell {
            background: #1f2733;
          }

          html.dark .cal-cell:hover {
            background: #263041;
          }

          .cal-cell span {
            position: absolute;
            top: 6px;
            left: 8px;
            font-weight: 500;
            font-size: 0.9rem;
            color: inherit;
          }

          .has-jobs {
            border-left: 4px solid var(--primary, #2563eb);
          }

          .event-dot-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 0.3rem;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }

          .event-dot {
            font-size: 0.75rem;
            color: #111;
          }

          html.dark .event-dot {
            color: #ffffff;
          }

          .modal {
            margin-top: 2rem;
            padding: 1.5rem;
            border-radius: 6px;
            background-color: #f2f2f2;
            font-size: 0.95rem;
            transition: background-color 0.3s ease;
          }

          html.dark .modal {
            background-color: #2c3543;
          }

          .modal h4 {
            margin-bottom: 0.75rem;
            font-size: 1.2rem;
          }

          .modal ul {
            padding-left: 1.2rem;
          }

          .modal li {
            margin-bottom: 0.5rem;
          }

          .modal button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            font-size: 0.95rem;
            background: var(--primary, #2563eb);
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.2s ease;
          }

          .modal button:hover {
            background: #1d4ed8;
          }

          @media (max-width: 768px) {
            .calendar-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>

      <div className="calendar-container">
        <h3>Job Calendar – {monthName} {year}</h3>

        <div className="calendar-grid">
          {cells.map((c) => (
            <div
              key={c.key}
              className={`cal-cell ${c.jobs.length ? "has-jobs" : ""}`}
              onClick={() => setSelected(c)}
            >
              <span>{c.day}</span>
              {c.jobs.length > 0 && (
                <div className="event-dot-container">
                  {c.jobs.map((_, idx) => (
                    <div key={idx} className="event-dot">●</div>
                  ))}
                </div>
              )}
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
    </>
  );
}
