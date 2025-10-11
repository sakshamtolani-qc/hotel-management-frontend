// src/pages/Rooms/RoomDetails.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams , useLocation } from 'react-router-dom';
import { 
  Heart, Share2, Bed, Bath, Car, PawPrint,
  ChefHat, Tv, Snowflake, Wifi, Shirt, Mountain,
  Star, MessageCircle, Phone, Shield, Flame, AlertCircle,
  Zap, ChevronDown, ChevronUp, Coffee, Utensils, Wind, Lock
} from 'lucide-react';
import { PageLoader } from '../../components/Loader/Loader';
import { Room } from '../../types/Room';
import { getRoom, toggleFavorite } from '../../services/api/rooms';
import './RoomDetails.css';

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const location = useLocation();
  const roomFromState = location.state?.room as Room | undefined;

  const [roomData, setRoomData] = useState<Room | null>(roomFromState || null);
  const [loading, setLoading] = useState(!roomFromState);

  const [error, setError] = useState<string | null>(null);
  const [showAllAmenities, setShowAllAmenities] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  // Fetch room details
  useEffect(() => {
    if (!roomId) return;

    setLoading(true);
    getRoom(parseInt(roomId))
      .then((data) => {
        setRoomData(data);
        setError(null);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err.message || 'Failed to load room details.');
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  // Handle like
  const handleLike = async () => {
    if (!roomData) return;
    try {
      const updatedRoom = await toggleFavorite(roomData.room_id);
      setRoomData(updatedRoom);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  // Handle share
  const handleShare = () => {
    if (!roomData) return;
    if (navigator.share) {
      navigator.share({
        title: roomData.title,
        text: 'Check out this room!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle reserve
  const handleReserve = () => {
    if (!roomData) return;
    navigate(`/reservations/create?roomId=${roomData.room_id}`);
  };

  const toggleAmenities = () => setShowAllAmenities(!showAllAmenities);

  const handleOpenGallery = (img?: string) => {
    if (!roomData) return;
    setCurrentImage(img || roomData.image);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setCurrentImage(null);
  };

  if (loading) return <PageLoader text="Loading Room Details..." />;

  if (error) {
    return (
      <div className="room-details-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!roomData) return null;

  // Amenities array based on Room interface
  const amenitiesList = [
    { icon: ChefHat, name: 'Kitchen', available: roomData.kitchen },
    { icon: Tv, name: 'Television', available: roomData.television },
    { icon: Snowflake, name: 'Air Conditioner', available: roomData.air_condition },
    { icon: Wifi, name: 'WiFi', available: roomData.wifi },
    { icon: Shirt, name: 'Washer', available: roomData.washer },
    { icon: Mountain, name: 'Balcony', available: roomData.balcony },
    { icon: Coffee, name: 'Coffee Machine', available: true },
    { icon: Utensils, name: 'Dining Area', available: true },
    { icon: Wind, name: 'Ceiling Fan', available: true },
    { icon: Lock, name: 'Security', available: true },
  ];

  const displayedAmenities = showAllAmenities ? amenitiesList : amenitiesList.slice(0, 6);

  // Safety Features
  const safetyList = [
    { icon: Shield, name: 'Daily Cleaning', available: roomData.daily_cleaning },
    { icon: Flame, name: 'Fire Extinguisher', available: roomData.fire_extinguisher },
    { icon: Zap, name: 'Disinfection', available: true },
    { icon: AlertCircle, name: 'Smoke Detector', available: true }
  ];

  return (
    <div className="room-details">
      <div className="room-details-container">
        
        {/* Gallery */}
        <div className="room-gallery">
          <div className="main-image">
            <img src={roomData.image} alt={roomData.title} onClick={() => handleOpenGallery()} />
          </div>
          <div className="gallery-right">
            {roomData.additional_images.slice(0,4).map((img, idx) => {
              const extra = roomData.additional_images.length - 4;
              return (
                <div key={idx} className="thumbnail">
                  <img src={img} alt={`Room image ${idx+1}`} onClick={() => handleOpenGallery(img)} />
                  {idx === 3 && extra > 0 && (
                    <button className="more-photos" onClick={() => handleOpenGallery()}>
                      +{extra} More Photos
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
            <div className="gallery-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseGallery}>×</button>
              <div className="gallery-main">
                <button className="arrow left" onClick={() => {
                  const images = [roomData.image, ...roomData.additional_images];
                  const idx = images.indexOf(currentImage || roomData.image);
                  setCurrentImage(images[(idx-1+images.length)%images.length]);
                }}>&#10094;</button>

                <img src={currentImage || roomData.image} alt="Selected" className="main-img" />

                <button className="arrow right" onClick={() => {
                  const images = [roomData.image, ...roomData.additional_images];
                  const idx = images.indexOf(currentImage || roomData.image);
                  setCurrentImage(images[(idx+1)%images.length]);
                }}>&#10095;</button>
              </div>

              <div className="gallery-images">
                {[roomData.image, ...roomData.additional_images].map((img,i)=>(
                  <img key={i} src={img} className={currentImage===img?"active":""} onClick={()=>setCurrentImage(img)} />
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
                <h1>{roomData.title}</h1>
                <p className="room-subtitle">Guests: {roomData.guests} | Beds: {roomData.beds}</p>
              </div>
              <div className="room-actions">
                <button className={`action-btn like-btn ${roomData.isFavorite ? 'liked':''}`} onClick={handleLike}>
                  <Heart size={24} fill={roomData.isFavorite?'currentColor':'none'} />
                </button>
                <button className="action-btn share-btn" onClick={handleShare}><Share2 size={24} /></button>
              </div>
            </div>

            {/* Features */}
            <div className="room-features">
              <div className="feature-card"><Bed size={24}/> {roomData.beds} Beds</div>
              <div className="feature-card"><Bath size={24}/> {roomData.bathrooms} Bathrooms</div>
              <div className="feature-card"><Car size={24}/> {roomData.parking} Parking</div>
              <div className="feature-card"><PawPrint size={24}/> Pets Allowed</div>
            </div>

            {/* Description */}
            <div className="room-description">
              <h2>Room Description</h2>
              <p>{roomData.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h2>Offered Amenities</h2>
              <div className="amenities-grid">
                {displayedAmenities.map((a,i)=>(
                  a.available && <div key={i} className="amenity-item"><a.icon size={20}/><span>{a.name}</span></div>
                ))}
              </div>
              <button className="show-all-btn" onClick={toggleAmenities}>
                {showAllAmenities ? 'Show Less' : `Show All ${amenitiesList.length} Amenities`}
                {showAllAmenities ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>
            </div>

            {/* Safety */}
            <div className="safety-section">
              <h2>Safety & Hygiene</h2>
              <div className="safety-grid">
                {safetyList.map((s,i)=>(
                  s.available && <div key={i} className="safety-item"><s.icon size={20}/><span>{s.name}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="room-sidebar">
            <div className="price-section">
              <div className="price-main">{roomData.price_range_display}</div>
              <div className="price-periods">
                <div className="price-period"><span>Price/Night:</span> <span>{roomData.price_per_night}</span></div>
              </div>
            </div>

            <button className="reserve-btn" onClick={handleReserve}>Reserve Now</button>

            <div className="contact-actions">
              <button className="contact-btn"><MessageCircle size={18}/> Room Inquiry</button>
              <button className="contact-btn"><Phone size={18}/> Contact</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoomDetails;
