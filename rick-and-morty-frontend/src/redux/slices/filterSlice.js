import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterOptions: {
    species: [],
    status: [],
    gender: [],
    origin: []
  },
  activeFilters: {
    name: '',
    status: '',
    species: '',
    gender: '',
    origin: ''
  },
  filterSections: []
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    setFilterSections: (state, action) => {
      state.filterSections = action.payload;
    },
    updateActiveFilter: (state, action) => {
      const { key, value } = action.payload;
      state.activeFilters[key] = value;
    },
    clearActiveFilters: (state) => {
      state.activeFilters = {
        name: '',
        status: '',
        species: '',
        gender: '',
        origin: ''
      };
    }
  }
});

export const { 
  setFilterOptions, 
  setFilterSections, 
  updateActiveFilter, 
  clearActiveFilters 
} = filterSlice.actions;

export default filterSlice.reducer;

export const selectActiveFilters = (state) => state.filters.activeFilters;
export const selectFilterSections = (state) => state.filters.filterSections;