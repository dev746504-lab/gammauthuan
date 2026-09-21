export type WordCardData = {
  pairId: number;
  word: string;
  emoji: string;
};

export type QuizOption = {
  id: string;
  text: string;
  correct: boolean;
  explanation?: string;
};

export type Scenario = {
  id: number;
  situation: string;
  hint: string;
  options: QuizOption[];
};

export type GameStage =
  | "intro"
  | "stage1"
  | "stage1-result"
  | "transition"
  | "stage2"
  | "final";

export type Stage1Result = {
  pairsFound: number;
  totalPairs: number;
  timeUsedSeconds: number;
  score: number;
};

export type Stage2Result = {
  score: number;
  correctCount: number;
  totalScenarios: number;
};
