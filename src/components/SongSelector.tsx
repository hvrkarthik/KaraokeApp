import * as React from "react";
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from "react-native";
import { Song } from "../types/audio";
import { FavoriteButton } from "./FavoriteButton";

interface SongSelectorProps {
  songs: Song[];
  selectedSong: Song | null;
  onSelectSong: (song: Song) => void;
}

export function SongSelector({ songs, selectedSong, onSelectSong }: SongSelectorProps) {
  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={[styles.songItem, item.id === selectedSong?.id && styles.selectedSong]}
      onPress={() => onSelectSong(item)}
    >
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <FavoriteButton song={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Song</Text>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  list: {
    flex: 1,
  },
  songItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedSong: {
    backgroundColor: "#E0F7FA",
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 14,
    color: "#555",
  },
});
