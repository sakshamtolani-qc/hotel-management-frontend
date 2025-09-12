import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Bed, 
  Bath, 
  Car, 
  PawPrint,
  ChefHat,
  Tv,
  Snowflake,
  Wifi,
  Shirt,
  Mountain,
  Star,
  MessageCircle,
  Phone,
  Shield,
  Flame,
  AlertCircle,
  Zap,
  ChevronDown,
  ChevronUp,
  Coffee,
  Utensils,
  Wind,
  Lock,
} from 'lucide-react';
import { PageLoader } from '../../components/Loader/Loader';
import './RoomDetails.css';

// Mock data - will be replaced with API calls
const mockRoomData = {
  id: 1,
  title: "Single Room Set",
  location: "Ghaziabad, India",
  price: {
    range: "₹ 1000 - 5000 INR",
    shortPeriod: "₹ 1000",
    mediumPeriod: "₹ 2000",
    longPeriod: "₹ 5000"
  },
  features: {
    bedrooms: 1,
    bathrooms: 1,
    cars: 1,
    petsAllowed: 0
  },
  description: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  ],
  images: {
    main: "/room-main.png",
    thumbnails: [
      "/bathroom.png",
      "/balcony.png", 
      "/room-view.png",
      "/room-details.png",
      "/room-view.png"
    ]
  },
  amenities: [
    { icon: ChefHat, name: "Kitchen" },
    { icon: Tv, name: "Television with Netflix" },
    { icon: Snowflake, name: "Air Conditioner" },
    { icon: Wifi, name: "Free Wireless Internet" },
    { icon: Shirt, name: "Washer" },
    { icon: Mountain, name: "Balcony or Patio" },
    { icon: Coffee, name: "Coffee Machine" },
    { icon: Utensils, name: "Dining Area" },
    { icon: Wind, name: "Ceiling Fan" },
    { icon: Lock, name: "Security System" }
  ],
  safetyFeatures: [
    { icon: Shield, name: "Daily Cleaning" },
    { icon: Flame, name: "Fire Extinguishers" },
    { icon: Zap, name: "Disinfections and Sterilizations" },
    { icon: AlertCircle, name: "Smoke Detectors" }
  ],
  reviews: {
    overall: 5.0,
    ratings: {
      amenities: 5.0,
      communication: 5.0,
      valueForMoney: 5.0,
      hygiene: 5.0,
      locationOfProperty: 5.0
    }
  }
};

