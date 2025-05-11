import React, { createContext, useContext, useState, useEffect } from "react";
import { getData, setData } from "../utils/localStorageUtils";

const initialJobs = [
  {
    id: "j1",
    componentId: "c1",
    shipId: "s1",
    type: "Inspection",
    priority: "High",
    status: "Open",
    assignedEngineerId: "3",
    scheduledDate: "2025-05-05",
  },
];

const JobsContext = createContext();
export const useJobs = () => useContext(JobsContext);

export function JobsProvider({ children }) {
  useEffect(() => {
    if (!getData("jobs")) setData("jobs", initialJobs);
    if (!getData("notifications")) setData("notifications", []);
  }, []);

  const [jobs, setJobs] = useState(getData("jobs") || []);
  const [notifications, setNotifications] = useState(getData("notifications") || []);

  const saveJobs = (next) => {
    setJobs(next);
    setData("jobs", next);
  };

  const pushNotification = (message) => {
    const note = { id: Date.now().toString(), message };
    const next = [note, ...notifications];
    setNotifications(next);
    setData("notifications", next);
  };

  const addJob = (job) => {
    saveJobs([...jobs, job]);
    pushNotification(`Job ${job.id} created`);
  };

  const updateJob = (id, data) => {
    const next = jobs.map((j) => (j.id === id ? { ...j, ...data } : j));
    saveJobs(next);
    pushNotification(`Job ${id} updated`);
  };

  const deleteJob = (id) => {
    saveJobs(jobs.filter((j) => j.id !== id));
    pushNotification(`Job ${id} deleted`);
  };

  const dismissNotification = (id) => {
    const next = notifications.filter((n) => n.id !== id);
    setNotifications(next);
    setData("notifications", next);
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        notifications,
        dismissNotification,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}
