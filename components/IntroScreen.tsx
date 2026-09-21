"use client";

import { motion } from "framer-motion";

type IntroScreenProps = {
  onStart: () => void;
  onChooseStage: () => void;
};

export default function IntroScreen({ onStart, onChooseStage }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <span className="text-6xl">🤝</span>
      <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
        Giải Quyết Mâu Thuẫn Với Bạn Bè
      </h1>
      <p className="text-lg font-medium text-slate-600 sm:text-xl">
        Cùng chơi 3 chặng thú vị để học cách làm bạn tốt với mọi người nhé!
      </p>

      <div className="grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-3">
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="font-bold text-violet-600">Chặng 1 🃏</p>
          <p className="text-sm text-slate-600">Ghép đôi trái nghĩa</p>
        </div>
        <div className="rounded-2xl bg-orange-50 p-4">
          <p className="font-bold text-orange-600">Chặng 2 💬</p>
          <p className="text-sm text-slate-600">Chọn cách ứng xử thông minh</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="font-bold text-emerald-600">Chặng 3 🔥🤝</p>
          <p className="text-sm text-slate-600">Soi tình huống</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="button"
          onClick={onStart}
          className="w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 px-10 py-4 text-xl font-extrabold text-white shadow-lg transition hover:scale-105 active:scale-95 sm:w-auto"
        >
          Bắt đầu chơi
        </button>
        <button
          type="button"
          onClick={onChooseStage}
          className="w-full rounded-full border-2 border-violet-200 bg-white px-8 py-3 text-base font-bold text-violet-600 transition hover:scale-105 hover:bg-violet-50 active:scale-95 sm:w-auto"
        >
          🎯 Chọn chặng chơi
        </button>
      </div>
    </motion.div>
  );
}
