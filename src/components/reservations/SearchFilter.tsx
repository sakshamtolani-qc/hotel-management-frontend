import { ChangeEvent } from "react";
import { ReservationFilters, ReservationStatus } from "@/types/reservation";

export interface SearchFilterProps {
  filters: ReservationFilters;
  onChange: (filters: ReservationFilters) => void;
}

const statusOptions: (ReservationStatus | "all")[] = ["all", "pending", "confirmed", "upcoming", "past", "cancelled"];

const SearchFilter = ({ filters, onChange }: SearchFilterProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value });
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, status: e.target.value as ReservationFilters["status"] });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by guest or room"
        value={filters.search}
        onChange={handleSearchChange}
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={filters.status}
        onChange={handleStatusChange}
        className="border rounded px-3 py-2 w-48"
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
