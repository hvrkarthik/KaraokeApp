import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../types/audio';
import { loadFavorites, saveFavorites } from '../utils/storage';

interface FavoritesState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  songs: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Song>) => {
      if (!state.songs.some(song => song.id === action.payload.id)) {
        state.songs.push(action.payload);
        saveFavorites(state.songs);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      saveFavorites(state.songs);
    },
    setFavorites: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addFavorite, 
  removeFavorite, 
  setFavorites,
  setLoading,
  setError 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;