import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoomCard from "@/components/Rooms/RoomCard"; // RoomCard component
import axios from "axios";
import { Filter } from "lucide-react";
import Loader, { PageLoader, InlineLoader } from "@/components/Loader/Loader";
import { Room } from "@/types/Room";
import "./RoomsPage.css";

const API_BASE = "http://127.0.0.1:8000/api";
const BASE_URL = "http://127.0.0.1:8000";

const RoomsPage: React.FC = () => {
  // -------------------- State --------------------
  const [rooms, setRooms] = useState<Room[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Rooms");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [loadingInline, setLoadingInline] = useState<boolean>(false);

  const navigate = useNavigate();
  const locationHook = useLocation();
  const searchParams = new URLSearchParams(locationHook.search);

  const searchFilters = {
    location: searchParams.get("location") || "",
    guests: searchParams.get("guests") ? parseInt(searchParams.get("guests")!, 10) : 0,
  };

  const pageTimerRef = useRef<number | null>(null);
  const inlineTimerRef = useRef<number | null>(null);

  const categories = ["Rooms", "Standard", "Deluxe", "Luxury"];
  const filterOptions = ["Vacant Rooms", "Occupied Rooms", "Dirty Rooms"];

  // -------------------- Helper functions --------------------
  // Parse additional_images safely
  const parseAdditionalImages = (value: any): string[] => {
    if (!value) return [];
    if (typeof value === "string") {
      try { return JSON.parse(value); } catch { return []; }
    }
    if (Array.isArray(value)) return value;
    return [];
  };

  // Format image URLs for display
  const formatImageUrl = (url?: string) => {
    if (!url) return "/placeholder.jpg";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/media")) return `${BASE_URL}${url}`;
    return `${BASE_URL}/media/${url}`;
  };

  // -------------------- Fetch rooms from backend --------------------
  useEffect(() => {
    setLoadingPage(true);

    axios
      .get(`${API_BASE}/rooms/list/`)
      .then((res) => {
        const fetchedRooms: Room[] = res.data.results.map((room: any) => ({
          ...room,
          room_id: room.id,
          image: formatImageUrl(room.image),
          additional_images: parseAdditionalImages(room.additional_images).map(formatImageUrl),
          isFavorite: favorites.includes(room.id),
        }));

        setRooms(fetchedRooms);

        // Delay to show loader smoothly
        pageTimerRef.current = window.setTimeout(() => setLoadingPage(false), 600);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoadingPage(false);
      });

    // Cleanup timers on unmount
    return () => {
      if (pageTimerRef.current) clearTimeout(pageTimerRef.current);
      if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    };
  }, [favorites]);

  // -------------------- Handlers --------------------
  // Toggle favorite rooms
  const toggleFavorite = (roomId: number) => {
    setFavorites((prev) =>
      prev.includes(roomId) ? prev.filter((f) => f !== roomId) : [...prev, roomId]
    );

    setRooms((prev) =>
      prev.map((room) =>
        room.room_id === roomId ? { ...room, isFavorite: !room.isFavorite } : room
      )
    );
  };

  // Navigate to room details (only if Vacant)
  const handleRoomClick = (room: Room) => {
    if (room.status === "Vacant") {
      navigate(`/rooms/${room.room_id}`, { state: { room } });
    }
  };

  // Category tab click
  const handleCategoryClick = (category: string) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setLoadingPage(true);
    if (pageTimerRef.current) clearTimeout(pageTimerRef.current);
    pageTimerRef.current = window.setTimeout(() => setLoadingPage(false), 600);
  };

  // Filter toggle
  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
    setLoadingInline(true);
    if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    inlineTimerRef.current = window.setTimeout(() => setLoadingInline(false), 500);
  };

  // Apply filters and category selection
  const getFilteredRooms = (): Room[] => {
    let filtered = rooms;

    if (activeCategory !== "Rooms") filtered = filtered.filter((r) => r.category === activeCategory);

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((r) => {
        if (selectedFilters.includes("Vacant Rooms") && r.status === "Vacant") return true;
        if (selectedFilters.includes("Occupied Rooms") && r.status === "Occupied") return true;
        if (selectedFilters.includes("Dirty Rooms") && r.status === "Dirty") return true;
        return false;
      });
    }

    if (searchFilters.guests > 0) filtered = filtered.filter((r) => r.amenities.guests >= searchFilters.guests);

    if (searchFilters.location) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
          r.description.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    return filtered;
  };

  // -------------------- Loader --------------------
  if (loadingPage) return <PageLoader text="Fetching rooms..." variant="hotel" />;

  // -------------------- Render --------------------
  return (
    <div className="rooms-list-container">
      <main className="main-content">
        {/* Categories */}
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
              <Filter size={16} /> Filters
            </button>

            <div className="inline-loader-container">
              {loadingInline && <InlineLoader size="small" text="Applying..." variant="dots" />}
            </div>

            {showFilters && (
              <div className="filters-dropdown" id="filters-dropdown" role="region">
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

        {/* Rooms Grid using RoomCard */}
        <div className="rooms-grid" aria-live="polite">
          {getFilteredRooms().map((room) => (
            <RoomCard
              key={room.room_id}
              room={room}
              onClick={() => handleRoomClick(room)}
              onToggleFavorite={() => toggleFavorite(room.room_id)}
            />
          ))}

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
