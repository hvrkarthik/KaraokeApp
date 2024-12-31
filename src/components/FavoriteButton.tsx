import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Song } from '../types/audio';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { RootState } from '../store/store';

interface FavoriteButtonProps {
  song: Song;
}

export function FavoriteButton({ song }: FavoriteButtonProps) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => 
    state.favorites.songs.some(s => s.id === song.id)
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(song.id));
    } else {
      dispatch(addFavorite(song));
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, isFavorite && styles.favorited]} 
      onPress={toggleFavorite}
    >
      <Text style={styles.text}>{isFavorite ? '♥' : '♡'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favorited: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    color: '#E91E63',
  }
});