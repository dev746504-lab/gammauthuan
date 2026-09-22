"use client";

import { motion } from "framer-motion";
import { TEAMS } from "@/lib/teams";

type TeamPickerProps = {
  prompt?: string;
  onSelectTeam: (teamId: number) => void;
};

export default function TeamPicker({ prompt = "Đội nào trả lời?", onSelectTeam }: TeamPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-5 text-center shadow-xl sm:p-6"
    >
      <p className="text-base font-extrabold text-slate-700 sm:text-lg">✋ {prompt}</p>
      <div className="grid w-full grid-cols-2 gap-3">
        {TEAMS.map((team) => (
          <button
            key={team.id}
            type="button"
            onClick={() => onSelectTeam(team.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 ${team.border} ${team.bgSoft} px-4 py-4 transition hover:scale-105 active:scale-95`}
          >
            <span className="text-2xl">{team.emoji}</span>
            <span className={`text-sm font-extrabold sm:text-base ${team.text}`}>{team.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
