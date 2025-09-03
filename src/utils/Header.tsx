import { SearchAndFilter } from '@/utils/SearchAndFilter';
import logo from '@/assets/logo.png';

export const Header = () => {
  return (
    <header className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>
        
        <h2 className="text-xl font-semibold text-foreground absolute left-1/2 transform -translate-x-1/2">
          Room Status Dashboard
        </h2>
        
        <SearchAndFilter />
      </div>
    </header>
  );
};
