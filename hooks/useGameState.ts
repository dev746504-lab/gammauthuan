"use client";

import { useReducer } from "react";
import type { GameStage, Stage1Stats, Stage2Stats, Stage3Stats } from "@/lib/types";

export type GameState = {
  stage: GameStage;
  stage1Stats: Stage1Stats | null;
  stage2Stats: Stage2Stats | null;
  stage3Stats: Stage3Stats | null;
};

export type GameAction =
  | { type: "SHOW_STAGE_SELECT" }
  | { type: "SELECT_STAGE"; stageNumber: 1 | 2 | 3 }
  | { type: "FINISH_STAGE1"; stats: Stage1Stats }
  | { type: "FINISH_STAGE2"; stats: Stage2Stats }
  | { type: "FINISH_STAGE3"; stats: Stage3Stats }
  | { type: "BACK_TO_STAGE_SELECT" }
  | { type: "RESTART" };

const initialState: GameState = {
  stage: "intro",
  stage1Stats: null,
  stage2Stats: null,
  stage3Stats: null,
};

const STAGE_MAP: Record<1 | 2 | 3, GameStage> = {
  1: "stage1",
  2: "stage2",
  3: "stage3",
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SHOW_STAGE_SELECT":
      return { ...initialState, stage: "stage-select" };
    case "SELECT_STAGE":
      return {
        ...state,
        stage: STAGE_MAP[action.stageNumber],
        stage1Stats: null,
        stage2Stats: null,
        stage3Stats: null,
      };
    case "FINISH_STAGE1":
      return { ...state, stage: "stage1-result", stage1Stats: action.stats };
    case "FINISH_STAGE2":
      return { ...state, stage: "stage2-complete", stage2Stats: action.stats };
    case "FINISH_STAGE3":
      return { ...state, stage: "stage3-summary", stage3Stats: action.stats };
    case "BACK_TO_STAGE_SELECT":
      return { ...state, stage: "stage-select" };
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
