import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Bed, Users, Bath, Star, Filter, Trash2, User as UserIcon } from "lucide-react";
import Loader, { PageLoader, InlineLoader } from "@/components/Loader/Loader";
import { useRooms } from "@/hooks/useRooms"; // Custom hook wrapping RoomsService.getRooms
import { Room } from "@/types/Room";
import "./RoomsPage.css";

const RoomsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Rooms");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const locationHook = useLocation();
  const searchParams = new URLSearchParams(locationHook.search);

  // Convert filters to status values
  const statusFilters = selectedFilters.map(filter => {
    if (filter === "Vacant Rooms") return "Vacant";
    if (filter === "Occupied Rooms") return "Occupied";
    if (filter === "Dirty Rooms") return "Dirty";
    return filter;
  });

  const { rooms, loading: roomsLoading, error: roomsError, refetch: refetchRooms, toggleRoomFavorite } = useRooms({
    category: activeCategory,
    status: statusFilters.length ? statusFilters : undefined,
  });

  const searchFilters = {
    location: searchParams.get("location") || "",
    guests: searchParams.get("guests") ? parseInt(searchParams.get("guests")!, 10) : 0,
  };

  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingInline, setLoadingInline] = useState(false);
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});

  const pageTimerRef = useRef<number | null>(null);
  const inlineTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize image loading state
    const init: Record<number, boolean> = {};
    rooms.forEach((r) => (init[r.room_id] = true));
    setImageLoading(init);
  }, [rooms]);

  useEffect(() => {
    return () => {
      if (pageTimerRef.current) clearTimeout(pageTimerRef.current);
      if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    };
  }, []);

  const categories = ["Rooms", "Standard", "Deluxe", "Luxury"];
  const filterOptions = ["Vacant Rooms", "Occupied Rooms", "Dirty Rooms"];

  const toggleFavorite = async (roomId: number) => {
    await toggleRoomFavorite(roomId);
  };

  // const handleRoomClick = (roomId: number) => navigate(`/rooms/${roomId}`);

  const handleRoomClick = (room: Room) => {
  navigate(`/rooms/${room.room_id}`, { state: { room } });
  };

  const handleCategoryClick = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setLoadingPage(true);
    if (pageTimerRef.current) clearTimeout(pageTimerRef.current);
    pageTimerRef.current = window.setTimeout(() => setLoadingPage(false), 300);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => (prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]));
    setLoadingInline(true);
    if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    inlineTimerRef.current = window.setTimeout(() => setLoadingInline(false), 500);
  };

  const getFilteredRooms = (): Room[] => {
    let filtered = rooms;

    // Guests filter
    if (searchFilters.guests > 0) filtered = filtered.filter(r => r.guests >= searchFilters.guests);

    // Location filter
    if (searchFilters.location) {
      filtered = filtered.filter(
        r =>
          r.title.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
          r.description.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    return filtered;
  };

  if (loadingPage || roomsLoading) return <PageLoader text="Fetching rooms..." variant="hotel" />;

  if (roomsError) {
    return (
      <div className="rooms-list-container">
        <main className="main-content">
          <div style={{ textAlign: "center", padding: 40, color: "#ef4444" }}>
            <h2>Error Loading Rooms</h2>
            <p>{roomsError}</p>
            <button
              onClick={() => refetchRooms()}
              style={{
                marginTop: 16,
                padding: "8px 16px",
                backgroundColor: "#212121",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="rooms-list-container">
      <main className="main-content">
        {/* Category Tabs */}
        <div className="category-tabs">
          <div className="tabs-container" role="tablist" aria-label="Room categories">
            {categories.map(c => (
              <button
                key={c}
                role="tab"
                aria-selected={activeCategory === c}
                className={`tab-button ${activeCategory === c ? "active" : ""}`}
                onClick={() => handleCategoryClick(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="filters-container">
            <button className="filters-button" onClick={() => setShowFilters(s => !s)} aria-expanded={showFilters}>
              <Filter size={16} />
              Filters
            </button>
            <div className="inline-loader-container">{loadingInline && <InlineLoader size="small" text="Applying..." />}</div>
            {showFilters && (
              <div className="filters-dropdown" id="filters-dropdown" role="region" aria-label="Filters">
                {filterOptions.map(opt => (
                  <label key={opt} className="filter-option">
                    <input type="checkbox" checked={selectedFilters.includes(opt)} onChange={() => handleFilterToggle(opt)} />
                    <span className="filter-label">{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid" aria-live="polite">
          {getFilteredRooms().map(room => (
            <div
              key={room.room_id}
              className="room-card"
              role="article"
              aria-roledescription="room card"
              onClick={() => handleRoomClick(room)}
              style={{ cursor: "pointer" }}
            >
              <div className="room-image">
                {imageLoading[room.room_id] && (
                  <div className="image-loader-overlay" aria-hidden="true">
                    <Loader size="small" text="" variant="default" />
                  </div>
                )}
                <img
                  src={room.image || "/bedroom.jpg"}
                  alt={room.title}
                  className={room.status === "Dirty" || room.status === "Occupied" ? "blurred-img" : ""}
                  onLoad={() => setImageLoading(prev => ({ ...prev, [room.room_id]: false }))}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== window.location.origin + "/bedroom.jpg") target.src = "/bedroom.jpg";
                    else setImageLoading(prev => ({ ...prev, [room.room_id]: false }));
                  }}
                />

                {room.status === "Vacant" && (
                  <button
                    className={`favorite-btn ${room.isFavorite ? "active" : ""}`}
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(room.room_id);
                    }}
                    aria-pressed={room.isFavorite}
                  >
                    <Heart size={18} fill={room.isFavorite ? "#ef4444" : "none"} />
                  </button>
                )}

                {room.status && room.status !== "Vacant" && (
                  <div className={`status-badge ${room.status.toLowerCase()}`}>
                    {room.status === "Dirty" ? (
                      <>
                        <Trash2 size={18} className="status-icon" />
                        <span className="status-text">Dirty</span>
                      </>
                    ) : (
                      <>
                        <UserIcon size={18} className="status-icon" />
                        <span className="status-text">Occupied</span>
                      </>
                    )}
                  </div>
                )}
                <div className="price-badge">{room.price_range_display || "Price Available"}</div>
              </div>

              <div className="room-info">
                <h3 className="room-title">{room.title}</h3>
                <p className="room-description">{room.description}</p>

                <div className="room-amenities">
                  <div className="amenity" title={`${room.beds} beds`}>
                    <Bed size={16} />
                    <span>{room.beds}</span>
                  </div>
                  <div className="amenity" title={`${room.guests} guests`}>
                    <Users size={16} />
                    <span>{room.guests}</span>
                  </div>
                  <div className="amenity" title={`${room.bathrooms} bathrooms`}>
                    <Bath size={16} />
                    <span>{room.bathrooms}</span>
                  </div>
                  <div className="amenity" title={`rating ${room.rating}`}>
                    <Star size={16} />
                    <span>{room.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {getFilteredRooms().length === 0 && (
            <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No rooms match your filters.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoomsPage;
