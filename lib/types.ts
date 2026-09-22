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

export type ConflictSituation = {
  id: number;
  text: string;
  isConflict: boolean;
  feedback: string;
};

export type GameStage =
  | "intro"
  | "stage-select"
  | "stage1"
  | "stage1-result"
  | "transition"
  | "stage2"
  | "stage2-complete"
  | "stage3"
  | "stage3-summary"
  | "final";

export type GameMode = "full" | "practice";

export type Stage1Stats = {
  pairsFound: number;
  totalPairs: number;
  timeUsedSeconds: number;
};

export type Stage2Stats = {
  correctCount: number;
  totalScenarios: number;
};

export type Stage3Stats = {
  correctCount: number;
  totalCards: number;
};
