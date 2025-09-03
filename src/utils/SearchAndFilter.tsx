import { Filter } from 'lucide-react';
import { Button } from '@/utils/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/utils/popover';
import { Separator } from '@/utils/separator';
import { useRoomStore } from '@/store/roomStore';
import { useState, useEffect } from 'react';
import { SearchInput } from './SearchInput';
import { PriceRangeFilter } from './PriceRangeFilter';
import { AmenityFilter } from './AmenityFilter';
import { FilterActions, ApplyButton } from './FilterActions';

export const SearchAndFilter = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    priceFilter, 
    setPriceFilter, 
    amenityFilter, 
    setAmenityFilter, 
    getPriceRange 
  } = useRoomStore();
  
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [localPriceFilter, setLocalPriceFilter] = useState(priceFilter);
  const [localAmenityFilter, setLocalAmenityFilter] = useState(amenityFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const priceRange = getPriceRange();

  useEffect(() => {
    setLocalPriceFilter(priceFilter);
    setLocalAmenityFilter(amenityFilter);
  }, [priceFilter, amenityFilter]);

  const handleSearchChange = (value: string) => {
    setLocalQuery(value);
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceFilter({ min: values[0], max: values[1] });
  };

  const handleAmenityChange = (amenity: 'wifi' | 'bed' | 'person', checked: boolean) => {
    setLocalAmenityFilter(prev => ({ ...prev, [amenity]: checked }));
  };

  const handleApplyFilters = () => {
    setPriceFilter(localPriceFilter);
    setAmenityFilter(localAmenityFilter);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    const defaultPriceFilter = { min: priceRange.min, max: priceRange.max };
    const defaultAmenityFilter = { wifi: false, bed: false, person: false };
    
    setLocalPriceFilter(defaultPriceFilter);
    setLocalAmenityFilter(defaultAmenityFilter);
    setPriceFilter(defaultPriceFilter);
    setAmenityFilter(defaultAmenityFilter);
    setLocalQuery('');
    setSearchQuery('');
    setIsFilterOpen(false);
  };

  const hasActiveFilters = 
    priceFilter.min > priceRange.min || 
    priceFilter.max < priceRange.max || 
    amenityFilter.wifi || 
    amenityFilter.bed || 
    amenityFilter.person;

  const hasUnappliedChanges = 
    localPriceFilter.min !== priceFilter.min ||
    localPriceFilter.max !== priceFilter.max ||
    localAmenityFilter.wifi !== amenityFilter.wifi ||
    localAmenityFilter.bed !== amenityFilter.bed ||
    localAmenityFilter.person !== amenityFilter.person;

  return (
    <div className="flex items-center gap-2">
      <SearchInput 
        value={localQuery}
        onChange={handleSearchChange}
        onClear={clearSearch}
      />
      
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className={hasActiveFilters ? "bg-primary text-primary-foreground" : ""}>
            <Filter className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <FilterActions
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              hasUnappliedChanges={hasUnappliedChanges}
            />
            
            <Separator />
            
            <PriceRangeFilter
              value={localPriceFilter}
              onChange={handlePriceChange}
              priceRange={priceRange}
            />
            
            <Separator />
            
            <AmenityFilter
              value={localAmenityFilter}
              onChange={handleAmenityChange}
            />
            
            <Separator />
            
            <div className="flex gap-2">
              <ApplyButton
                onApply={handleApplyFilters}
                disabled={!hasUnappliedChanges}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};