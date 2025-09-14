import React, { useState } from "react";
import { Mail, Phone, Edit, Pencil } from "lucide-react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import "./Settings.css";

const Settings: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: "Lorem Ipsum Hotel",
    country: "usa",
    city: "new-york",
    address: "123 Main St",
    policies: "No pets allowed",
  });

  const [contactInfo, setContactInfo] = useState([
    { type: "email", value: "loremipsum@gmail.com", time: "1 month ago" },
    { type: "phone", value: "9024xxxxxx", time: "1 month ago" },
  ]);

  const [newInputs, setNewInputs] = useState({
    email: [] as string[],
    phone: [] as string[],
  });

  const [logo, setLogo] = useState("/logo.png");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = () => setIsEditMode(true);

  const addEmailInput = () => {
    if (isEditMode)
      setNewInputs((prev) => ({ ...prev, email: [...prev.email, ""] }));
  };

  const addPhoneInput = () => {
    if (isEditMode)
      setNewInputs((prev) => ({ ...prev, phone: [...prev.phone, ""] }));
  };

  const updateNewInput = (
    type: "email" | "phone",
    index: number,
    value: string
  ) => {
    setNewInputs((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleSave = () => {
    setContactInfo((prev) => [
      ...prev,
      ...newInputs.email
        .filter((e) => e.trim())
        .map((e) => ({ type: "email", value: e, time: "Just now" })),
      ...newInputs.phone
        .filter((p) => p.trim())
        .map((p) => ({ type: "phone", value: p, time: "Just now" })),
    ]);
    setNewInputs({ email: [], phone: [] });
    setIsEditMode(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="settings-container">
      <Header />

      <main className="settings-main">
        <div className="settings-content">
          <div className="page-title">
            <h1 className="section-title">Hotel Profile</h1>
          </div>

          <div className="profile-section">
            <div className="profile-info">
              <div className="profile-avatar">
                <img src={logo} alt="Profile" className="avatar-image" />

                <label htmlFor="logo-upload" className="profile-edit-btn">
                  <Pencil size={16} />
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleLogoChange}
                />
              </div>

              <div className="profile-details">
                <h2 className="profile-name">{formData.hotelName}</h2>
                <p className="profile-email">
                  {contactInfo.find((c) => c.type === "email")?.value || ""}
                </p>
              </div>
            </div>
            {!isEditMode && (
              <button className="edit-button" onClick={handleEditClick}>
                <Edit size={16} className="edit-icon" />
                Edit
              </button>
            )}
          </div>

          <form className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.hotelName}
                  onChange={(e) =>
                    handleInputChange("hotelName", e.target.value)
                  }
                  readOnly={!isEditMode}
                  style={{ cursor: !isEditMode ? "not-allowed" : "text" }}
                  title={!isEditMode ? "Read-only" : ""}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <select
                  className="form-select"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  disabled={!isEditMode}
                  style={{ cursor: !isEditMode ? "not-allowed" : "pointer" }}
                  title={!isEditMode ? "Read-only" : ""}
                >
                  <option value="">Enter your country</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <select
                  className="form-select"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={!isEditMode}
                  style={{ cursor: !isEditMode ? "not-allowed" : "pointer" }}
                  title={!isEditMode ? "Read-only" : ""}
                >
                  <option value="">Enter your city</option>
                  <option value="new-york">New York</option>
                  <option value="london">London</option>
                  <option value="toronto">Toronto</option>
                  <option value="sydney">Sydney</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  readOnly={!isEditMode}
                  style={{ cursor: !isEditMode ? "not-allowed" : "text" }}
                  title={!isEditMode ? "Read-only" : ""}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">Policies</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={formData.policies}
                  onChange={(e) =>
                    handleInputChange("policies", e.target.value)
                  }
                  readOnly={!isEditMode}
                  style={{ cursor: !isEditMode ? "not-allowed" : "text" }}
                  title={!isEditMode ? "Read-only" : ""}
                />
              </div>
            </div>
          </form>

          <div className="contact-info-section">
            <h3 className="contact-title">Contact Info</h3>

            {/* Existing contacts (side by side always) */}
            <div className="contact-items">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">
                    {item.type === "email" ? (
                      <Mail size={20} stroke="red" />
                    ) : (
                      <Phone size={20} stroke="#212121" />
                    )}
                  </div>
                  {isEditMode ? (
                    <input
                      type={item.type === "email" ? "email" : "tel"}
                      className="form-input contact-value-input"
                      value={item.value}
                      onChange={(e) =>
                        setContactInfo((prev) =>
                          prev.map((c, i) =>
                            i === index ? { ...c, value: e.target.value } : c
                          )
                        )
                      }
                    />
                  ) : (
                    <div className="contact-value-display">
                      <span className="contact-value">{item.value}</span>
                      <span className="contact-time">{item.time}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* New inputs (only when editing, stacked) */}
            {isEditMode && (
              <div className="contact-items edit-mode">
                {newInputs.email.map((email, index) => (
                  <div key={`new-email-${index}`} className="contact-item">
                    <div className="contact-icon">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      className="form-input contact-value-input"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) =>
                        updateNewInput("email", index, e.target.value)
                      }
                    />
                  </div>
                ))}

                {newInputs.phone.map((phone, index) => (
                  <div key={`new-phone-${index}`} className="contact-item">
                    <div className="contact-icon">
                      <Phone size={20} />
                    </div>
                    <input
                      type="tel"
                      className="form-input contact-value-input"
                      placeholder="Enter phone"
                      value={phone}
                      onChange={(e) =>
                        updateNewInput("phone", index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {isEditMode && (
              <div className="contact-actions">
                <button
                  className="add-contact-btn"
                  type="button"
                  onClick={addEmailInput}
                >
                  + Add Email
                </button>
                <button
                  className="add-contact-btn"
                  type="button"
                  onClick={addPhoneInput}
                >
                  + Add Phone
                </button>
              </div>
            )}

            {isEditMode && (
              <div className="save-button-container">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
