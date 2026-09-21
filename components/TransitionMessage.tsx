"use client";

import { motion } from "framer-motion";

type TransitionMessageProps = {
  onContinue: () => void;
};

export default function TransitionMessage({ onContinue }: TransitionMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <span className="text-6xl">🤔💭</span>
      <p className="text-xl font-bold leading-relaxed text-slate-700 sm:text-2xl">
        Có nhiều điều trái ngược nhau trong cuộc sống — đó cũng là một trong những nguyên nhân
        dễ dẫn đến mâu thuẫn đấy!
      </p>
      <p className="text-lg font-semibold text-violet-600 sm:text-xl">
        Cùng xem các bạn nhỏ xử lý mâu thuẫn thế nào nhé!
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        Bắt đầu Chặng 2
      </button>
    </motion.div>
  );
}
