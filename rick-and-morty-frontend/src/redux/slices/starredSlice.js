import { createSlice } from '@reduxjs/toolkit';

const loadStarredFromStorage = () => {
  try {
    const stored = localStorage.getItem('starredCharacters');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading starred characters:', error);
    return [];
  }
};

const initialState = {
  characters: loadStarredFromStorage(),
};

const starredSlice = createSlice({
  name: 'starred',
  initialState,
  reducers: {
    toggleStarred: (state, action) => {
      const character = action.payload;
      const exists = state.characters.find(c => c.id === character.id);
      
      if (exists) {
        state.characters = state.characters.filter(c => c.id !== character.id);
      } else {
        state.characters.push(character);
      }
      
      try {
        localStorage.setItem('starredCharacters', JSON.stringify(state.characters));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    },
    clearStarred: (state) => {
      state.characters = [];
      try {
        localStorage.removeItem('starredCharacters');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    },
  },
});

export const { toggleStarred, clearStarred } = starredSlice.actions;
export default starredSlice.reducer;

export const selectStarredCharacters = (state) => state.starred.characters;
export const selectIsStarred = (id) => (state) => state.starred.characters.some(c => c.id === id);