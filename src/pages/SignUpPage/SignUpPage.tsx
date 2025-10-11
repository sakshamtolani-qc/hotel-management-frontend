import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../utils/button";
import { Card, CardContent } from "../../utils/card";
import { Input } from "../../utils/input";
import { Label } from "../../utils/label";
import { Separator } from "../../utils/separator";
import { useAuth } from "../../providers/providers";
import "./SignUpPage.css";
import axios from "axios";

// ✅ Import loaders
import { ButtonLoader, PageLoader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Call backend signup endpoint
    const response = await axios.post("http://localhost:8000/api/users/register/", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.email, // or any username logic
      email: formData.email,
      phone_number: formData.phoneNo,
      password: formData.password,
      password2: formData.confirmPassword,
      user_type: "CUSTOMER",
    });


    // Backend should return user info + token
    const { user, token } = response.data;

    // Save user info and token to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // Redirect to dashboard/home
    navigate("/dashboard");
  } catch (err: any) {
    console.error("Signup error:", err);
    setError(err.response?.data?.message || err.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-container">
      <div className="signup-layout">
        {/* Left image section */}
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

        {/* Right form section */}
        <div className="form-section">
          <Card className="form-card">
            {/* Form Header */}
            <div className="form-header">
              <img src="/auth btn.svg" alt="Auth btn" />
              <div className="signup-label">SignUp</div>
            </div>

            <CardContent className="form-content">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={formData.firstName}
                      onChange={handleChange}
                      required
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
                      value={formData.lastName}
                      onChange={handleChange}
                      required
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
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                      value={formData.password}
                      onChange={handleChange}
                      required
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
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div className="submit-section">
                  <Button
                    type="submit"
                    className="submit-button w-full"
                    disabled={loading}
                  >
                    {/* ✅ Loader inside button */}
                    {loading ? <ButtonLoader text="Signing up..." /> : "SignUp"}
                  </Button>
                </div>
              </form>

              <div className="separator-section">
                <Separator className="separator-line" />
                <span className="separator-text">Or</span>
                <Separator className="separator-line" />
              </div>

              <div className="login-section">
                <span className="login-text">Already have an account? </span>
                <Link className="login-link" to="/login">Login</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✅ Optional full-screen loader */}
      {loading && <PageLoader text="Creating your account..." variant="hotel" />}
    </div>
  );
};
