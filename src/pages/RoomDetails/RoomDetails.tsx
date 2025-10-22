// src/pages/Rooms/RoomDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { PageLoader } from "@/components/Loader/Loader";
import { getRoom } from "@/services/api/rooms";
import { Room } from "@/types/Room";
import axios from "axios";
import "./RoomDetails.css";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch room data from backend
  // useEffect(() => {
  //   if (!roomId) return;
  //   setLoading(true);
  //   getRoom(Number(roomId))
  //     .then((data) => {
  //       setRoom(data);
  //       setIsLiked(data.isFavorite ?? false);
  //     })
  //     .catch((err) => console.error("Failed to fetch room:", err))
  //     .finally(() => setLoading(false));
  // }, [roomId]);

 useEffect(() => {
  if (!roomId) return;
  setLoading(true);

  getRoom(Number(roomId))
    .then((data) => {
      // Ensure we always have an 'images' array
      const allImages: string[] = data.images || [];
      const roomData: Room = {
        ...data,
        images: allImages,
        additional_images: allImages.length > 1 ? allImages.slice(1) : [],
      };
      
      setRoom(roomData);
      setIsLiked(roomData.isFavorite ?? false);

      console.log("Mapped Room:", roomData);
      console.log("All images:", roomData.images);
      console.log("Additional images:", roomData.additional_images);
    })
    .catch((err) => console.error("Failed to fetch room:", err))
    .finally(() => setLoading(false));
}, [roomId]);


  if (loading || !room) return <PageLoader text="Loading Room Details..." />;

  // Price calculation
  const priceShort = room.price_per_night;
  const priceMedium = room.price_per_night * 3;
  const priceLong = room.price_per_night * 5;

  // Handle Reserve Now
  const handleReserve = () => {
    navigate(`/reservations/create?roomId=${room.room_id}`);
  };

  // Handle Check Out
  const handleCheckOut = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/reservations/list/?room_id=${room.room_id}&status=checked_in`
      );
      const reservation = response.data[0];
      if (!reservation) {
        alert("No active reservation found to check out.");
        return;
      }

      await axios.patch(
        `http://127.0.0.1:8000/reservations/${reservation.reservation_id}/update-status/`,
        { reservation_status: "checked_out" }
      );

      alert("Checked out successfully!");
      navigate("/reservations");
    } catch (err) {
      console.error(err);
      alert("Failed to check out. Please try again.");
    }
  };

  // Amenities
  const displayedAmenities = showAllAmenities
    ? [
        { icon: ChefHat, name: "Kitchen", available: room.amenities.kitchen },
        { icon: Tv, name: "Television with Netflix", available: room.amenities.television },
        { icon: Snowflake, name: "Air Conditioner", available: room.amenities.airCondition },
        { icon: Wifi, name: "Free Wireless Internet", available: room.amenities.wifi },
        { icon: Shirt, name: "Washer", available: room.amenities.washer },
        { icon: Mountain, name: "Balcony or Patio", available: room.amenities.balcony },
        { icon: Coffee, name: "Coffee Machine", available: room.sanitizers },
        { icon: Utensils, name: "Dining Area", available: room.daily_cleaning },
        { icon: Wind, name: "Ceiling Fan", available: room.amenities.airCondition },
        { icon: Lock, name: "Security System", available: true },
      ].filter((a) => a.available)
    : [
        { icon: ChefHat, name: "Kitchen", available: room.amenities.kitchen },
        { icon: Tv, name: "Television with Netflix", available: room.amenities.television },
        { icon: Snowflake, name: "Air Conditioner", available: room.amenities.airCondition },
        { icon: Wifi, name: "Free Wireless Internet", available: room.amenities.wifi },
        { icon: Shirt, name: "Washer", available: room.amenities.washer },
        { icon: Mountain, name: "Balcony or Patio", available: room.amenities.balcony },
      ].filter((a) => a.available);

  // Safety
  const safetyFeatures = [
    { icon: Shield, name: "Daily Cleaning", available: room.daily_cleaning },
    { icon: Flame, name: "Fire Extinguishers", available: room.fire_extinguisher },
    { icon: Zap, name: "Disinfections and Sterilizations", available: room.sanitizers },
    { icon: AlertCircle, name: "Smoke Detectors", available: true },
  ].filter((a) => a.available);

  // Images
  const images = room.images || [];
