"use client";

import { motion } from "framer-motion";
import ConfettiBurst from "./ConfettiBurst";

type StageCompleteCardProps = {
  title: string;
  correctCount: number;
  total: number;
  onContinue: () => void;
};

export default function StageCompleteCard({
  title,
  correctCount,
  total,
  onContinue,
}: StageCompleteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto flex w-full max-w-md flex-col items-center gap-5 overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <ConfettiBurst count={20} />
      <span className="text-6xl">🎉</span>
      <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">{title}</h2>
      <div className="rounded-2xl bg-emerald-50 px-6 py-3">
        <p className="text-lg font-bold text-emerald-700">
          ✅ Trả lời đúng {correctCount}/{total} câu
        </p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mt-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        Quay lại chọn chặng
      </button>
    </motion.div>
  );
}
