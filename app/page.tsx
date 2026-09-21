"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SoundProvider } from "@/components/SoundProvider";
import SoundToggle from "@/components/SoundToggle";
import IntroScreen from "@/components/IntroScreen";
import MemoryGame, { POINTS_PER_PAIR } from "@/components/MemoryGame";
import ResultScreen from "@/components/ResultScreen";
import TransitionMessage from "@/components/TransitionMessage";
import QuizGame from "@/components/QuizGame";
import { POINTS_PER_QUESTION } from "@/components/QuizQuestion";
import ConflictSortStage, { POINTS_PER_CARD } from "@/components/ConflictSortStage";
import CauseSummaryCard from "@/components/CauseSummaryCard";
import FinalResult from "@/components/FinalResult";
import { useGameState } from "@/hooks/useGameState";
import wordPairsData from "@/data/wordPairs.json";
import scenariosData from "@/data/scenarios.json";
import conflictSituationsData from "@/data/conflictSituations.json";

const TOTAL_PAIRS = wordPairsData.length / 2;
const STAGE1_MAX_SCORE = TOTAL_PAIRS * POINTS_PER_PAIR;
const STAGE2_MAX_SCORE = scenariosData.length * POINTS_PER_QUESTION;
const STAGE3_MAX_SCORE = conflictSituationsData.length * POINTS_PER_CARD;
const MAX_SCORE = STAGE1_MAX_SCORE + STAGE2_MAX_SCORE + STAGE3_MAX_SCORE;

export default function Home() {
  const { state, dispatch } = useGameState();
  const totalScore = (state.stage1Result?.score ?? 0) + state.stage2Score + state.stage3Score;

  return (
    <SoundProvider>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 px-4 py-6">
        <div className="absolute right-4 top-4 z-30">
          <SoundToggle />
        </div>

        <AnimatePresence mode="wait">
          {state.stage === "intro" && (
            <motion.div key="intro" exit={{ opacity: 0 }} className="w-full">
              <IntroScreen onStart={() => dispatch({ type: "START_GAME" })} />
            </motion.div>
          )}

          {state.stage === "stage1" && (
            <motion.div key="stage1" exit={{ opacity: 0 }} className="w-full">
              <MemoryGame onComplete={(result) => dispatch({ type: "FINISH_STAGE1", result })} />
            </motion.div>
          )}

          {state.stage === "stage1-result" && state.stage1Result && (
            <motion.div key="stage1-result" exit={{ opacity: 0 }} className="w-full">
              <ResultScreen
                pairsFound={state.stage1Result.pairsFound}
                totalPairs={state.stage1Result.totalPairs}
                timeUsedSeconds={state.stage1Result.timeUsedSeconds}
                score={state.stage1Result.score}
                onContinue={() => dispatch({ type: "CONTINUE_TO_TRANSITION" })}
              />
            </motion.div>
          )}

          {state.stage === "transition" && (
            <motion.div key="transition" exit={{ opacity: 0 }} className="w-full">
              <TransitionMessage onContinue={() => dispatch({ type: "START_STAGE2" })} />
            </motion.div>
          )}

          {state.stage === "stage2" && (
            <motion.div key="stage2" exit={{ opacity: 0 }} className="w-full">
              <QuizGame
                onComplete={(result) =>
                  dispatch({
                    type: "FINISH_STAGE2",
                    score: result.score,
                    correctCount: result.correctCount,
                  })
                }
              />
            </motion.div>
          )}

          {state.stage === "stage3" && (
            <motion.div key="stage3" exit={{ opacity: 0 }} className="w-full">
              <ConflictSortStage
                onComplete={(result) =>
                  dispatch({
                    type: "FINISH_STAGE3",
                    score: result.score,
                    correctCount: result.correctCount,
                  })
                }
              />
            </motion.div>
          )}

          {state.stage === "stage3-summary" && (
            <motion.div key="stage3-summary" exit={{ opacity: 0 }} className="w-full">
              <CauseSummaryCard onContinue={() => dispatch({ type: "CONTINUE_TO_FINAL" })} />
            </motion.div>
          )}

          {state.stage === "final" && (
            <motion.div key="final" exit={{ opacity: 0 }} className="w-full">
              <FinalResult
                totalScore={totalScore}
                maxScore={MAX_SCORE}
                onRestart={() => dispatch({ type: "RESTART" })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SoundProvider>
  );
}
