import { Header } from '@/utils/Header';
import { FilterButtons } from '@/utils/FilterButtons';
import { RoomGrid } from '@/utils/RoomGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-6">
        <Header />
        <FilterButtons />
        <RoomGrid />
      </div>
    </div>
  );
};

export default Index;