
import { FilterButtons } from '@/utils/FilterButtons';
import { RoomGrid } from '@/utils/RoomGrid';

const RoomsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6">
        <FilterButtons />
        <RoomGrid />
      </div>
    </div>
  );
};

export default RoomsPage;