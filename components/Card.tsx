"use client";

import { motion } from "framer-motion";

type CardProps = {
  word: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  disabled: boolean;
  onClick: () => void;
};

export default function Card({ word, emoji, isFlipped, isMatched, disabled, onClick }: CardProps) {
  const isRevealed = isFlipped || isMatched;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isRevealed}
      aria-label={isRevealed ? word : "Thẻ úp"}
      className={`relative aspect-square w-full [perspective:1000px] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 ${
        isMatched ? "pointer-events-none" : ""
      }`}
      animate={isMatched ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: isMatched ? 0.3 : 0, ease: "easeIn" }}
    >
      <motion.div
        className="absolute inset-0 h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 shadow-lg [backface-visibility:hidden]">
          <span className="text-3xl drop-shadow sm:text-4xl md:text-5xl">❓</span>
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border-4 border-white bg-white p-2 text-center shadow-lg [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl">{emoji}</span>
          <span className="text-sm font-bold text-slate-700 sm:text-base md:text-lg">{word}</span>
        </div>
      </motion.div>
    </motion.button>
  );
}
