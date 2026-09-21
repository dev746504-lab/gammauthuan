"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ConfettiBurst from "./ConfettiBurst";
import { useGameSound } from "./SoundProvider";

const BADGE_RATIO_THRESHOLD = 0.65;

type FinalResultProps = {
  totalScore: number;
  maxScore: number;
  onRestart: () => void;
};

export default function FinalResult({ totalScore, maxScore, onRestart }: FinalResultProps) {
  const sound = useGameSound();
  const ratio = maxScore > 0 ? totalScore / maxScore : 0;
  const isTopBadge = ratio >= BADGE_RATIO_THRESHOLD;
  const badge = isTopBadge
    ? { emoji: "🌟", label: "Bạn nhỏ hòa giải giỏi" }
    : { emoji: "💪", label: "Bạn đã cố gắng rất tốt" };

  useEffect(() => {
    sound.playFanfare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto flex w-full max-w-lg flex-col items-center gap-5 overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl"
    >
      <ConfettiBurst count={isTopBadge ? 30 : 16} />

      <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Hoàn thành trò chơi!</h2>

      <div className="rounded-2xl bg-amber-50 px-6 py-3">
        <p className="text-lg font-bold text-amber-700">
          ⭐ Tổng điểm: {totalScore}/{maxScore}
        </p>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
        className="flex flex-col items-center gap-2 rounded-3xl bg-gradient-to-br from-violet-100 to-pink-100 px-8 py-6"
      >
        <span className="text-6xl">{badge.emoji}</span>
        <p className="text-xl font-extrabold text-violet-700 sm:text-2xl">{badge.label}</p>
      </motion.div>

      <p className="text-lg font-semibold leading-relaxed text-slate-600">
        Mâu thuẫn bạn bè thường xuất phát từ việc chưa hiểu và thông cảm cho nhau. Hãy luôn lắng
        nghe và tôn trọng bạn bè nhé!
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        🔄 Chơi lại
      </button>
    </motion.div>
  );
}
