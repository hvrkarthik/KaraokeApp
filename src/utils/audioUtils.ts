import { TNSRecorder, TNSPlayer, AudioRecorderOptions, AudioPlayerOptions } from '@nativescript/audio';

export const createRecorderOptions = (filename: string): AudioRecorderOptions => ({
  filename,
  format: 'wav',
  sampleRate: 44100,
  channels: 1,
  bitRate: 128000,
});

export const createPlayerOptions = (
  audioFile: string,
  onComplete?: () => void,
  onError?: (error: any) => void
): AudioPlayerOptions => ({
  audioFile,
  loop: false,
  completeCallback: onComplete,
  errorCallback: onError,
});

export const setupRecorder = async (recorder: TNSRecorder, options: AudioRecorderOptions) => {
  await recorder.requestRecordPermission();
  await recorder.init(options);
};

export const setupPlayer = async (player: TNSPlayer, options: AudioPlayerOptions) => {
  await player.init(options);
};

export const cleanupAudio = async (recorder: TNSRecorder, ...players: TNSPlayer[]) => {
  try {
    await recorder.dispose();
    for (const player of players) {
      await player.dispose();
    }
  } catch (err) {
    console.error('Cleanup error:', err);
  }
};