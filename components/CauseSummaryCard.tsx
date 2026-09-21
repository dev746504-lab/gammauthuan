"use client";

import { motion } from "framer-motion";

const CAUSES = [
  "Chưa hiểu và thông cảm cho tính cách của nhau",
  "Hiểu lầm (nói một đằng, hiểu một nẻo)",
  "Bất đồng ý kiến",
  "Dùng lời nói thô tục",
];

type CauseSummaryCardProps = {
  onContinue: () => void;
};

export default function CauseSummaryCard({ onContinue }: CauseSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto flex w-full max-w-lg flex-col items-center gap-5 rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <span className="text-6xl">🧭</span>
      <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">
        4 Nguyên Nhân Thường Gặp
      </h2>
      <p className="text-base font-medium text-slate-600 sm:text-lg">
        Qua các tình huống vừa rồi, đây là những nguyên nhân dễ dẫn đến mâu thuẫn với bạn bè:
      </p>

      <ol className="flex w-full flex-col gap-3 text-left">
        {CAUSES.map((cause, i) => (
          <li key={cause} className="flex items-start gap-3 rounded-2xl bg-violet-50 px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-sm font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5 text-base font-semibold text-slate-700 sm:text-lg">
              {cause}
            </span>
          </li>
        ))}
      </ol>

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
