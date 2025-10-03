import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Tv, Wifi, WashingMachine, Home, Snowflake, ChefHat, FileText, Shield, Flame, SprayCan as Spray, Upload } from 'lucide-react';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';
import { PageLoader, ButtonLoader, ProgressLoader, InlineLoader } from '../../components/Loader/Loader';
import './AddRoomPage.css';

interface FacilityCount {
  beds: number;
  bathrooms: number;
  parking: number;
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
  const [roomNo, setRoomNo] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('');
  const [facilities, setFacilities] = useState<FacilityCount>({
    beds: 0,
    bathrooms: 0,
    parking: 0
  });
  const [amenities, setAmenities] = useState<SelectedAmenities>({
    television: false,
    wifi: false,
    washer: false,
    balcony: false,
    airCondition: false,
    kitchen: false,
    other: false
  });
  const [safety, setSafety] = useState<SelectedSafety>({
    sanitizers: false,
    fireThrowers: false,
    dailyCleaner: false,
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false
  });
  const [roomDescription, setRoomDescription] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<Array<{file: File, preview: string, id: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploading, setFileUploading] = useState(false);

  const updateFacilityCount = (type: keyof FacilityCount, increment: boolean) => {
    setFacilities(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const toggleAmenity = (amenity: keyof SelectedAmenities) => {
    setAmenities(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };

  const toggleSafety = (safetyItem: keyof SelectedSafety) => {
    setSafety(prev => ({
      ...prev,
      [safetyItem]: !prev[safetyItem]
    }));
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileUploading(true);
      
      try {
        // Simulate file processing delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newImages = Array.from(files).map(file => ({
          file,
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9)
        }));
        
        // Add new images to existing ones (allows multiple additions)
        setSelectedImages(prev => [...prev, ...newImages]);
        
        // Reset file input so same files can be selected again if needed
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        console.log('Selected files:', files);
      } catch (error) {
        console.error('Error processing files:', error);
        alert('Error processing files. Please try again.');
      } finally {
        setFileUploading(false);
      }
    }
  };

  const removeImage = (id: string) => {
    setSelectedImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        // Clean up the preview URL to prevent memory leaks
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup function to revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedImages.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [selectedImages]);

  // Handle form submission with loading state
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      // Import the rooms service
      const { createRoom } = await import('../../services/api/rooms');
      
      // Prepare form data for API submission
      const formData = {
        roomNo,
        priceRange,
        facilities,
        amenities,
        safety,
        roomDescription,
        images: selectedImages
      };
      
      // Submit to Django API
      const createdRoom = await createRoom(formData);
      
      console.log('Room created successfully:', createdRoom);
      alert('Room posted successfully!');
      
      // Reset form after successful submission
      setRoomNo('');
      setPriceRange('');
      setFacilities({ beds: 0, bathrooms: 0, parking: 0 });
      setAmenities({
        television: false,
        wifi: false,
        washer: false,
        balcony: false,
        airCondition: false,
        kitchen: false,
        other: false
      });
      setSafety({
        sanitizers: false,
        fireThrowers: false,
        dailyCleaner: false,
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false
      });
      setRoomDescription('');
      setSelectedImages([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error posting room. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handlePreview = () => {
    console.log('Preview room:', {
      roomNo,
      priceRange,
      facilities,
      amenities,
      safety,
      roomDescription,
      images: selectedImages
    });
    alert('Preview functionality would open a preview modal here!');
  };

  // Show loading screen initially
  if (loading) {
    return <PageLoader text="Loading Add Room Page..." variant="hotel" />;
  }

  return (
    <div className="add-room-container">
      {/* <Header /> */}
      
      <div className="add-room-content">
        <main className="add-room-main">
          {/* Description Section */}
          <section className="description-section">
            <h1 className="section-title">Add a short description of your place.</h1>
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Room No.</label>
                <input
                  type="text"
                  placeholder=""
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="room-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Price Range</label>
                <input
                  type="text"
                  placeholder=""
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="room-input"
                />
              </div>
            </div>
          </section>

          {/* Facilities Section */}
          <section className="facilities-section">
            <h2 className="section-title">Add facilities available at your place.</h2>
            <div className="facilities-grid">
              <div className="facility-counter">
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('beds', false)}
                >
                  <Minus size={20} />
                </button>
                <div className="counter-display">
                  <span className="counter-number">{facilities.beds}</span>
                  <span className="counter-label">Beds</span>
                </div>
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('beds', true)}
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="facility-counter">
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('bathrooms', false)}
                >
                  <Minus size={20} />
                </button>
                <div className="counter-display">
                  <span className="counter-number">{facilities.bathrooms}</span>
                  <span className="counter-label">Bathrooms</span>
                </div>
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('bathrooms', true)}
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="facility-counter">
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('parking', false)}
                >
                  <Minus size={20} />
                </button>
                <div className="counter-display">
                  <span className="counter-number">{facilities.parking}</span>
                  <span className="counter-label">Parking</span>
                </div>
                <button 
                  className="counter-btn"
                  onClick={() => updateFacilityCount('parking', true)}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Amenities Section */}
          <section className="amenities-section">
            <h2 className="section-title">Add amenities available at your place.</h2>
            <div className="amenities-grid">
              <div 
                className={`amenity-card ${amenities.television ? 'selected' : ''}`}
                onClick={() => toggleAmenity('television')}
              >
                <Tv size={24} />
                <span>Television</span>
              </div>
              <div 
                className={`amenity-card ${amenities.wifi ? 'selected' : ''}`}
                onClick={() => toggleAmenity('wifi')}
              >
                <Wifi size={24} />
                <span>Wifi</span>
              </div>
              <div 
                className={`amenity-card ${amenities.washer ? 'selected' : ''}`}
                onClick={() => toggleAmenity('washer')}
              >
                <WashingMachine size={24} />
                <span>Washer</span>
              </div>
              <div 
                className={`amenity-card ${amenities.balcony ? 'selected' : ''}`}
                onClick={() => toggleAmenity('balcony')}
              >
                <Home size={24} />
                <span>Balcony</span>
              </div>
              <div 
                className={`amenity-card ${amenities.airCondition ? 'selected' : ''}`}
                onClick={() => toggleAmenity('airCondition')}
              >
                <Snowflake size={24} />
                <span>Air Condition</span>
              </div>
              <div 
                className={`amenity-card ${amenities.kitchen ? 'selected' : ''}`}
                onClick={() => toggleAmenity('kitchen')}
              >
                <ChefHat size={24} />
                <span>Kitchen</span>
              </div>
              <div 
                className={`amenity-card ${amenities.other ? 'selected' : ''}`}
                onClick={() => toggleAmenity('other')}
              >
                <FileText size={24} />
                <span>Other</span>
              </div>
              <div 
                className={`amenity-card ${amenities.other ? 'selected' : ''}`}
                onClick={() => toggleAmenity('other')}
              >
                <FileText size={24} />
                <span>Other</span>
              </div>
            </div>
          </section>

          {/* Safety Section */}
          <section className="safety-section">
            <h2 className="section-title">Add saftey available at your place.</h2>
            <div className="safety-grid">
              <div 
                className={`safety-card ${safety.sanitizers ? 'selected' : ''}`}
                onClick={() => toggleSafety('sanitizers')}
              >
                <Spray size={24} />
                <span>Sanitizers</span>
              </div>
              <div 
                className={`safety-card ${safety.fireThrowers ? 'selected' : ''}`}
                onClick={() => toggleSafety('fireThrowers')}
              >
                <Flame size={24} />
                <span>Fire Throwers</span>
              </div>
              <div 
                className={`safety-card ${safety.dailyCleaner ? 'selected' : ''}`}
                onClick={() => toggleSafety('dailyCleaner')}
              >
                <Shield size={24} />
                <span>Daily Cleaner</span>
              </div>
              <div 
                className={`safety-card ${safety.option1 ? 'selected' : ''}`}
                onClick={() => toggleSafety('option1')}
              >
                <FileText size={24} />
                <span>Option</span>
              </div>
              <div 
                className={`safety-card ${safety.option2 ? 'selected' : ''}`}
                onClick={() => toggleSafety('option2')}
              >
                <FileText size={24} />
                <span>Option</span>
              </div>
              <div 
                className={`safety-card ${safety.option3 ? 'selected' : ''}`}
                onClick={() => toggleSafety('option3')}
              >
                <FileText size={24} />
                <span>Option</span>
              </div>
              <div 
                className={`safety-card ${safety.option4 ? 'selected' : ''}`}
                onClick={() => toggleSafety('option4')}
              >
                <FileText size={24} />
                <span>Option</span>
              </div>
              <div 
                className={`safety-card ${safety.option5 ? 'selected' : ''}`}
                onClick={() => toggleSafety('option5')}
              >
                <FileText size={24} />
                <span>Option</span>
              </div>
            </div>
          </section>

          {/* Room Description Section */}
          <section className="room-description-section">
            <h2 className="section-title">Room Description</h2>
            <div className="description-row">
              <div className="description-input">
                <textarea
                  placeholder="Lorem ipsum"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  className="description-textarea"
                />
              </div>
              <div className="upload-section">
                <div className="upload-area" onClick={handleFileUpload} style={{ opacity: fileUploading ? 0.7 : 1 }}>
                  {fileUploading ? (
                    <InlineLoader size="medium" text="Processing..." variant="dots" />
                  ) : (
                    <>
                      <Upload size={40} />
                      <div className="upload-text">
                        <span className="upload-number">{selectedImages.length > 0 ? `+${selectedImages.length}` : '+1'}</span>
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
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            
            {/* Image Preview Section */}
            {selectedImages.length > 0 && (
              <div className="image-preview-section">
                <h3 className="preview-title">Selected Images ({selectedImages.length})</h3>
                <div className="image-preview-grid">
                  {selectedImages.map((image) => (
                    <div key={image.id} className="preview-item">
                      <img src={image.preview} alt="Preview" className="preview-image" />
                      <div className="preview-overlay">
                        <button 
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(image.id)}
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                      <div className="image-name">{image.file.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Progress Bar for Upload */}
          {submitting && uploadProgress > 0 && (
            <div className="upload-progress-section">
              <ProgressLoader 
                progress={uploadProgress} 
                text="Uploading room data..." 
              />
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
              {submitting ? (
                <ButtonLoader text="Posting..." />
              ) : (
                'Post My Room'
              )}
            </button>
          </section>
        </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AddRoomPage;