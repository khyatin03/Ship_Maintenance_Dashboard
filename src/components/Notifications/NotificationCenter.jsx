import React from "react";
import { useJobs } from "../../contexts/JobsContext";

export default function NotificationCenter() {
  const { notifications, dismissNotification } = useJobs();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

          .notification-center {
            font-family: 'Poppins', sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }

          .notification-center h3 {
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            font-weight: 600;
          }

          .notifications-wrapper {
            max-height: 160px; /* Show up to 2 notifications */
            overflow-y: auto;
          }

          .notification {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            background-color: #f9f9f9;
            border-radius: 6px;
            font-size: 0.95rem;
            color: #333;
          }

          .notification button {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #888;
            cursor: pointer;
            font-weight: bold;
          }

          .notification button:hover {
            color: #e53935;
          }

          .notification-center p {
            font-size: 0.95rem;
            color: #666;
          }

          /* Optional scrollbar styling */
          .notifications-wrapper::-webkit-scrollbar {
            width: 6px;
          }

          .notifications-wrapper::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 3px;
          }
        `}
      </style>

      <div className="notification-center">
        <h3>Notifications</h3>
        {!notifications.length ? (
          <p>No notifications</p>
        ) : (
          <div className="notifications-wrapper">
            {notifications.map((n) => (
              <div key={n.id} className="notification">
                <span>{n.message}</span>
                <button onClick={() => dismissNotification(n.id)}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
