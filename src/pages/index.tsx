import { Header } from '@/components/Header';
import { FilterButtons } from '@/components/FilterButtons';
import { RoomGrid } from '@/components/RoomGrid';

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