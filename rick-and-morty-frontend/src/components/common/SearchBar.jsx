import { Search } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder, RightButton, onRightButtonClick }) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || 'Search...'} className="input-field pl-11 pr-10"/>
      {
        RightButton && (
          <button type="button" onClick={onRightButtonClick} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary" aria-label="Open filters" >
            {RightButton}
          </button>
        )
      }
    </div>
  );
};