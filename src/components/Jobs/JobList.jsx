import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function JobList() {
  const { jobs, updateJob } = useJobs();
  const [filter, setFilter] = useState({ status: "", priority: "" });

  const filtered = jobs.filter(
    (j) =>
      (!filter.status || j.status === filter.status) &&
      (!filter.priority || j.priority === filter.priority)
  );

  const nextStatus = (status) =>
    status === "Open" ? "In Progress" : status === "In Progress" ? "Completed" : status;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .job-list {
            font-family: 'Poppins', sans-serif;
            max-width: 1000px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .job-list h3 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .filters select {
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 0.95rem;
            background-color: #f9f9f9;
          }

          .job-list table {
            width: 100%;
            border-collapse: collapse;
          }

          .job-list th,
          .job-list td {
            text-align: left;
            padding: 0.75rem;
            border-bottom: 1px solid #eee;
            font-size: 0.95rem;
          }

          .job-list th {
            background-color: #f9f9f9;
            font-weight: 500;
            color: #444;
          }

          .job-list button {
            padding: 0.4rem 0.8rem;
            border: none;
            background-color: #111;
            color: #fff;
            font-size: 0.85rem;
            border-radius: 4px;
            cursor: pointer;
          }

          .job-list button:hover {
            background-color: #333;
          }
        `}
      </style>

      <div className="job-list">
        <h3>Maintenance Jobs</h3>

        <div className="filters">
          <select onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
            <option value="">All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ship</th>
              <th>Component</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Scheduled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.id}>
                <td>{j.id}</td>
                <td>{j.shipId}</td>
                <td>{j.componentId}</td>
                <td>{j.type}</td>
                <td>{j.priority}</td>
                <td>{j.status}</td>
                <td>{j.scheduledDate}</td>
                <td>
                  {j.status !== "Completed" && (
                    <button onClick={() => updateJob(j.id, { status: nextStatus(j.status) })}>
                      Advance
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
