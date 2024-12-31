import { analyze } from 'pitchy';

export const processPitch = (audioData: Float32Array): number | null => {
  const [pitch, clarity] = analyze(audioData);
  
  if (pitch && clarity > 0.8) {
    return pitch * Math.pow(2, 2/12);
  }
  
  return null;
};