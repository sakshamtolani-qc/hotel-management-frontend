import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  onApply: () => void;
  onReset: () => void;
  hasUnappliedChanges: boolean;
}

export const FilterActions = ({ onApply, onReset, hasUnappliedChanges }: FilterActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <h4 className="font-medium text-sm">Filters</h4>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onReset}
        className="h-8 px-2 text-xs"
      >
        Reset
      </Button>
    </div>
  );
};

export const ApplyButton = ({ onApply, disabled }: { onApply: () => void; disabled: boolean }) => {
  return (
    <Button 
      onClick={onApply}
      className="flex-1"
      disabled={disabled}
    >
      Apply Filters
    </Button>
  );
};