console.log("All images:", images);
console.log("Additional images:", room.additional_images);


  const handleOpenGallery = (img?: string) => {
    setCurrentImage(img || images[0]);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setCurrentImage(null);
    setIsGalleryOpen(false);
  };

  // Placeholder Reviews (frontend only)
  const reviews = [
    { name: "John Doe", rating: 5, comment: "Excellent room and service!" },
    { name: "Jane Smith", rating: 4, comment: "Very comfortable stay." },
  ];

  return (
    <div className="room-details">
      <div className="room-details-container">
        {/* Room Gallery */}
        <div className="room-gallery">
          <div className="main-image">
            <img
              src={images[0]}
              alt={`${room.title} Main`}
              onClick={() => handleOpenGallery(images[0])}
            />
          </div>
          <div className="gallery-right">
            {images.slice(1, 5).map((img, idx) => {
              const extra = images.length - 5;
              return (
                <div key={idx} className="thumbnail">
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => handleOpenGallery(img)}
                  />
                  {idx === 3 && extra > 0 && (
                    <button className="more-photos" onClick={() => handleOpenGallery()}>
                      +{extra} More
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Gallery Modal */}
        {isGalleryOpen && (
          <div className="gallery-modal">
            <div className="gallery-overlay" onClick={handleCloseGallery}></div>
            <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseGallery}>×</button>
              <div className="gallery-main">
                <button
                  className="arrow left"
                  onClick={() => {
                    const idx = images.indexOf(currentImage!);
                    const prev = (idx - 1 + images.length) % images.length;
                    setCurrentImage(images[prev]);
                  }}
                >
                  &#10094;
                </button>
                <img src={currentImage!} alt="Current" className="main-img" />
                <button
                  className="arrow right"
                  onClick={() => {
                    const idx = images.indexOf(currentImage!);
                    const next = (idx + 1) % images.length;
                    setCurrentImage(images[next]);
                  }}
                >
                  &#10095;
                </button>
              </div>
              <div className="gallery-images">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx}`}
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
            <div className="room-header">
              <div className="room-title">
                <h1>{room.title}</h1>
                <p className="room-subtitle">Ghaziabad, India</p>
              </div>
              <div className="room-actions">
                <button className={`action-btn like-btn ${isLiked ? "liked" : ""}`} onClick={() => setIsLiked(!isLiked)}>
                  <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="action-btn share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="room-features">
              <div className="feature-card">
                <div className="feature-icon"><Bed size={24} /></div>
                <div className="feature-text">{room.amenities.beds} Beds</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Bath size={24} /></div>
                <div className="feature-text">{room.amenities.bathrooms} Bathrooms</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><Car size={24} /></div>
                <div className="feature-text">{room.amenities.parking} Parking</div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><PawPrint size={24} /></div>
                <div className="feature-text">{room.amenities.guests} Guests</div>
              </div>
            </div>

            {/* Description */}
            <div className="room-description">
              <h2>Description</h2>
              {room.description.split('\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h2>Offered Amenities</h2>
              <div className="amenities-grid">
                {displayedAmenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="amenity-item">
                      <Icon size={20} />
                      <span>{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
              <button className="show-all-btn" onClick={() => setShowAllAmenities(!showAllAmenities)}>
                {showAllAmenities ? "Show Less" : `Show All {Object.keys(room.amenities).length} Amenities`} 
                {showAllAmenities ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* Safety */}
            <div className="safety-section">
              <h2>Safety and Hygiene</h2>
              <div className="safety-grid">
                {safetyFeatures.map((safe, idx) => {
                  const Icon = safe.icon;
                  return (
                    <div key={idx} className="safety-item">
                      <Icon size={20} />
                      <span>{safe.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews (Frontend Only) */}
            {/* <div className="reviews-section">
              <h2>Reviews</h2>
              {reviews.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="review-header">
                    <span className="reviewer-name">{rev.name}</span>
                    <span className="review-rating">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="review-comment">{rev.comment}</p>
                </div>
              ))}
            </div> */}

              {/* Reviews Section */}
<div className="reviews-section">
  <h2>Reviews</h2>

  {/* Overall Rating */}
  <div className="overall-rating">
    <span className="rating-value">—</span> {/* blank/placeholder */}
    <span className="stars">⭐⭐⭐⭐⭐</span>
  </div>

  {/* Category Ratings */}
  <div className="category-ratings">
    <div className="rating-item">
      <span>Amenities:</span>
      <span className="stars">⭐⭐⭐⭐⭐</span>
    </div>
    <div className="rating-item">
      <span>Communication:</span>
      <span className="stars">⭐⭐⭐⭐⭐</span>
    </div>
    <div className="rating-item">
      <span>Value for Money:</span>
      <span className="stars">⭐⭐⭐⭐⭐</span>
    </div>
    <div className="rating-item">
      <span>Hygiene:</span>
      <span className="stars">⭐⭐⭐⭐⭐</span>
    </div>
    <div className="rating-item">
      <span>Location:</span>
      <span className="stars">⭐⭐⭐⭐⭐</span>
    </div>
  </div>
</div>


          </div>

          {/* Sidebar */}
          <div className="room-sidebar">
            <div className="price-card">
              <div className="price">
                <span>₹{room.price_per_night}</span> / night
              </div>
              <div className="price-duration">
                <div>Short (1 day): ₹{priceShort}</div>
                <div>Medium (3 days): ₹{priceMedium}</div>
                <div>Long (5+ days): ₹{priceLong}</div>
              </div>
              <br />
              <button className="reserve-btn" onClick={handleReserve}>Reserve Now</button>
              <button className="checkout-btn" onClick={handleCheckOut}>Check Out</button>
            </div>

            <div className="contact-actions">
              <button className="contact-btn">
                <MessageCircle size={18} /> Room Inquiry
              </button>
              <button className="contact-btn">
                <Phone size={18} /> Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
