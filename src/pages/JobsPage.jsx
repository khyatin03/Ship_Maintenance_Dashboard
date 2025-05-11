import React from "react";
import { Link } from "react-router-dom";
import JobList from "../components/Jobs/JobList";
import JobForm from "../components/Jobs/JobForm";
import JobCalendar from "../components/Jobs/JobCalendar";

export default function JobsPage() {
  return (
    <>
      <style>
        {`
          .jobs-layout {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 2rem;
            margin-top: 2rem;
          }

          .jobs-left,
          .jobs-right {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          @media (max-width: 900px) {
            .jobs-layout {
              grid-template-columns: 1fr;
            }
          }

          main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1.5rem;
          }

          .btn-back {
            display: inline-block;
            margin-bottom: 2rem;
            background-color: #0066ff;
            color: #fff;
            text-decoration: none;
            padding: 0.6rem 1.2rem;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s ease;
          }

          .btn-back:hover {
            background-color: #004dcc;
          }
        `}
      </style>

      <main>
        <Link to="/" className="btn-back">← Dashboard</Link>

        <div className="jobs-layout">
          <div className="jobs-left">
            <JobForm />
          </div>
          <div className="jobs-right">
            <JobList />
            <JobCalendar />
          </div>
        </div>
      </main>
    </>
  );
}
