import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import KPICards           from "../components/Dashboard/KPICards";
import Charts             from "../components/Dashboard/Charts";
import NotificationCenter from "../components/Notifications/NotificationCenter";
import { useAuth }        from "../contexts/AuthContext";

export default function DashboardPage() {
  const { logout, user } = useAuth();

  /* ---- restore saved theme on first mount ---- */
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  /* ---- toggle + persist ---- */
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <>
      <header className="nav">
        <span>ENTNT Ship Maintenance</span>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/ships">Ships</Link>
          <Link to="/jobs">Jobs</Link>
          <button onClick={logout}>Logout</button>
          {/*  🌓  theme toggle */}
          <button onClick={toggleTheme} className="ml-2 px-2">
            🌓
          </button>
        </nav>
      </header>

      <main>
        <KPICards />
        <Charts />
        <NotificationCenter />
        <p className="user-role">Logged in as: {user.role}</p>
      </main>
    </>
  );
}
