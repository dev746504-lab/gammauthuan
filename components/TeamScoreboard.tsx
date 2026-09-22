import { TEAMS } from "@/lib/teams";

type TeamScoreboardProps = {
  scores: number[];
  activeTeamId?: number | null;
};

export default function TeamScoreboard({ scores, activeTeamId = null }: TeamScoreboardProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-1.5 sm:flex sm:gap-2">
      {TEAMS.map((team) => {
        const isActive = team.id === activeTeamId;
        return (
          <div
            key={team.id}
            className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold shadow-md transition sm:flex-1 sm:px-3 sm:text-sm ${
              team.bgSoft
            } ${team.text} ${isActive ? `scale-105 ring-2 ${team.ring}` : ""}`}
          >
            <span>{team.emoji}</span>
            <span className="truncate">{team.name}</span>
            <span className="font-extrabold">{scores[team.id] ?? 0}</span>
          </div>
        );
      })}
    </div>
  );
}
