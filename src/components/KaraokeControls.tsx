import * as React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface KaraokeControlsProps {
  isRecording: boolean;
  isPlaying: boolean;
  hasRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayRecording: () => void;
}

export function KaraokeControls({
  isRecording,
  isPlaying,
  hasRecording,
  onStartRecording,
  onStopRecording,
  onPlayRecording
}: KaraokeControlsProps) {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, isRecording && styles.activeButton]}
        onPress={isRecording ? onStopRecording : onStartRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      {hasRecording && (
        <TouchableOpacity
          style={[styles.button, isPlaying && styles.activeButton]}
          onPress={onPlayRecording}
          disabled={isRecording}
        >
          <Text style={styles.buttonText}>Play Recording</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2e6ddf",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#ff4444",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});