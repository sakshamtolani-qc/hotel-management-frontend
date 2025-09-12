import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../utils/button";
import { Input } from "../../utils/input";
import { Label } from "../../utils/label";
import { useAuth } from "../../providers/providers";
import "./LoginPage.css";
import { ButtonLoader, PageLoader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // email/phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // For demo purposes, allow any credentials or use default
      const demoCredentials = {
        email: identifier || "demo@hotel.com",
        password: password || "demo123"
      };

      await login(demoCredentials.email, demoCredentials.password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await login("demo@hotel.com", "demo123");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {/* Left side image/logo/hero text */}
        <div className="image-section">
          <img className="bedroom-image" src="/bedroom.jpg" alt="Bedroom interior"/>

          <div className="logo-section">
            <img src="/logo.svg" alt="Logo" />
          </div>

          <div className="hero-text">
            <h1>
              Empowering Hotels, <br />
              Elevating Guest Experiences.
            </h1>
          </div>
        </div>

        {/* Right side login form */}
        <div className="form-section">
          <div className="form-container">
            <div className="auth-header">
              <div className="auth-icon">
                <img src="/auth btn.svg" alt="Auth btn" />
              </div>
              <div className="auth-title">Login</div>
            </div>

            <form onSubmit={handleSubmit} className="form-fields space-y-4">
              <div className="field-group">
                <Label className="field-label">Email/Phone no.</Label>
                <Input
                  className="field-input"
                  placeholder="Email/Phone no"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="field-group">
                <Label className="field-label">Password</Label>
                <Input
                  type="password"
                  className="field-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="login-button w-full"
                disabled={loading}
              >
                {loading ? <ButtonLoader text="Logging in..." /> : "LogIn"}
              </Button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">Or</div>
              <div className="divider-line"></div>
            </div>

            <Button
              onClick={handleDemoLogin}
              className="demo-login-button w-full"
              disabled={loading}
              variant="outline"
            >
              {loading ? <ButtonLoader text="Logging in..." /> : "Demo Login"}
            </Button>

            <div className="signup-link">
              <span className="signup-text">
                Don&apos;t have an account?{" "}
              </span>
              <Link className="signup-link-text" to="/signup">SignUp</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Full screen loader (optional, if you want to block UI during login) */}
      {loading && <PageLoader text="Logging you in..." variant="hotel" />}
    </div>
  );
};
