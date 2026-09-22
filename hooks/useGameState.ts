"use client";

import { useReducer } from "react";
import { createEmptyTeamScores } from "@/lib/teams";
import type { GameMode, GameStage, Stage1Stats, Stage2Stats, Stage3Stats } from "@/lib/types";

export type GameState = {
  stage: GameStage;
  mode: GameMode;
  teamScores: number[];
  stage1Stats: Stage1Stats | null;
  stage2Stats: Stage2Stats | null;
  stage3Stats: Stage3Stats | null;
};

export type GameAction =
  | { type: "START_GAME" }
  | { type: "SHOW_STAGE_SELECT" }
  | { type: "START_PRACTICE_STAGE"; stageNumber: 1 | 2 | 3 }
  | { type: "ADJUST_TEAM_SCORE"; teamId: number; delta: number }
  | { type: "FINISH_STAGE1"; stats: Stage1Stats }
  | { type: "CONTINUE_TO_TRANSITION" }
  | { type: "START_STAGE2" }
  | { type: "FINISH_STAGE2"; stats: Stage2Stats }
  | { type: "FINISH_STAGE3"; stats: Stage3Stats }
  | { type: "CONTINUE_TO_FINAL" }
  | { type: "BACK_TO_STAGE_SELECT" }
  | { type: "RESTART" };

const initialState: GameState = {
  stage: "intro",
  mode: "full",
  teamScores: createEmptyTeamScores(),
  stage1Stats: null,
  stage2Stats: null,
  stage3Stats: null,
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
      return {
        ...state,
        mode: "practice",
        stage: PRACTICE_STAGE_MAP[action.stageNumber],
        stage1Stats: null,
        stage2Stats: null,
        stage3Stats: null,
      };
    case "ADJUST_TEAM_SCORE": {
      const nextScores = [...state.teamScores];
      nextScores[action.teamId] = Math.max(0, (nextScores[action.teamId] ?? 0) + action.delta);
      return { ...state, teamScores: nextScores };
    }
    case "FINISH_STAGE1":
      return { ...state, stage: "stage1-result", stage1Stats: action.stats };
    case "CONTINUE_TO_TRANSITION":
      return state.mode === "practice"
        ? { ...state, stage: "stage-select" }
        : { ...state, stage: "transition" };
    case "START_STAGE2":
      return { ...state, stage: "stage2" };
    case "FINISH_STAGE2":
      return {
        ...state,
        stage: state.mode === "practice" ? "stage2-complete" : "stage3",
        stage2Stats: action.stats,
      };
    case "FINISH_STAGE3":
      return { ...state, stage: "stage3-summary", stage3Stats: action.stats };
    case "CONTINUE_TO_FINAL":
      return state.mode === "practice"
        ? { ...state, stage: "stage-select" }
        : { ...state, stage: "final" };
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
