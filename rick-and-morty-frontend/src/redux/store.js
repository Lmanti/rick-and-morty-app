import { configureStore } from '@reduxjs/toolkit';
import starredReducer from './slices/starredSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    starred: starredReducer,
    filters: filterReducer
  }
});