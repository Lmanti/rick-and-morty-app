import { X, Sliders } from 'lucide-react';
import { SearchBar } from '../common/SearchBar';
import { FilterDropdown } from '../common/FilterDropdown';
import { useState, useRef, useCallback } from 'react';
import { updateActiveFilter, clearActiveFilters } from '../../redux/slices/filterSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectActiveFilters } from '../../redux/slices/filterSlice';

export const CharacterFilters = () => {
  const dispatch = useAppDispatch();
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);
  
  const filters = useAppSelector(selectActiveFilters);

  const onFilterChange = useCallback((key, value) => {
    dispatch(updateActiveFilter({ key, value }));
  }, [dispatch]);

  const onClearFilters = useCallback(() => {
    dispatch(clearActiveFilters());
  }, [dispatch]);

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {
          hasActiveFilters && (
            <button onClick={onClearFilters} className="flex items-center gap-1 text-sm text-primary hover:text-primary-light" >
              <X className="w-4 h-4" /> Clear all
            </button>
          )
        }
      </div>
      <div className="relative" ref={searchBarRef}>
        <SearchBar value={filters.name} onChange={(value) => onFilterChange('name', value)} placeholder="Search or filter results" RightButton={<Sliders className="w-4 h-4" />} onRightButtonClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} />
        <FilterDropdown isOpen={isFilterDropdownOpen} onClose={() => setIsFilterDropdownOpen(false)} anchorRef={searchBarRef} />
      </div>
    </div>
  );
};