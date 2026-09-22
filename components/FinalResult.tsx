"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ConfettiBurst from "./ConfettiBurst";
import { useGameSound } from "./SoundProvider";
import { TEAMS } from "@/lib/teams";

type FinalResultProps = {
  teamScores: number[];
  onRestart: () => void;
};

export default function FinalResult({ teamScores, onRestart }: FinalResultProps) {
  const sound = useGameSound();
  const maxScore = Math.max(...teamScores, 0);
  const hasWinner = maxScore > 0;
  const winners = TEAMS.filter((team) => teamScores[team.id] === maxScore);
  const rankedTeams = [...TEAMS].sort((a, b) => teamScores[b.id] - teamScores[a.id]);

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
      <ConfettiBurst count={hasWinner ? 30 : 16} />

      <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">Hoàn thành trò chơi!</h2>

      <div className="flex w-full flex-col gap-2">
        {rankedTeams.map((team, rank) => {
          const isWinner = hasWinner && teamScores[team.id] === maxScore;
          return (
            <div
              key={team.id}
              className={`flex items-center justify-between rounded-2xl px-5 py-3 ${team.bgSoft} ${
                isWinner ? `ring-2 ${team.ring}` : ""
              }`}
            >
              <span className={`flex items-center gap-2 text-base font-bold sm:text-lg ${team.text}`}>
                {isWinner ? "🏆" : `#${rank + 1}`} {team.emoji} {team.name}
              </span>
              <span className={`text-lg font-extrabold sm:text-xl ${team.text}`}>
                {teamScores[team.id]} điểm
              </span>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
        className="flex flex-col items-center gap-1 rounded-3xl bg-gradient-to-br from-violet-100 to-pink-100 px-8 py-5"
      >
        <span className="text-5xl">{hasWinner ? "🌟" : "💪"}</span>
        <p className="text-xl font-extrabold text-violet-700 sm:text-2xl">
          {hasWinner
            ? winners.length === 1
              ? `${winners[0].name} chiến thắng!`
              : `Đồng hạng nhất: ${winners.map((w) => w.name).join(", ")}!`
            : "Các đội đã cố gắng rất tốt!"}
        </p>
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
