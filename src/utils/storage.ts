import { ApplicationSettings } from '@nativescript/core';
import { Song } from '../types/audio';

const FAVORITES_KEY = 'favorites';

export const saveFavorites = (favorites: Song[]): void => {
  try {
    ApplicationSettings.setString(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = (): Song[] => {
  try {
    const data = ApplicationSettings.getString(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};