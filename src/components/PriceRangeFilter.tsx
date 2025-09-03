import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface PriceRangeFilterProps {
  value: { min: number; max: number };
  onChange: (values: number[]) => void;
  priceRange: { min: number; max: number };
}

export const PriceRangeFilter = ({ value, onChange, priceRange }: PriceRangeFilterProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">PRICE RANGE</Label>
      <div className="bg-muted/30 rounded-lg p-4 space-y-4">
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">MIN</div>
            <div className="text-2xl font-bold text-primary">
              ${value.min}
            </div>
          </div>
          <div className="text-muted-foreground text-lg">—</div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">MAX</div>
            <div className="text-2xl font-bold text-primary">
              ${value.max}
            </div>
          </div>
        </div>
        
        <div className="px-2 py-4">
          <Slider
            value={[value.min, value.max]}
            onValueChange={onChange}
            max={priceRange.max}
            min={priceRange.min}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};