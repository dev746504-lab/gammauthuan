"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Scenario } from "@/lib/types";
import { useGameSound } from "./SoundProvider";
import ConfettiBurst from "./ConfettiBurst";

type QuizQuestionProps = {
  scenario: Scenario;
  questionNumber: number;
  totalQuestions: number;
  isLast: boolean;
  onCorrectAnswer: () => void;
  onNext: () => void;
};

export default function QuizQuestion({
  scenario,
  questionNumber,
  totalQuestions,
  isLast,
  onCorrectAnswer,
  onNext,
}: QuizQuestionProps) {
  const [correctId, setCorrectId] = useState<string | null>(null);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const sound = useGameSound();

  const correctOption = scenario.options.find((o) => o.correct);
  const isAnswered = correctId !== null;

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    const option = scenario.options.find((o) => o.id === optionId);
    if (!option) return;

    if (option.correct) {
      setCorrectId(optionId);
      sound.playCorrect();
      setShowBurst(true);
      onCorrectAnswer();
    } else {
      setWrongIds((prev) => (prev.includes(optionId) ? prev : [...prev, optionId]));
      setShowHint(true);
      sound.playIncorrect();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="relative mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {showBurst && <ConfettiBurst />}

      <p className="text-sm font-bold uppercase tracking-wide text-violet-500">
        Tình huống {questionNumber}/{totalQuestions}
      </p>

      <p className="text-xl font-extrabold leading-relaxed text-slate-800 sm:text-2xl">
        {scenario.situation}
      </p>

      <div className="flex flex-col gap-3">
        {scenario.options.map((option) => {
          const isWrong = wrongIds.includes(option.id);
          const isRightAnswer = isAnswered && option.id === correctId;
          const isDimmed = isAnswered && !isRightAnswer;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered || isWrong}
              onClick={() => handleSelect(option.id)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition sm:text-lg ${
                isRightAnswer
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                  : isWrong
                    ? "border-rose-300 bg-rose-50 text-rose-500"
                    : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50"
              } ${isDimmed ? "opacity-50" : ""} ${isWrong ? "opacity-70" : ""}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold uppercase">
                {option.id}
              </span>
              <span className="flex-1">{option.text}</span>
              {isRightAnswer && <span className="text-2xl">✅</span>}
              {isWrong && <span className="text-2xl">🤔</span>}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showHint && !isAnswered && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-amber-50 px-4 py-3 text-base font-semibold text-amber-600"
          >
            💡 {scenario.hint}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start gap-3 rounded-2xl bg-emerald-50 p-5"
          >
            <p className="text-base font-semibold text-emerald-700 sm:text-lg">
              🎉 {correctOption?.explanation}
            </p>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              {isLast ? "Xem kết quả" : "Tình huống tiếp theo"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
