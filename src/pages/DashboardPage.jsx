import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";
import NotificationCenter from "../components/Notifications/NotificationCenter";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { logout, user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <>
      <style>
  {`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

    :root {
      --bg-light: #f9fafb;
      --text-light: #1a1a1a;
      --bg-dark: #111827;
      --text-dark: #f3f4f6;
      --card-light: #ffffff;
      --card-dark: #1f2937;
      --border-light: #e5e7eb;
      --border-dark: #374151;
      --shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    }

    html,
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: var(--bg-light);
      color: var(--text-light);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .dark html,
    .dark body {
      background-color: var(--bg-dark);
      color: var(--text-dark);
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #111;
      color: #fff;
      box-shadow: var(--shadow);
      transition: background-color 0.3s ease;
    }

    .dark .nav {
      background-color: #1f2937;
    }

    .nav span {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .nav nav a,
    .nav nav button {
      margin-left: 1rem;
      color: inherit;
      text-decoration: none;
      background: none;
      border: none;
      font-size: 0.95rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .nav nav a:hover,
    .nav nav button:hover {
      text-decoration: underline;
      opacity: 0.85;
    }

    main {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }

    main > * {
      margin-bottom: 2rem;
    }

    .user-role {
      text-align: center;
      font-size: 0.95rem;
      color: #555;
      margin-top: 3rem;
    }

    .dark .user-role {
      color: #bbb;
    }

    .charts-notifications {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
      justify-content: space-between;
    }

    .charts-notifications > * {
      flex: 1;
      min-width: 0;
      background: var(--card-light);
      border: 1px solid var(--border-light);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: var(--shadow);
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .dark .charts-notifications > * {
      background: var(--card-dark);
      border-color: var(--border-dark);
    }

    .charts-notifications > *:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    @media (max-width: 900px) {
      .charts-notifications {
        flex-direction: column;
      }
    }
  `}
    </style>


      <header className="nav">
        <span>ENTNT Ship Maintenance</span>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/ships">Ships</Link>
          <Link to="/jobs">Jobs</Link>
          <button onClick={logout}>Logout</button>
          <button onClick={toggleTheme}>🌓</button>
        </nav>
      </header>

      <main>
        <KPICards />

        <div className="charts-notifications">
          <Charts />
          <NotificationCenter />
        </div>

        <p className="user-role">Logged in as: {user.role}</p>
      </main>
    </>
  );
}
