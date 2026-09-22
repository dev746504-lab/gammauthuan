"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuizQuestion from "./QuizQuestion";
import scenariosData from "@/data/scenarios.json";
import type { Scenario, Stage2Stats } from "@/lib/types";

const scenarios = scenariosData as Scenario[];

type QuizGameProps = {
  teamScores: number[];
  onTeamScored: (teamId: number) => void;
  onComplete: (stats: Stage2Stats) => void;
};

export default function QuizGame({ teamScores, onTeamScored, onComplete }: QuizGameProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const current = scenarios[index];
  const isLast = index === scenarios.length - 1;

  const handleTeamScored = (teamId: number) => {
    setCorrectCount((c) => c + 1);
    onTeamScored(teamId);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete({ correctCount, totalScenarios: scenarios.length });
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-4">
      <AnimatePresence mode="wait">
        <QuizQuestion
          key={current.id}
          scenario={current}
          questionNumber={index + 1}
          totalQuestions={scenarios.length}
          isLast={isLast}
          teamScores={teamScores}
          onTeamScored={handleTeamScored}
          onNext={handleNext}
        />
      </AnimatePresence>
    </div>
  );
}
