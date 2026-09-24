"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuizQuestion from "./QuizQuestion";
import scenariosData from "@/data/scenarios.json";
import type { Scenario, Stage2Stats } from "@/lib/types";

const scenarios = scenariosData as Scenario[];

type QuizGameProps = {
  onComplete: (stats: Stage2Stats) => void;
};

export default function QuizGame({ onComplete }: QuizGameProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const current = scenarios[index];
  const isLast = index === scenarios.length - 1;

  const handleCorrectAnswer = () => {
    setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete({ correctCount, totalScenarios: scenarios.length });
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="mx-auto mt-12 flex w-full max-w-3xl flex-col items-center gap-4 px-4 sm:mt-0">
      <AnimatePresence mode="wait">
        <QuizQuestion
          key={current.id}
          scenario={current}
          questionNumber={index + 1}
          totalQuestions={scenarios.length}
          isLast={isLast}
          onCorrectAnswer={handleCorrectAnswer}
          onNext={handleNext}
        />
      </AnimatePresence>
    </div>
  );
}
