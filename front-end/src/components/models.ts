export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Record {
  timestamp: string;
  currentProgress: string;
  survey?: Survey;
  config?: Config;
  test?: Test;
}

export interface Survey {
  [key: string]: any;
  sex: number | null;
  age: number | null;
  education: string | null;
  job: string | null;
  eyesight: string | null;
  assistant: string | null;
  phoneModel: string | null;
  screenResolutionX: number | null;
  screenResolutionY: number | null;
  sharpness: number | null;
  aesthetic: number | null;
  familiarity: number | null;
  efficiency: number | null;
  bigFont: number | null;
}

export interface Config {
  contrastBright: number;
  scaleBright: number;
  contrastDark: number;
  scaleDark: number;
  fontSizeHeader: number;
  fontSizeContent: number;
  lineHeight: number;
  fontFamily: string;
  fontWeight: number;
}

export interface Test {
  original: number | null;
  favoriteBright: number | null;
  favoriteDark: number | null;
}
