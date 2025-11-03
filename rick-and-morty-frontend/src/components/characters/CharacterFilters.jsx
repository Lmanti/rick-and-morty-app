import { X, Sliders } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { FilterDropdown } from '../common/FilterDropdown';
import { useState, useRef } from 'react';
import { useFiltersContext } from '../../context/FiltersContext';

export const CharacterFilters = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);
  
  const {
    activeFilters,
    updateFilter,
    clearFilters,
    filterSections
  } = useFiltersContext();

  const hasActiveFilters = Object.entries(activeFilters)
    .some(([key, value]) => value !== '' && !(key === 'sort' && value === 'ASC'));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {
          hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-primary hover:text-primary-light" >
              <X className="w-4 h-4" /> Clear all
            </button>
          )
        }
      </div>
      <div className="relative" ref={searchBarRef}>
        <SearchBar
          value={activeFilters.name || ''}
          onChange={(value) => updateFilter('name', value)}
          placeholder="Search or filter results"
          RightButton={<Sliders className="w-4 h-4" />}
          onRightButtonClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
        />
        <FilterDropdown
          isOpen={isFilterDropdownOpen}
          onClose={() => setIsFilterDropdownOpen(false)}
          anchorRef={searchBarRef}
          sections={filterSections}
          activeFilters={activeFilters}
          onApplyFilters={updateFilter}
        />
      </div>
    </div>
  );
};