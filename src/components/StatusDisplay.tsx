import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Song } from "../types/audio";

interface StatusDisplayProps {
  isRecording: boolean;
  selectedSong: Song | null;
}

export function StatusDisplay({ isRecording, selectedSong }: StatusDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.status, isRecording && styles.recording]}>
        {isRecording ? 'Recording...' : 'Ready to record'}
      </Text>
      {selectedSong && (
        <Text style={styles.songInfo}>
          Selected: {selectedSong.title} - {selectedSong.artist}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  status: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  recording: {
    color: "#E91E63",
  },
  songInfo: {
    fontSize: 14,
    color: "#2196F3",
    marginTop: 8,
  },
});