"use client";

import { useReducer } from "react";
import type { GameStage, Stage1Result } from "@/lib/types";

export type GameState = {
  stage: GameStage;
  stage1Result: Stage1Result | null;
  stage2Score: number;
  stage2CorrectCount: number;
};

export type GameAction =
  | { type: "START_GAME" }
  | { type: "FINISH_STAGE1"; result: Stage1Result }
  | { type: "CONTINUE_TO_TRANSITION" }
  | { type: "START_STAGE2" }
  | { type: "FINISH_STAGE2"; score: number; correctCount: number }
  | { type: "RESTART" };

const initialState: GameState = {
  stage: "intro",
  stage1Result: null,
  stage2Score: 0,
  stage2CorrectCount: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return { ...initialState, stage: "stage1" };
    case "FINISH_STAGE1":
      return { ...state, stage: "stage1-result", stage1Result: action.result };
    case "CONTINUE_TO_TRANSITION":
      return { ...state, stage: "transition" };
    case "START_STAGE2":
      return { ...state, stage: "stage2" };
    case "FINISH_STAGE2":
      return {
        ...state,
        stage: "final",
        stage2Score: action.score,
        stage2CorrectCount: action.correctCount,
      };
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
