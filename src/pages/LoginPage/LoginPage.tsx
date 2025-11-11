import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

// ✅ Base API URL
const API_BASE = "http://127.0.0.1:8000/api";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [identifier, setIdentifier] = useState(""); // email or username input
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Call Django JWT login endpoint
      const response = await axios.post(`${API_BASE}/users/login/`, {
        username_or_email: identifier, // backend expects username_or_email
        password: password,
      });

      // Destructure tokens from response
      const { access, refresh, user } = response.data;

      // Store tokens and user info in localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to home/dashboard after login
      navigate("/home");
    } catch (err: any) {
      console.error("Login error:", err);

      // Show meaningful error messages
      if (err.response) {
        if (err.response.data.username_or_email) {
          setError(err.response.data.username_or_email.join(" "));
        } else if (err.response.data.password) {
          setError(err.response.data.password.join(" "));
        } else if (err.response.data.detail) {
          setError(err.response.data.detail);
        } else {
          setError("Invalid credentials");
        }
      } else {
        setError(
          "Network error. Make sure backend is running on port 8000."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Left Section */}
      <div className="login-left-section">
        <img
          className="login-bg-image"
          src="/bedroom.jpg"
          alt="Hotel room interior"
        />
        <div className="login-logo-overlay">
          <img src="/logo.svg" alt="Logo" className="login-logo" />
        </div>
        <div className="login-hero-overlay">
          <h1 className="login-hero-text">
            Empowering Hotels,<br />
            Elevating Guest Experiences.
          </h1>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="login-right-section">
        <div className="login-form-wrapper">
          <div className="login-form-header">
            <h2 className="login-form-title">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field-group">
              <label className="login-field-label">Email or Username</label>
              <input
                type="text"
                className="login-field-input"
                placeholder="Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="login-field-group">
              <label className="login-field-label">Password</label>
              <input
                type="password"
                className="login-field-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
{/* 
          <div className="login-divider">
            <span className="login-divider-line"></span>
            <span className="login-divider-text">Or</span>
            <span className="login-divider-line"></span>
          </div>

          <div className="login-signup-link">
            <span className="login-signup-text">Don't have an account?</span>
            <Link to="/signup" className="login-signup-anchor">
              Sign Up
            </Link>
          </div>

          {/* Demo credentials info */}
          {/* <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
            <p><b>Demo Login:</b></p>
            <p>Email: demo@hotel.com</p>
            <p>Password: demo123</p>
          // </div> */} 
        </div>
      </div>
    </div>
  );
};
