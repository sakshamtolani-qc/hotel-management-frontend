import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Minus,
  Tv,
  Wifi,
  WashingMachine,
  Home,
  Snowflake,
  ChefHat,
  FileText,
  Shield,
  Flame,
  SprayCan as Spray,
  Upload,
} from "lucide-react";
import {
  PageLoader,
  ButtonLoader,
  ProgressLoader,
  InlineLoader,
} from "../../components/Loader/Loader";
import "./AddRoomPage.css";
import { AddRoomFormData } from "../../services/api/rooms";

interface FacilityCount {
  beds: number;
  bathrooms: number;
  parking: number;
  guests: number
}

interface SelectedAmenities {
  television: boolean;
  wifi: boolean;
  washer: boolean;
  balcony: boolean;
  airCondition: boolean;
  kitchen: boolean;
  other: boolean;
}

interface SelectedSafety {
  sanitizers: boolean;
  fireThrowers: boolean;
  dailyCleaner: boolean;
  option1: boolean;
  option2: boolean;
  option3: boolean;
  option4: boolean;
  option5: boolean;
}

const AddRoomPage: React.FC = () => {
  const [roomNo, setRoomNo] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [facilities, setFacilities] = useState<FacilityCount>({
    beds: 0,
    bathrooms: 0,
    parking: 0,
    guests:1,
  });
  const [amenities, setAmenities] = useState<SelectedAmenities>({
    television: false,
    wifi: false,
    washer: false,
    balcony: false,
    airCondition: false,
    kitchen: false,
    other: false,
  });
  const [safety, setSafety] = useState<SelectedSafety>({
    sanitizers: false,
    fireThrowers: false,
    dailyCleaner: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });
  const [roomDescription, setRoomDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<
    Array<{ file: File; preview: string; id: string }>
  >([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploading, setFileUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------------
  // Facility Counter Update
  // -------------------------------
  const updateFacilityCount = (type: keyof FacilityCount, increment: boolean) => {
    setFacilities((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  // -------------------------------
  // Toggle Amenities and Safety
  // -------------------------------
  const toggleAmenity = (amenity: keyof SelectedAmenities) =>
    setAmenities((prev) => ({ ...prev, [amenity]: !prev[amenity] }));

  const toggleSafety = (safetyItem: keyof SelectedSafety) =>
    setSafety((prev) => ({ ...prev, [safetyItem]: !prev[safetyItem] }));

  // -------------------------------
  // Image Upload Handling
  // -------------------------------
  const handleFileUpload = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileUploading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const newImages = Array.from(files).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9),
        }));
        setSelectedImages((prev) => [...prev, ...newImages]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch {
        alert("Error processing selected files.");
      } finally {
        setFileUploading(false);
      }
    }
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);
      return prev.filter((img) => img.id !== id);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(
    () => () => selectedImages.forEach((img) => URL.revokeObjectURL(img.preview)),
    [selectedImages]
  );

  // -------------------------------
  // Handle Submit
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  setUploadProgress(0);

  const progressInterval = setInterval(() => {
    setUploadProgress((prev) => {
      if (prev >= 100) {
        clearInterval(progressInterval);
        return 100;
      }
      return prev + 10;
    });
  }, 200);

  try {
     const { createRoom } = await import("../../services/api/rooms");

     // ✅ Correct: Pass object, not FormData
    const roomData: AddRoomFormData = {
      roomNo,
      title: `Room ${roomNo}`,
      roomDescription,
      category: "Standard" as "Standard",  // ✅ cast to literal type
      price_per_night: parseInt(priceRange) || 0,
      facilities,
      amenities,
      safety,
      images: selectedImages.map((img) => ({ file: img.file, preview: img.preview, id: img.id })),
    };


    const createdRoom = await createRoom(roomData);

    // // Create FormData
    // const formData = new FormData();
    // formData.append("roomNo", roomNo);
    // formData.append("price_per_night", priceRange);
    // formData.append("roomDescription", roomDescription);

    // // Append facilities
    // formData.append("facilities", JSON.stringify(facilities));

    // // Append amenities
    // formData.append("amenities", JSON.stringify(amenities));

    // // Append safety
    // formData.append("safety", JSON.stringify(safety));

    // // Append images
    // selectedImages.forEach((img) => {
    //   formData.append("images", img.file);
    // });

    // // Call API
    
    // const createdRoom = await createRoom(formData);


    console.log("✅ Room created:", createdRoom);
    alert("Room posted successfully!");

    // Reset form
    setRoomNo("");
    setPriceRange("");
    setFacilities({ beds: 0, bathrooms: 0, parking: 0 , guests: 0});
    setAmenities({
      television: false,
      wifi: false,
      washer: false,
      balcony: false,
      airCondition: false,
      kitchen: false,
      other: false,
    });
    setSafety({
      sanitizers: false,
      fireThrowers: false,
      dailyCleaner: false,
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
    });
    setRoomDescription("");
    setSelectedImages([]);
  } catch (error: any) {
    alert(error?.message || "Error posting room!");
  } finally {
    setSubmitting(false);
    setUploadProgress(0);
  }
};


  const handlePreview = () => {
    console.log({
      roomNo,
      priceRange,
      facilities,
      amenities,
      safety,
      roomDescription,
      images: selectedImages,
    });
    alert("Preview modal would open here!");
  };

  if (loading) return <PageLoader text="Loading Add Room Page..." variant="hotel" />;

  return (
    <div className="add-room-container">
      <div className="add-room-content">
        <main className="add-room-main">
          {/* Room Details */}
          <section className="description-section">
            <h1 className="section-title">Add a short description of your place.</h1>
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Room No.</label>
                <input
                  type="text"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="room-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Price Range</label>
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="room-input"
                />
              </div>
            </div>
          </section>

          {/* Facilities */}
          <section className="facilities-section">
            <h2 className="section-title">Add facilities available at your place.</h2>
            <div className="facilities-grid">
              {(["beds", "bathrooms", "parking"] as Array<keyof FacilityCount>).map((type) => (
                <div key={type} className="facility-counter">
                  <button
                    className="counter-btn"
                    onClick={() => updateFacilityCount(type, false)}
                  >
                    <Minus size={20} />
                  </button>
                  <div className="counter-display">
                    <span className="counter-number">{facilities[type]}</span>
                    <span className="counter-label">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </div>
                  <button
                    className="counter-btn"
                    onClick={() => updateFacilityCount(type, true)}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="amenities-section">
            <h2 className="section-title">Add amenities available at your place.</h2>
            <div className="amenities-grid">
              {Object.keys(amenities).map((key) => (
                <div
                  key={key}
                  className={`amenity-card ${
                    amenities[key as keyof SelectedAmenities] ? "selected" : ""
                  }`}
                  onClick={() => toggleAmenity(key as keyof SelectedAmenities)}
                >
                  {key === "television" && <Tv size={24} />}
                  {key === "wifi" && <Wifi size={24} />}
                  {key === "washer" && <WashingMachine size={24} />}
                  {key === "balcony" && <Home size={24} />}
                  {key === "airCondition" && <Snowflake size={24} />}
                  {key === "kitchen" && <ChefHat size={24} />}
                  {key === "other" && <FileText size={24} />}
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Safety */}
          <section className="safety-section">
            <h2 className="section-title">Add safety features available at your place.</h2>
            <div className="safety-grid">
              {Object.keys(safety).map((key) => (
                <div
                  key={key}
                  className={`safety-card ${
                    safety[key as keyof SelectedSafety] ? "selected" : ""
                  }`}
                  onClick={() => toggleSafety(key as keyof SelectedSafety)}
                >
                  {key === "sanitizers" && <Spray size={24} />}
                  {key === "fireThrowers" && <Flame size={24} />}
                  {key === "dailyCleaner" && <Shield size={24} />}
                  {key.startsWith("option") && <FileText size={24} />}
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Description & Images */}
          <section className="room-description-section">
            <h2 className="section-title">Room Description & Images</h2>
            <div className="description-row">
              <textarea
                placeholder="Describe your room..."
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="description-textarea"
              />
              <div className="upload-section">
                <div
                  className="upload-area"
                  onClick={handleFileUpload}
                  style={{ opacity: fileUploading ? 0.7 : 1 }}
                >
                  {fileUploading ? (
                    <InlineLoader size="medium" text="Processing..." variant="dots" />
                  ) : (
                    <>
                      <Upload size={40} />
                      <div className="upload-text">
                        <span className="upload-number">
                          {selectedImages.length > 0
                            ? `+${selectedImages.length}`
                            : "+1"}
                        </span>
                        <div className="upload-label">
                          <div>Upload</div>
                          <div>Photos</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {selectedImages.length > 0 && (
              <div className="image-preview-section">
                <h3 className="preview-title">
                  Selected Images ({selectedImages.length})
                </h3>
                <div className="image-preview-grid">
                  {selectedImages.map((img) => (
                    <div key={img.id} className="preview-item">
                      <img src={img.preview} alt="Preview" className="preview-image" />
                      <div className="preview-overlay">
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(img.id)}
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                      <div className="image-name">{img.file.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Progress Bar */}
          {submitting && uploadProgress > 0 && (
            <div className="upload-progress-section">
              <ProgressLoader progress={uploadProgress} text="Uploading room data..." />
            </div>
          )}

          {/* Action Buttons */}
          <section className="action-section">
            <button
              type="button"
              className="btn-secondary"
              onClick={handlePreview}
              disabled={submitting}
            >
              Preview
            </button>
            <button
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? <ButtonLoader text="Posting..." /> : "Post My Room"}
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AddRoomPage;
