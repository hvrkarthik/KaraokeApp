import * as React from "react";
import { StyleSheet, Text } from "react-native";

interface RecordingTimerProps {
  isRecording: boolean;
}

export function RecordingTimer({ isRecording }: RecordingTimerProps) {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.timer}>{formatTime(time)}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E91E63",
    marginVertical: 16,
  }
});