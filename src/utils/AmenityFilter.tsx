import { Checkbox } from '@/utils/checkbox';
import { Label } from '@/utils/label';
import { Wifi, Bed, User } from 'lucide-react';

interface AmenityFilterProps {
  value: {
    wifi: boolean;
    bed: boolean;
    person: boolean;
  };
  onChange: (amenity: 'wifi' | 'bed' | 'person', checked: boolean) => void;
}

export const AmenityFilter = ({ value, onChange }: AmenityFilterProps) => {
  const amenities = [
    { key: 'wifi' as const, label: 'WiFi', icon: Wifi },
    { key: 'bed' as const, label: 'Bed', icon: Bed },
    { key: 'person' as const, label: 'Occupied', icon: User }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Amenities</Label>
      <div className="space-y-2">
        {amenities.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={value[key]}
              onCheckedChange={(checked) => onChange(key, checked as boolean)}
            />
            <Label htmlFor={key} className="text-sm flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};