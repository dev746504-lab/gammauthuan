"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SoundProvider } from "@/components/SoundProvider";
import SoundToggle from "@/components/SoundToggle";
import IntroScreen from "@/components/IntroScreen";
import StageSelectScreen from "@/components/StageSelectScreen";
import StageCompleteCard from "@/components/StageCompleteCard";
import MemoryGame from "@/components/MemoryGame";
import ResultScreen from "@/components/ResultScreen";
import TransitionMessage from "@/components/TransitionMessage";
import QuizGame from "@/components/QuizGame";
import ConflictSortStage from "@/components/ConflictSortStage";
import CauseSummaryCard from "@/components/CauseSummaryCard";
import FinalResult from "@/components/FinalResult";
import { useGameState } from "@/hooks/useGameState";

export default function Home() {
  const { state, dispatch } = useGameState();
  const onAdjustTeamScore = (teamId: number, delta: number) =>
    dispatch({ type: "ADJUST_TEAM_SCORE", teamId, delta });

  return (
    <SoundProvider>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 px-4 py-6">
        <div className="absolute right-4 top-4 z-30">
          <SoundToggle />
        </div>

        <AnimatePresence mode="wait">
          {state.stage === "intro" && (
            <motion.div key="intro" exit={{ opacity: 0 }} className="w-full">
              <IntroScreen
                onStart={() => dispatch({ type: "START_GAME" })}
                onChooseStage={() => dispatch({ type: "SHOW_STAGE_SELECT" })}
              />
            </motion.div>
          )}

          {state.stage === "stage-select" && (
            <motion.div key="stage-select" exit={{ opacity: 0 }} className="w-full">
              <StageSelectScreen
                onSelectStage={(stageNumber) =>
                  dispatch({ type: "START_PRACTICE_STAGE", stageNumber })
                }
                onBack={() => dispatch({ type: "RESTART" })}
              />
            </motion.div>
          )}

          {state.stage === "stage1" && (
            <motion.div key="stage1" exit={{ opacity: 0 }} className="w-full">
              <MemoryGame
                teamScores={state.teamScores}
                onAdjustTeamScore={onAdjustTeamScore}
                onComplete={(stats) => dispatch({ type: "FINISH_STAGE1", stats })}
              />
            </motion.div>
          )}

          {state.stage === "stage1-result" && state.stage1Stats && (
            <motion.div key="stage1-result" exit={{ opacity: 0 }} className="w-full">
              <ResultScreen
                pairsFound={state.stage1Stats.pairsFound}
                totalPairs={state.stage1Stats.totalPairs}
                timeUsedSeconds={state.stage1Stats.timeUsedSeconds}
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
                teamScores={state.teamScores}
                onAdjustTeamScore={onAdjustTeamScore}
                onComplete={(stats) => dispatch({ type: "FINISH_STAGE2", stats })}
              />
            </motion.div>
          )}

          {state.stage === "stage2-complete" && state.stage2Stats && (
            <motion.div key="stage2-complete" exit={{ opacity: 0 }} className="w-full">
              <StageCompleteCard
                title="Hoàn thành Chặng 2!"
                correctCount={state.stage2Stats.correctCount}
                total={state.stage2Stats.totalScenarios}
                onContinue={() => dispatch({ type: "BACK_TO_STAGE_SELECT" })}
              />
            </motion.div>
          )}

          {state.stage === "stage3" && (
            <motion.div key="stage3" exit={{ opacity: 0 }} className="w-full">
              <ConflictSortStage
                teamScores={state.teamScores}
                onAdjustTeamScore={onAdjustTeamScore}
                onComplete={(stats) => dispatch({ type: "FINISH_STAGE3", stats })}
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
                teamScores={state.teamScores}
                onRestart={() => dispatch({ type: "RESTART" })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SoundProvider>
  );
}
