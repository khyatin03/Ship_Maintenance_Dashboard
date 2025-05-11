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
    status === "Open" ? "In Progress" : status === "In Progress" ? "Completed" : status;

  return (
    <div className="card">
      <h3>Maintenance Jobs</h3>
      <div className="filters">
        <select onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="">All Priority</option>
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
            <th />
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
  );
}