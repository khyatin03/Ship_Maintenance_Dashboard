import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/Authentication/LoginForm";

export default function LoginPage() {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return (
    <div className="center-screen">
      <LoginForm />
    </div>
  );
}
