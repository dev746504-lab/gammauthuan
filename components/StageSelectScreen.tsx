"use client";

import { motion } from "framer-motion";

const STAGES = [
  {
    number: 1 as const,
    emoji: "🃏",
    title: "Chặng 1",
    subtitle: "Ghép Đôi Trái Nghĩa",
  },
  {
    number: 2 as const,
    emoji: "💬",
    title: "Chặng 2",
    subtitle: "Chọn Cách Ứng Xử Thông Minh",
  },
  {
    number: 3 as const,
    emoji: "🔥🤝",
    title: "Chặng 3",
    subtitle: "Soi Tình Huống",
  },
];

type StageSelectScreenProps = {
  onSelectStage: (stageNumber: 1 | 2 | 3) => void;
  onBack: () => void;
};

export default function StageSelectScreen({ onSelectStage, onBack }: StageSelectScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <span className="text-5xl">🎯</span>
      <h1 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Chọn Chặng Chơi</h1>
      <p className="text-base font-medium text-slate-600 sm:text-lg">
        Chọn 1 chặng để chơi riêng lẻ. Chơi xong sẽ quay lại màn này.
      </p>

      <div className="flex w-full flex-col gap-3">
        {STAGES.map((s) => (
          <button
            key={s.number}
            type="button"
            onClick={() => onSelectStage(s.number)}
            className="flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-left transition hover:scale-[1.02] hover:border-violet-300 hover:bg-violet-50 active:scale-[0.99]"
          >
            <span className="text-3xl">{s.emoji}</span>
            <span className="flex-1">
              <span className="block text-lg font-bold text-slate-800">{s.title}</span>
              <span className="block text-sm text-slate-500">{s.subtitle}</span>
            </span>
            <span className="text-2xl text-violet-400">→</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-1 text-base font-bold text-slate-500 underline-offset-4 hover:underline"
      >
        ← Quay lại
      </button>
    </motion.div>
  );
}
