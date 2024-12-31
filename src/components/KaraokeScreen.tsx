import * as React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';
import { createRecorderOptions, createPlayerOptions, setupRecorder, setupPlayer, cleanupAudio } from '../utils/audioUtils';
import { processPitch } from '../utils/pitchProcessor';
import { KaraokeControls } from './KaraokeControls';
import { StatusDisplay } from './StatusDisplay';
import { AudioVisualizer } from './AudioVisualizer';
import { SongSelector } from './SongSelector';
import { RecordingTimer } from './RecordingTimer';
import { Song, AudioVisualizerData } from '../types/audio';

const DEMO_SONGS: Song[] = [
  {
    id: '1',
    title: 'Yesterday',
    artist: 'The Beatles',
    filepath: 'path/to/yesterday.mp3',
    duration: 125
  },
  {
    id: '2',
    title: 'Imagine',
    artist: 'John Lennon',
    filepath: 'path/to/imagine.mp3',
    duration: 183
  }
];

interface KaraokeState {
  isRecording: boolean;
  isPlaying: boolean;
  recordedAudioFile: string | null;
  selectedSong: Song | null;
  visualizerData: AudioVisualizerData;
}

export function KaraokeScreen() {
  const [state, setState] = useState<KaraokeState>({
    isRecording: false,
    isPlaying: false,
    recordedAudioFile: null,
    selectedSong: null,
    visualizerData: {
      frequency: Array(32).fill(0),
      amplitude: Array(32).fill(0),
      pitch: null
    }
  });

  const recorder = useRef(new AudioRecorderPlayer());
  const player = useRef<Sound | null>(null);
  const backgroundPlayer = useRef<Sound | null>(null);
  const visualizerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeAudio();
    return () => {
      cleanupAudio(recorder.current, player.current, backgroundPlayer.current);
    };
  }, []);

  const initializeAudio = async () => {
    try {
      const recorderOptions = createRecorderOptions('karaoke_recording.wav');
      await setupRecorder(recorder.current, recorderOptions);
    } catch (err) {
      console.error('Audio setup error:', err);
    }
  };

  const handleSongSelect = async (song: Song) => {
    try {
      backgroundPlayer.current = new Sound(song.filepath, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error('Background track error:', error);
          return;
        }
        setState(prev => ({ ...prev, selectedSong: song }));
      });
    } catch (err) {
      console.error('Song selection error:', err);
    }
  };

  const handleStartRecording = async () => {
    if (!state.selectedSong) return;

    try {
      const result = await recorder.current.startRecorder();
      console.log(result);
      backgroundPlayer.current?.play((success) => {
        if (!success) {
          console.error('Playback failed due to audio decoding errors');
        }
      });
      setState(prev => ({ ...prev, isRecording: true }));
      startVisualizerUpdate();
    } catch (err) {
      console.error('Recording error:', err);
    }
  };

  const handleStopRecording = async () => {
    try {
      const filePath = await recorder.current.stopRecorder();
      backgroundPlayer.current?.pause();
      setState(prev => ({
        ...prev,
        isRecording: false,
        recordedAudioFile: filePath
      }));
      stopVisualizerUpdate();
    } catch (err) {
      console.error('Stop recording error:', err);
    }
  };

  const handlePlayRecording = async () => {
    if (!state.recordedAudioFile) return;

    try {
      player.current = new Sound(state.recordedAudioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error('Playback error:', error);
          return;
        }
        player.current?.play((success) => {
          if (success) {
            setState(prev => ({ ...prev, isPlaying: false }));
          } else {
            console.error('Playback failed due to audio decoding errors');
          }
        });
        setState(prev => ({ ...prev, isPlaying: true }));
      });
    } catch (err) {
      console.error('Playback error:', err);
    }
  };

  const startVisualizerUpdate = () => {
    visualizerInterval.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        visualizerData: {
          frequency: Array(32).fill(0).map(() => Math.random()),
          amplitude: Array(32).fill(0).map(() => Math.random()),
          pitch: Math.random() * 440 + 220
        }
      }));
    }, 100);
  };

  const stopVisualizerUpdate = () => {
    if (visualizerInterval.current) {
      clearInterval(visualizerInterval.current);
    }
    setState(prev => ({
      ...prev,
      visualizerData: {
        frequency: Array(32).fill(0),
        amplitude: Array(32).fill(0),
        pitch: null
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Karaoke Studio Pro</Text>
      
      <SongSelector
        songs={DEMO_SONGS}
        selectedSong={state.selectedSong}
        onSelectSong={handleSongSelect}
      />

      <AudioVisualizer data={state.visualizerData} />
      
      <RecordingTimer isRecording={state.isRecording} />

      <KaraokeControls
        isRecording={state.isRecording}
        isPlaying={state.isPlaying}
        hasRecording={!!state.recordedAudioFile}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onPlayRecording={handlePlayRecording}
      />

      <StatusDisplay 
        isRecording={state.isRecording}
        selectedSong={state.selectedSong}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: 2,
  }
});