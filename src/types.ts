export type VocalistType = 'male' | 'female' | 'duet' | 'instrumental';
export type LanguageType = 'bn' | 'fa' | 'bn-fa';

export interface LyricSceneData {
  id: number;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
  section: string;
  singer: VocalistType;
  lang: LanguageType;
  text: string;
  subtitle?: string; // Bengali translation for Persian verses
  transliteration?: string;
  mood: 'ambient' | 'romantic-soft' | 'passionate-flame' | 'ecstatic-light';
}
