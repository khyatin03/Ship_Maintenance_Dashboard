import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(email.trim(), password.trim())) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      {/* Google Fonts Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: #f3f4f6;
          font-family: 'Poppins', sans-serif;
        }

        .auth-form {
          max-width: 400px;
          margin: 5rem auto;
          padding: 2.5rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .auth-form h2 {
          text-align: center;
          font-weight: 600;
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
          color: #111827;
        }

        .auth-form label {
          display: block;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: #374151;
        }

        .auth-form input {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .auth-form input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .auth-form .error {
          color: #ef4444;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .auth-form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #6366f1;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }

        .auth-form button:hover {
          background-color: #4f46e5;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign in</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
