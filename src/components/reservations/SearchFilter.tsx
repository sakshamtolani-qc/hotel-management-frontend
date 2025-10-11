import { Input } from "@/utils/input";
import { Search } from "lucide-react";
import { ReservationFilters , ReservationStatus  } from "@/types/reservation";

interface SearchFilterProps {
  filters: ReservationFilters;
  onFiltersChange: (filters: ReservationFilters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ filters, onFiltersChange }) => {
  const handleSearchChange = (value: string) => onFiltersChange({ ...filters, search: value });
 const handleStatusChange = (value: ReservationStatus | "all") => {
  onFiltersChange({ ...filters, status: value });
};

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by guest name, room type..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => handleStatusChange(e.target.value as ReservationStatus | "all")}
        className="w-full md:w-48 border rounded px-3 py-2"
      >
        <option value="all">All Reservations</option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
        <option value="cancelled">Cancelled</option>
      </select>

    </div>
  );
};

export default SearchFilter;
