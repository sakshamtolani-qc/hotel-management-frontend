import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Bed, Bath, Heart } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Landing.css';
import { PageLoader, SearchLoader } from '../../components/Loader/Loader';
import { mockRooms } from '../../data/mockRooms';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: ''
  });

  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockRooms | null>(null);

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
      const queryParams = new URLSearchParams();
      if (searchData.location) queryParams.set('location', searchData.location);
      if (searchData.checkIn) queryParams.set('checkIn', searchData.checkIn.toISOString().split('T')[0]);
      if (searchData.checkOut) queryParams.set('checkOut', searchData.checkOut.toISOString().split('T')[0]);
      if (searchData.guests) queryParams.set('guests', searchData.guests);
      
      navigate(`/rooms?${queryParams.toString()}`);
      setSearchLoading(false);
    }, 800);
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  // Featured Rooms = first 3
  const featuredRooms = mockRooms.slice(0, 3).map(room => ({
    id: room.id,
    title: room.title,
    location: 'Ghaziabad, India',
    price: room.priceRange,
    beds: room.amenities.beds,
    baths: room.amenities.bathrooms,
    capacity: room.amenities.guests,
    rating: room.amenities.rating,
    image: room.image
  }));

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
            <div className="search-field-loc">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                placeholder="Which city or type?"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
              />
            </div>

            <span className="divider-line"></span>

            <div className="search-field">
              <label htmlFor="checkIn">Check In</label>
              <DatePicker
                id="checkIn"
                selected={searchData.checkIn}
                onChange={(date: Date | null) =>
                  setSearchData({ ...searchData, checkIn: date })
                }
                selectsStart
                startDate={searchData.checkIn}
                endDate={searchData.checkOut}
                minDate={new Date()}
                placeholderText="Select date"
                dateFormat="MMM dd, yyyy"
                className="custom-datepicker"
                calendarClassName="custom-calendar"
                popperClassName="custom-popper"
              />
            </div>

            <span className="divider-line"></span>

            <div className="search-field">
              <label htmlFor="checkOut">Check Out</label>
              <DatePicker
                id="checkOut"
                selected={searchData.checkOut}
                onChange={(date: Date | null) =>
                  setSearchData({ ...searchData, checkOut: date })
                }
                selectsEnd
                startDate={searchData.checkIn}
                endDate={searchData.checkOut}
                minDate={searchData.checkIn || new Date()}
                placeholderText="Select date"
                dateFormat="MMM dd, yyyy"
                className="custom-datepicker"
                calendarClassName="custom-calendar"
                popperClassName="custom-popper"
              />
            </div>

            <span className="divider-line"></span>

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

            <button type="submit" className="search-button">
              <img src="/fe_search.svg" alt="Search" />
            </button>

            {searchLoading && <SearchLoader />}
          </form>
        </div>
      </section>

      {/* Search Results */}
      {searchResults && (
        <section className="search-results">
          <div className="container">
            <h2 className="section-title-landing">Search Results</h2>
            <div className="divider"></div>
            {searchResults.length > 0 ? (
              <div className="rooms-grid">
                {searchResults.map((room) => (
                  <div
                    key={room.id}
                    className="room-card"
                    onClick={() => handleRoomClick(room.id)}
                  >
                    <div className="room-image">
                      <img src={room.image} alt={room.title} />
                      <div className="room-price">{room.priceRange}</div>
                    </div>
                    <div className="room-info">
                      <h3 className="room-title">{room.title}</h3>
                      <p className="room-location">{room.category} • Ghaziabad</p>
                      <div className="room-details">
                        <div className="room-detail"><Bed className="detail-icon" /> {room.amenities.beds}</div>
                        <div className="room-detail"><Users className="detail-icon" /> {room.amenities.guests}</div>
                        <div className="room-detail"><Bath className="detail-icon" /> {room.amenities.bathrooms}</div>
                        <div className="room-detail">⭐ {room.amenities.rating}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No rooms match your search.</p>
            )}
          </div>
        </section>
      )}

      {/* Featured Rooms */}
      {!searchResults && (
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
                  onClick={() => handleRoomClick(room.id)}
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
                      <div className="room-detail"><Bed className="detail-icon" /> {room.beds}</div>
                      <div className="room-detail"><Users className="detail-icon" /> {room.capacity}</div>
                      <div className="room-detail"><Bath className="detail-icon" /> {room.baths}</div>
                      <div className="room-detail">⭐ {room.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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