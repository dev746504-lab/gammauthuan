"use client";

import { motion } from "framer-motion";

type ResultScreenProps = {
  pairsFound: number;
  totalPairs: number;
  timeUsedSeconds: number;
  onContinue: () => void;
};

export default function ResultScreen({
  pairsFound,
  totalPairs,
  timeUsedSeconds,
  onContinue,
}: ResultScreenProps) {
  const completedAll = pairsFound === totalPairs;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-5 rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <span className="text-6xl">{completedAll ? "🎉" : "⏰"}</span>
      <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
        {completedAll ? "Hoàn thành xuất sắc!" : "Hết giờ rồi!"}
      </h2>

      <div className="grid w-full grid-cols-2 gap-4 text-left">
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm font-semibold text-violet-500">Số cặp ghép đúng</p>
          <p className="text-2xl font-bold text-violet-700">
            {pairsFound}/{totalPairs}
          </p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-500">Thời gian</p>
          <p className="text-2xl font-bold text-amber-700">{timeUsedSeconds}s</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        Tiếp tục
      </button>
    </motion.div>
  );
}
