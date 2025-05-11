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

          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            background-color: #fdfdfd;
            color: #333;
          }

          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #111;
            color: #fff;
          }

          .nav span {
            font-size: 1.2rem;
            font-weight: 600;
          }

          .nav nav a,
          .nav nav button {
            margin-left: 1rem;
            color: #fff;
            text-decoration: none;
            background: none;
            border: none;
            font-size: 0.95rem;
            cursor: pointer;
          }

          .nav nav button:hover,
          .nav nav a:hover {
            text-decoration: underline;
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

          .charts-notifications {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            justify-content: space-between;
          }

          .charts-notifications > * {
            flex: 1;
            min-width: 0;
          }

          @media (max-width: 900px) {
            .charts-notifications {
              flex-direction: column;
            }
          }

          .dark body {
            background-color: #1a1a1a;
            color: #e0e0e0;
          }

          .dark .nav {
            background-color: #222;
          }

          .dark .nav nav a,
          .dark .nav nav button {
            color: #e0e0e0;
          }

          .dark .user-role {
            color: #aaa;
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
