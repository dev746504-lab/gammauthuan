"use client";

import { motion } from "framer-motion";

type IntroScreenProps = {
  onChooseStage: () => void;
};

export default function IntroScreen({ onChooseStage }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-2xl sm:gap-6 sm:p-8"
    >
      <span className="text-5xl sm:text-6xl">🤝</span>
      <h1 className="text-2xl font-extrabold text-slate-800 sm:text-4xl">
        Giải Quyết Mâu Thuẫn Với Bạn Bè
      </h1>
      <p className="text-base font-medium text-slate-600 sm:text-xl">
        Cùng chơi 3 chặng thú vị để học cách làm bạn tốt với mọi người nhé!
      </p>

      <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-3 sm:gap-3">
        <div className="rounded-2xl bg-violet-50 p-3 sm:p-4">
          <p className="font-bold text-violet-600">Chặng 1 🃏</p>
          <p className="text-sm text-slate-600">Ghép đôi trái nghĩa</p>
        </div>
        <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
          <p className="font-bold text-orange-600">Chặng 2 💬</p>
          <p className="text-sm text-slate-600">Chọn cách ứng xử thông minh</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-3 sm:p-4">
          <p className="font-bold text-emerald-600">Chặng 3 🔥🤝</p>
          <p className="text-sm text-slate-600">Soi tình huống</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChooseStage}
        className="w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 px-10 py-3 text-lg font-extrabold text-white shadow-lg transition hover:scale-105 active:scale-95 sm:py-4 sm:text-xl sm:w-auto"
      >
        🎯 Chọn chặng chơi
      </button>
    </motion.div>
  );
}
