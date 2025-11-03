import { configureStore } from '@reduxjs/toolkit';
import starredReducer from './slices/starredSlice';

export const store = configureStore({
  reducer: {
    starred: starredReducer
  }
});