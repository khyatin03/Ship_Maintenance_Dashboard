import React from "react";
import { Link } from "react-router-dom";
import JobList from "../components/Jobs/JobList";
import JobForm from "../components/Jobs/JobForm";
import JobCalendar from "../components/Jobs/JobCalendar";

export default function JobsPage() {
  return (
    <main>
      <Link to="/" className="btn-link">← Dashboard</Link>
      <JobForm />
      <JobList />
      <JobCalendar />
    </main>
  );
}
