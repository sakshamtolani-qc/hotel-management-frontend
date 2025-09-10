import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  Bed,
  Users,
  Bath,
  Star,
  Filter,
  Trash2,
  User as UserIcon,
} from "lucide-react";

import Loader, { PageLoader, InlineLoader } from "@/components/Loader/Loader";
import { mockRooms, Room as RoomType } from "@/data/mockRooms";
import "./RoomsPage.css";

const RoomsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Rooms");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>(mockRooms);

  // loader states
  const [loadingPage, setLoadingPage] = useState<boolean>(true); // initial + category loads
  const [loadingInline, setLoadingInline] = useState<boolean>(false); // small inline loader for filter apply

  // image loading state per room id
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({});

  // timer refs to clear on unmount
  const pageTimerRef = useRef<number | null>(null);
  const inlineTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // initial load simulation
    pageTimerRef.current = window.setTimeout(() => {
      setLoadingPage(false);
      pageTimerRef.current = null;
    }, 900);

    // initialize imageLoading for all rooms (true = still loading)
    const init: Record<number, boolean> = {};
    mockRooms.forEach((r) => {
      init[r.id] = true;
    });
    setImageLoading(init);

    return () => {
      if (pageTimerRef.current) {
        clearTimeout(pageTimerRef.current);
      }
      if (inlineTimerRef.current) {
        clearTimeout(inlineTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = ["Rooms", "Standard", "Deluxe", "Luxury"];
  const filterOptions = ["Vacant Rooms", "Occupied Rooms", "Dirty Rooms"];

  const toggleFavorite = (roomId: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, isFavorite: !room.isFavorite } : room
      )
    );
  };

  const handleCategoryClick = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);

    // show full page loader while switching categories (small simulated delay)
    setLoadingPage(true);
    if (pageTimerRef.current) clearTimeout(pageTimerRef.current);
    pageTimerRef.current = window.setTimeout(() => {
      setLoadingPage(false);
      pageTimerRef.current = null;
    }, 600);
  };

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );

    // show inline loader while applying filters (short)
    setLoadingInline(true);
    if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    inlineTimerRef.current = window.setTimeout(() => {
      setLoadingInline(false);
      inlineTimerRef.current = null;
    }, 500);
  };

  const getFilteredRooms = (): RoomType[] => {
    let filtered = rooms;

    if (activeCategory !== "Rooms") {
      filtered = filtered.filter((room) => room.category === activeCategory);
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((room) => {
        if (selectedFilters.includes("Vacant Rooms") && room.status === "Vacant") return true;
        if (selectedFilters.includes("Occupied Rooms") && room.status === "Occupied") return true;
        if (selectedFilters.includes("Dirty Rooms") && room.status === "Dirty") return true;
        return false;
      });
    }

    return filtered;
  };

  // If page-level loading -> show full page loader
  if (loadingPage) {
    return <PageLoader text="Fetching rooms..." variant="hotel" />;
  }

  return (
    <div className="rooms-list-container">
      <main className="main-content">
        {/* Category Tabs */}
        <div className="category-tabs">
          <div className="tabs-container" role="tablist" aria-label="Room categories">
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={`tab-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="filters-container">
            <button
              className="filters-button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              aria-controls="filters-dropdown"
            >
              <Filter size={16} />
              Filters
            </button>

            {/* show a small inline loader near filters button when applying filters */}
            {loadingInline && (
              <div style={{ display: "inline-block", marginLeft: 10 }}>
                <InlineLoader size="small" text="Applying..." variant="dots" />
              </div>
            )}

            {showFilters && (
              <div className="filters-dropdown" id="filters-dropdown" role="region" aria-label="Filters">
                {filterOptions.map((option) => (
                  <label key={option} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => handleFilterToggle(option)}
                    />
                    <span className="filter-label">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="rooms-grid" aria-live="polite">
          {getFilteredRooms().map((room) => (
            <div key={room.id} className="room-card" role="article" aria-roledescription="room card">
              <div className="room-image">
                {/* image loader overlay while imageLoading[room.id] is true */}
                {imageLoading[room.id] && (
                  <div className="image-loader-overlay" aria-hidden="true">
                    {/* default Loader used inside card */}
                    <Loader size="small" text="" variant="default" />
                  </div>
                )}

                <img
                  src={room.image}
                  alt={room.title}
                  className={room.status === "Dirty" || room.status === "Occupied" ? "blurred-img" : ""}
                  onLoad={() => setImageLoading((prev) => ({ ...prev, [room.id]: false }))}
                  onError={() => setImageLoading((prev) => ({ ...prev, [room.id]: false }))}
                />

                {/* Favorite button only for VACANT */}
                {room.status === "Vacant" && (
                  <button
                    className={`favorite-btn ${room.isFavorite ? "active" : ""}`}
                    onClick={() => toggleFavorite(room.id)}
                    aria-pressed={room.isFavorite}
                    aria-label={room.isFavorite ? "Unfavorite room" : "Favorite room"}
                    title={room.isFavorite ? "Unfavorite" : "Favorite"}
                  >
                    <Heart size={18} fill={room.isFavorite ? "#ef4444" : "none"} />
                  </button>
                )}

                {/* Centered status badge with icons (shown only for Dirty/Occupied) */}
                {room.status && room.status !== "Vacant" && (
                  <div className={`status-badge ${room.status.toLowerCase()}`} aria-hidden={false}>
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

                <div className="price-badge">{room.priceRange}</div>
              </div>

              <div className="room-info">
                <h3 className="room-title">{room.title}</h3>
                <p className="room-description">{room.description}</p>

                <div className="room-amenities" aria-hidden={false}>
                  <div className="amenity" title={`${room.amenities.beds} beds`}>
                    <Bed size={16} />
                    <span>{room.amenities.beds}</span>
                  </div>
                  <div className="amenity" title={`${room.amenities.guests} guests`}>
                    <Users size={16} />
                    <span>{room.amenities.guests}</span>
                  </div>
                  <div className="amenity" title={`${room.amenities.bathrooms} bathrooms`}>
                    <Bath size={16} />
                    <span>{room.amenities.bathrooms}</span>
                  </div>
                  <div className="amenity" title={`rating ${room.amenities.rating}`}>
                    <Star size={16} />
                    <span>{room.amenities.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* If no rooms after filtering, show a friendly message */}
          {getFilteredRooms().length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#484848" }}>
              No rooms match the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoomsPage;
