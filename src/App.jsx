import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import { ComponentsProvider } from "./contexts/ComponentsContext";
import { JobsProvider } from "./contexts/JobsContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipDetailPage from "./pages/ShipDetailPage";
import ShipFormPage from "./pages/ShipFormPage";   // ← NEW
import JobsPage from "./pages/JobsPage";
import ShipEditPage from "./pages/ShipEditPage";

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              {/* ------------ Auth‑protected routes ------------- */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />

              {/* CREATE‑SHIP page must be declared BEFORE the /:id param route */}
              <Route
                path="/ships/new"
                element={
                  <PrivateRoute roles={["Admin", "Inspector"]}>
                    <ShipFormPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/ships/:id/edit"
                element={
                  <PrivateRoute roles={['Admin', 'Inspector']}>
                    <ShipEditPage />
                  </PrivateRoute>
                }
              />


              <Route
                path="/ships/:id"
                element={
                  <PrivateRoute roles={["Admin", "Inspector"]}>
                    <ShipDetailPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/ships"
                element={
                  <PrivateRoute roles={["Admin", "Inspector"]}>
                    <ShipsPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/jobs"
                element={
                  <PrivateRoute roles={["Admin", "Inspector", "Engineer"]}>
                    <JobsPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  );
}
