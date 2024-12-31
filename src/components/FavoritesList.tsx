import * as React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FavoriteButton } from './FavoriteButton';

export function FavoritesList() {
  const { songs, loading, error } = useSelector((state: RootState) => state.favorites);

  if (loading) {
    return <Text style={styles.message}>Loading favorites...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (songs.length === 0) {
    return <Text style={styles.message}>No favorite songs yet</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Songs</Text>
      <FlatList
        data={songs}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: song }) => (
          <View style={styles.songItem}>
            <View style={styles.songDetails}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
            <FavoriteButton song={song} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  list: {
    backgroundColor: "transparent",
  },
  songItem: {
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  songArtist: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    margin: 16,
  },
  error: {
    fontSize: 16,
    color: "#f44336",
    textAlign: "center",
    margin: 16,
  },
});