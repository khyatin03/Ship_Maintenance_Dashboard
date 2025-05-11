import React from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function NotificationCenter() {
  const { notifications, dismissNotification } = useJobs();

  return (
    <div className="card">
      <h3>Notifications</h3>
      {!notifications.length && <p>No notifications</p>}
      {notifications.map((n) => (
        <div key={n.id} className="notification">
          <span>{n.message}</span>
          <button onClick={() => dismissNotification(n.id)}>×</button>
        </div>
      ))}
    </div>
  );
}
