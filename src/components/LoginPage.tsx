import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LoginPage = (): JSX.Element => {
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="image-section">
          <img src="/bedroom.jpg" alt="Bedroom interior" />

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

        <div className="form-section">
          <div className="form-container">
            <div className="auth-header">
              <div className="auth-icon">
                <img src="/auth btn.svg" alt="Auth btn" />
              </div>
              <div className="auth-title">
                LogIn
              </div>
            </div>

            <div className="form-fields">
              <div className="field-group">
                <Label className="field-label">
                  Email/Phone no.
                </Label>
                <Input
                  className="field-input"
                  placeholder="Email/Phone no"
                  defaultValue=""
                />
              </div>

              <div className="field-group">
                <Label className="field-label">
                  Password
                </Label>
                <Input
                  type="password"
                  className="field-input"
                  placeholder="Password"
                  defaultValue=""
                />
              </div>
            </div>

            <Button className="login-button">
              LogIn
            </Button>

            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">
                Or
              </div>
              <div className="divider-line"></div>
            </div>

            <div className="signup-link">
              <span className="signup-text">
                Don&apos;t have an account?{" "}
              </span>
              <span className="signup-link-text">
                SignUp
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};