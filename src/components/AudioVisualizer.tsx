import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface AudioVisualizerProps {
  data: {
    frequency: number[];
    pitch?: number;
  };
}

export function AudioVisualizer({ data }: AudioVisualizerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.visualizer}>
        {data.frequency.map((freq, index) => (
          <View 
            key={index}
            style={[styles.bar, { height: `${Math.min(freq * 100, 100)}%` }]}
          />
        ))}
      </View>
      {data.pitch && (
        <Text style={styles.pitchIndicator}>
          Pitch: {Math.round(data.pitch)}Hz
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  visualizer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 8,
    width: "100%",
  },
  bar: {
    width: 4,
    backgroundColor: "#4CAF50",
    margin: 2,
    borderRadius: 2,
  },
  pitchIndicator: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  }
});