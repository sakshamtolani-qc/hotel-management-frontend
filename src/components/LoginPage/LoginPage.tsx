import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { apiFetch } from "../../lib/utils";
import { useAuth } from "../../providers/providers";
import "./LoginPage.css";

export const LoginPage = () => {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState(""); // email/phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier, // backend should accept email OR phone
          password,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();
      login(data.token, data.user); // expects { token, user }

      // ✅ Redirect after login (if using react-router-dom)
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
              <div className="auth-title">LogIn</div>
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
                {loading ? "Logging in..." : "LogIn"}
              </Button>
            </form>

            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">Or</div>
              <div className="divider-line"></div>
            </div>

            <div className="signup-link">
              <span className="signup-text">
                Don&apos;t have an account?{" "}
              </span>
              <span className="signup-link-text">SignUp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