const RoomDetails: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleReserve = () => {
    navigate('/BookingForm');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockRoomData.title,
        text: 'Check out this amazing room!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleAmenities = () => {
    setShowAllAmenities(!showAllAmenities);
  };

  const handleOpenGallery = (image?: string) => {
    setCurrentImage(image || mockRoomData.images.main);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setCurrentImage(null);
  };

  const displayedAmenities = showAllAmenities 
    ? mockRoomData.amenities 
    : mockRoomData.amenities.slice(0, 6);

  if (loading) {
    return <PageLoader text="Loading Room Details..." />;
  }

  return (
    <div className="room-details">
      <div className="room-details-container">
        
        {/* Room Gallery */}
        <div className="room-gallery">
          <div className="main-image">
            <img 
              src={mockRoomData.images.main} 
              alt={`${mockRoomData.title} - Main View`} 
              onClick={() => handleOpenGallery(mockRoomData.images.main)}
            />
          </div>

          <div className="gallery-right">
            {mockRoomData.images.thumbnails.slice(0, 4).map((image, index) => {
              const extraImages = mockRoomData.images.thumbnails.length - 4;
              return (
                <div key={index} className="thumbnail">
                  <img 
                    src={image} 
                    alt={`Room view ${index + 1}`} 
                    onClick={() => handleOpenGallery(image)}
                  />
                  {index === 3 && extraImages > 0 && (
                    <button 
                      className="more-photos" 
                      onClick={() => handleOpenGallery()}
                    >
                      +{extraImages} More Photos
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Gallery Modal */}
       {/* Gallery Modal */}
        {isGalleryOpen && (
          <div className="gallery-modal">
            {/* Overlay */}
            <div className="gallery-overlay" onClick={handleCloseGallery}></div>

            {/* Modal Content */}
            <div className="gallery-content" onClick={e => e.stopPropagation()}>
              {/* Close Button */}
              <button className="close-btn" onClick={handleCloseGallery}>×</button>

              {/* Main Image with Arrows */}
              <div className="gallery-main">
                <button className="arrow left" onClick={() => {
                  const images = [mockRoomData.images.main, ...mockRoomData.images.thumbnails];
                  const currentIndex = images.indexOf(currentImage || mockRoomData.images.main);
                  const prevIndex = (currentIndex - 1 + images.length) % images.length;
                  setCurrentImage(images[prevIndex]);
                }}>
                  &#10094;
                </button>

                <img
                  src={currentImage || mockRoomData.images.main}
                  alt="Selected"
                  className="main-img"
                />

                <button className="arrow right" onClick={() => {
                  const images = [mockRoomData.images.main, ...mockRoomData.images.thumbnails];
                  const currentIndex = images.indexOf(currentImage || mockRoomData.images.main);
                  const nextIndex = (currentIndex + 1) % images.length;
                  setCurrentImage(images[nextIndex]);
                }}>
                  &#10095;
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="gallery-images">
                {[mockRoomData.images.main, ...mockRoomData.images.thumbnails].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i}`}
                    className={currentImage === img ? "active" : ""}
                    onClick={() => setCurrentImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Room Content */}
        <div className="room-content">
          <div className="room-main">
            {/* Room Header */}
            <div className="room-header">
              <div className="room-title">
                <h1>{mockRoomData.title}</h1>
                <p className="room-subtitle">{mockRoomData.location}</p>
              </div>
              <div className="room-actions">
                <button 
                  className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
                  onClick={handleLike}
                  aria-label="Like this room"
                >
                  <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button 
                  className="action-btn share-btn"
                  onClick={handleShare}
                  aria-label="Share this room"
                >
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            {/* Room Features */}
            <div className="room-features">
              <div className="feature-card">
                <div className="feature-icon"><Bed size={24} /></div>
                <div className="feature-text">{mockRoomData.features.bedrooms} Bedrooms</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Bath size={24} /></div>
                <div className="feature-text">{mockRoomData.features.bathrooms} Bathrooms</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Car size={24} /></div>
                <div className="feature-text">{mockRoomData.features.cars} Car</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><PawPrint size={24} /></div>
                <div className="feature-text">{mockRoomData.features.petsAllowed} Pets Allowed</div>
              </div>
            </div>

            {/* Room Description */}
            <div className="room-description">
              <h2>Room Description</h2>
              {mockRoomData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Offered Amenities */}
            <div className="amenities-section">
              <h2>Offered Amenities</h2>
              <div className="amenities-grid">
                {displayedAmenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <div className="amenity-icon"><amenity.icon size={20} /></div>
                    <span className="amenity-text">{amenity.name}</span>
                  </div>
                ))}
              </div>
              <button className="show-all-btn" onClick={toggleAmenities}>
                <span>
                  {showAllAmenities ? 'Show Less' : `Show All ${mockRoomData.amenities.length} Amenities`}
                </span>
                {showAllAmenities ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Safety and Hygiene */}
            <div className="safety-section">
              <h2>Safety and Hygiene</h2>
              <div className="safety-grid">
                {mockRoomData.safetyFeatures.map((feature, index) => (
                  <div key={index} className="safety-item">
                    <div className="safety-icon"><feature.icon size={20} /></div>
                    <span className="amenity-text">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h2>
                Reviews
                <div className="rating-badge">
                  <Star size={20} fill="currentColor" />
                  {mockRoomData.reviews.overall}
                </div>
              </h2>
              <div className="rating-bars">
                <div>
                  <div className="rating-item">
                    <span className="rating-label">Amenities</span>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${(mockRoomData.reviews.ratings.amenities / 5) * 100}%` }}></div>
                    </div>
                    <span className="rating-score">{mockRoomData.reviews.ratings.amenities}</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">Communication</span>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${(mockRoomData.reviews.ratings.communication / 5) * 100}%` }}></div>
                    </div>
                    <span className="rating-score">{mockRoomData.reviews.ratings.communication}</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">Value for Money</span>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${(mockRoomData.reviews.ratings.valueForMoney / 5) * 100}%` }}></div>
                    </div>
                    <span className="rating-score">{mockRoomData.reviews.ratings.valueForMoney}</span>
                  </div>
                </div>
                <div>
                  <div className="rating-item">
                    <span className="rating-label">Hygiene</span>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${(mockRoomData.reviews.ratings.hygiene / 5) * 100}%` }}></div>
                    </div>
                    <span className="rating-score">{mockRoomData.reviews.ratings.hygiene}</span>
                  </div>
                  <div className="rating-item">
                    <span className="rating-label">Location of Property</span>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: `${(mockRoomData.reviews.ratings.locationOfProperty / 5) * 100}%` }}></div>
                    </div>
                    <span className="rating-score">{mockRoomData.reviews.ratings.locationOfProperty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Sidebar */}
          <div className="room-sidebar">
            <div className="price-section">
              <div className="price-main">{mockRoomData.price.range}</div>
              <div className="price-periods">
                <div className="price-period">
                  <span>Short Period:</span>
                  <span>{mockRoomData.price.shortPeriod}</span>
                </div>
                <div className="price-period">
                  <span>Medium Period:</span>
                  <span>{mockRoomData.price.mediumPeriod}</span>
                </div>
                <div className="price-period">
                  <span>Long Period:</span>
                  <span>{mockRoomData.price.longPeriod}</span>
                </div>
              </div>
            </div>

            <button className="reserve-btn" onClick={handleReserve}>
              Reserve Now
            </button>

            <div className="contact-actions">
              <button className="contact-btn">
                <MessageCircle size={18} />
                Room Inquiry
              </button>
              <button className="contact-btn">
                <Phone size={18} />
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
