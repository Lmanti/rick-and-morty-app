import { createContext, useContext } from 'react';
import { useFilters } from '../hooks/useFilters';

const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const filtersState = useFilters();
  return (
    <FiltersContext.Provider value={filtersState}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error('useFiltersContext must be used inside FiltersProvider');
  return ctx;
};