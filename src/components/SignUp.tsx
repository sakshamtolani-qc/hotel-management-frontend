import { UserIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-layout">
        <div className="image-section">
          <img src="/bedroom.jpg" alt="Bedroom interior" className="imgfit" />

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
          <div className="form-header">
            <img src="/auth btn.svg" alt="Auth btn" />
            {/* <Avatar className="avatar">
              <AvatarFallback className="avatar-fallback">
                <UserIcon className="avatar-icon" />
              </AvatarFallback>
            </Avatar> */}
            <div className="signup-label">
              SignUp
            </div>
          </div>

          <Card className="form-card">
            <CardContent className="form-content">
              <div className="form-row">
                <div className="form-field">
                  <Label htmlFor="firstName" className="field-label">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="field-input"
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="lastName" className="field-label">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Label htmlFor="email" className="field-label">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="field-input"
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="password" className="field-label">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Label htmlFor="phoneNo" className="field-label">
                    Phone no.
                  </Label>
                  <Input
                    id="phoneNo"
                    type="tel"
                    placeholder="Phone no"
                    className="field-input"
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="confirmPassword" className="field-label">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Password"
                    className="field-input"
                  />
                </div>
              </div>

              <div className="submit-section">
                <Button className="submit-button">
                  SignUp
                </Button>
              </div>

              <div className="separator-section">
                <Separator className="separator-line" />
                <span className="separator-text">
                  Or
                </span>
                <Separator className="separator-line" />
              </div>

              <div className="login-section">
                <span className="login-text">
                  Already have an account?{" "}
                </span>
                <span className="login-link">
                  Login
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};