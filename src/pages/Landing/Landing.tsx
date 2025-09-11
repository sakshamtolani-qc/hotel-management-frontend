import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Bed, Bath, Heart } from 'lucide-react';
import './Landing.css';
import { PageLoader, SearchLoader } from '../../components/Loader/Loader';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchLoading(true);
    setTimeout(() => {
      console.log('Search data:', searchData);
      setSearchLoading(false);
      // Handle search functionality here
    }, 800);
  };

  const handleRoomClick = () => {
    navigate('/api/rooms');
  };

  const featuredRooms = [
    {
      id: 1,
      title: 'Single room set',
      location: 'Satara',
      price: '₹ 1000 - 5000 INR',
      beds: 1,
      baths: 1,
      capacity: 1,
      rating: 0,
      image: '/Property_1.png'
    },
    {
      id: 2,
      title: 'Double Sharing Room',
      location: 'Satara',
      price: '₹ 1000 - 5000 INR',
      beds: 2,
      baths: 1,
      capacity: 1,
      rating: 0,
      image: '/Property_2.png'
    },
    {
      id: 3,
      title: 'Triple Sharing Room',
      location: 'Satara',
      price: '₹ 1000 - 5000 INR',
      beds: 3,
      baths: 1,
      capacity: 2,
      rating: 0,
      image: '/Property_3.png'
    }
  ];

  if (loading) {
    return <PageLoader text="Loading Landing Page..." />;
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img src="/bedroom-interior2.png" alt="Hero Background" className="hero-bg-image" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Hotels,<br />
            Elevating Guest Experiences.
          </h1>
{/* Search Bar */}
<form className="search-form" onSubmit={handleSearch}>
  {/* Location */}
  <div className="search-field-loc">
    <label htmlFor="location">Location</label>
    <input
      id="location"
      type="text"
      placeholder="Which city do you prefer?"
      value={searchData.location}
      onChange={(e) =>
        setSearchData({ ...searchData, location: e.target.value })
      }
    />
  </div>

  <span className="divider-line"></span>

  {/* Check In */}
  <div className="search-field">
    <label htmlFor="checkIn">Check In</label>
    <input
      id="checkIn"
      type="date"
      value={searchData.checkIn}
      onChange={(e) =>
        setSearchData({ ...searchData, checkIn: e.target.value })
      }
    />
  </div>

  <span className="divider-line"></span>

  {/* Check Out */}
  <div className="search-field">
    <label htmlFor="checkOut">Check Out</label>
    <input
      id="checkOut"
      type="date"
      value={searchData.checkOut}
      onChange={(e) =>
        setSearchData({ ...searchData, checkOut: e.target.value })
      }
    />
  </div>

  <span className="divider-line"></span>

  {/* Guests */}
  <div className="search-field">
    <label htmlFor="guests">Guests</label>
    <input
      id="guests"
      type="number"
      placeholder="Add Guests"
      value={searchData.guests}
      onChange={(e) =>
        setSearchData({ ...searchData, guests: e.target.value })
      }
    />
  </div>

  {/* Search Button */}
  <button type="submit" className="search-button">
    <img src="/fe_search.svg" alt="Search" />
  </button>

  {searchLoading && <SearchLoader />}
</form>

        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms">
        <div className="container">
          <h1 className="section-title-landing">
            Featured Rooms on<br />
            our Listing
          </h1>
          <div className="divider"></div>
          <div className="rooms-grid">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="room-card"
                onClick={handleRoomClick}
              >
                <div className="room-image">
                  <img src={room.image} alt={room.title} />
                  <button className="favorite-btn">
                    <Heart className="heart-icon" />
                  </button>
                  <div className="room-price">{room.price}</div>
                </div>
                <div className="room-info">
                  <h3 className="room-title">{room.title}</h3>
                  <p className="room-location">{room.location}</p>
                  <div className="room-details">
                    <div className="room-detail">
                      <Bed className="detail-icon" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="room-detail">
                      <Users className="detail-icon" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="room-detail">
                      <Bath className="detail-icon" />
                      <span>{room.baths}</span>
                    </div>
                    <div className="room-detail">
                      <span>⭐ {room.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse More Rooms */}
      <section className="browse-section">
        <div className="container">
          <div className="browse-content">
            <div className="browse-text">
              <h2 className="browse-title">Browse For More Rooms</h2>
              <p className="browse-subtitle">Explore rooms by their categories/types...</p>
              <button
                className="find-room-btn"
                onClick={() => handleNavigation('/rooms')}
              >
                Find A Room
              </button>
            </div>
            <div className="browse-image">
              <img src="/browse_sec_img.png" alt="Browse Rooms" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
