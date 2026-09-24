"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Scenario } from "@/lib/types";
import { useGameSound } from "./SoundProvider";
import { useSpeech } from "@/hooks/useSpeech";
import ConfettiBurst from "./ConfettiBurst";

function buildQuestionSpeech(scenario: Scenario): string {
  const optionLines = scenario.options
    .map((option) => `Đáp án ${option.id.toUpperCase()}: ${option.text}.`)
    .join(" ");
  return `${scenario.situation} ${optionLines}`;
}

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
  const speech = useSpeech();

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
      className="relative mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
    >
      {showBurst && <ConfettiBurst />}

      <div className="flex items-center justify-between gap-2">
        <p className="text-base font-bold uppercase tracking-wide text-violet-500 sm:text-lg">
          Tình huống {questionNumber}/{totalQuestions}
        </p>
        <button
          type="button"
          onClick={() => speech.toggle(buildQuestionSpeech(scenario))}
          aria-label={speech.isSpeaking ? "Dừng đọc" : "Đọc to câu hỏi"}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl shadow-md transition hover:scale-105 active:scale-95 sm:h-12 sm:w-12 ${
            speech.isSpeaking ? "animate-pulse bg-violet-500 text-white" : "bg-violet-50 text-violet-600"
          }`}
        >
          {speech.isSpeaking ? "⏹️" : "🔊"}
        </button>
      </div>

      <p className="text-2xl font-extrabold leading-relaxed text-slate-800 sm:text-3xl">
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
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold transition sm:text-xl ${
                isRightAnswer
                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                  : isWrong
                    ? "border-rose-300 bg-rose-50 text-rose-500"
                    : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50"
              } ${isDimmed ? "opacity-50" : ""} ${isWrong ? "opacity-70" : ""}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-base font-bold uppercase sm:h-10 sm:w-10">
                {option.id}
              </span>
              <span className="flex-1">{option.text}</span>
              {isRightAnswer && <span className="text-3xl">✅</span>}
              {isWrong && <span className="text-3xl">🤔</span>}
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
            className="rounded-2xl bg-amber-50 px-4 py-3 text-lg font-semibold text-amber-600"
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
            <div className="flex items-start gap-2">
              <p className="flex-1 text-lg font-semibold text-emerald-700 sm:text-xl">
                🎉 {correctOption?.explanation}
              </p>
              <button
                type="button"
                onClick={() => correctOption?.explanation && speech.toggle(correctOption.explanation)}
                aria-label={speech.isSpeaking ? "Dừng đọc" : "Nghe lời giải thích"}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl shadow-md transition hover:scale-105 active:scale-95 ${
                  speech.isSpeaking
                    ? "animate-pulse bg-emerald-500 text-white"
                    : "bg-white text-emerald-600"
                }`}
              >
                {speech.isSpeaking ? "⏹️" : "🔊"}
              </button>
            </div>
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-3 text-xl font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
            >
              {isLast ? "Xem kết quả" : "Tình huống tiếp theo"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
