"use client";

import { useReducer } from "react";
import type { GameMode, GameStage, Stage1Result } from "@/lib/types";

export type GameState = {
  stage: GameStage;
  mode: GameMode;
  stage1Result: Stage1Result | null;
  stage2Score: number;
  stage2CorrectCount: number;
  stage3Score: number;
  stage3CorrectCount: number;
};

export type GameAction =
  | { type: "START_GAME" }
  | { type: "SHOW_STAGE_SELECT" }
  | { type: "START_PRACTICE_STAGE"; stageNumber: 1 | 2 | 3 }
  | { type: "FINISH_STAGE1"; result: Stage1Result }
  | { type: "CONTINUE_TO_TRANSITION" }
  | { type: "START_STAGE2" }
  | { type: "FINISH_STAGE2"; score: number; correctCount: number }
  | { type: "FINISH_STAGE3"; score: number; correctCount: number }
  | { type: "CONTINUE_TO_FINAL" }
  | { type: "BACK_TO_STAGE_SELECT" }
  | { type: "RESTART" };

const initialState: GameState = {
  stage: "intro",
  mode: "full",
  stage1Result: null,
  stage2Score: 0,
  stage2CorrectCount: 0,
  stage3Score: 0,
  stage3CorrectCount: 0,
};

const PRACTICE_STAGE_MAP: Record<1 | 2 | 3, GameStage> = {
  1: "stage1",
  2: "stage2",
  3: "stage3",
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return { ...initialState, mode: "full", stage: "stage1" };
    case "SHOW_STAGE_SELECT":
      return { ...initialState, stage: "stage-select" };
    case "START_PRACTICE_STAGE":
      return { ...initialState, mode: "practice", stage: PRACTICE_STAGE_MAP[action.stageNumber] };
    case "FINISH_STAGE1":
      return { ...state, stage: "stage1-result", stage1Result: action.result };
    case "CONTINUE_TO_TRANSITION":
      return state.mode === "practice"
        ? { ...initialState, stage: "stage-select" }
        : { ...state, stage: "transition" };
    case "START_STAGE2":
      return { ...state, stage: "stage2" };
    case "FINISH_STAGE2":
      return {
        ...state,
        stage: state.mode === "practice" ? "stage2-complete" : "stage3",
        stage2Score: action.score,
        stage2CorrectCount: action.correctCount,
      };
    case "FINISH_STAGE3":
      return {
        ...state,
        stage: "stage3-summary",
        stage3Score: action.score,
        stage3CorrectCount: action.correctCount,
      };
    case "CONTINUE_TO_FINAL":
      return state.mode === "practice"
        ? { ...initialState, stage: "stage-select" }
        : { ...state, stage: "final" };
    case "BACK_TO_STAGE_SELECT":
      return { ...initialState, stage: "stage-select" };
    case "RESTART":
      return initialState;
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
}
