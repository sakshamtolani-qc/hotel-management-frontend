import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home on login for now
    navigate("/home");
  };

  return (
    <div className="login-page-wrapper">
      {/* Left Section - Image */}
      <div className="login-left-section">
        <img 
          className="login-bg-image" 
          src="/bedroom.jpg" 
          alt="Hotel room interior"
        />
        
        {/* Logo Overlay */}
        <div className="login-logo-overlay">
          <img src="/logo.svg" alt="Quorium Logo" className="login-logo" />
        </div>
        
        {/* Hero Text Overlay */}
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
          {/* Auth Icon and Title */}
          <div className="login-form-header">
            <div className="login-auth-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="white"/>
                <path d="M12 14C7.59 14 4 17.59 4 22H20C20 17.59 16.41 14 12 14Z" fill="white"/>
              </svg>
            </div>
            <h2 className="login-form-title">Login</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email/Phone Field */}
            <div className="login-field-group">
              <label className="login-field-label">
                Email/Phone no.
              </label>
              <input
                type="text"
                className="login-field-input"
                placeholder="Email/Phone no"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-field-group">
              <label className="login-field-label">
                Password
              </label>
              <input
                type="password"
                className="login-field-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button type="submit" className="login-submit-btn">
              LogIn
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider-line"></span>
            <span className="login-divider-text">Or</span>
            <span className="login-divider-line"></span>
          </div>

          {/* Sign Up Link */}
          <div className="login-signup-link">
            <span className="login-signup-text">
              Don't have an account?
            </span>
            <Link to="/signup" className="login-signup-anchor">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
