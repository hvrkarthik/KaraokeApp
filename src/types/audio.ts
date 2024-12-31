export interface Song {
  id: string;
  title: string;
  artist: string;
  filepath: string;
  duration: number;
}

export interface AudioVisualizerData {
  frequency: number[];
  amplitude: number[];
  pitch: number | null;
}