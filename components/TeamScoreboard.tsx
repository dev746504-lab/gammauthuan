import { TEAMS } from "@/lib/teams";

type TeamScoreboardProps = {
  scores: number[];
  onAdjustScore?: (teamId: number, delta: number) => void;
};

export default function TeamScoreboard({ scores, onAdjustScore }: TeamScoreboardProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-1.5 sm:flex sm:gap-2">
      {TEAMS.map((team) => {
        const score = scores[team.id] ?? 0;
        return (
          <div
            key={team.id}
            className={`flex items-center gap-1 rounded-full ${team.bgSoft} py-1 pl-2.5 pr-1 shadow-md sm:flex-1`}
          >
            {onAdjustScore ? (
              <button
                type="button"
                onClick={() => onAdjustScore(team.id, 1)}
                aria-label={`Cộng điểm ${team.name}`}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full text-xs font-bold transition hover:scale-105 active:scale-95 sm:text-sm ${team.text}`}
              >
                <span>{team.emoji}</span>
                <span className="truncate">{team.name}</span>
                <span className="font-extrabold">{score}</span>
              </button>
            ) : (
              <span
                className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-bold sm:text-sm ${team.text}`}
              >
                <span>{team.emoji}</span>
                <span className="truncate">{team.name}</span>
                <span className="font-extrabold">{score}</span>
              </span>
            )}
            {onAdjustScore && (
              <button
                type="button"
                onClick={() => onAdjustScore(team.id, -1)}
                disabled={score === 0}
                aria-label={`Trừ điểm ${team.name}`}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${team.text} opacity-50 transition hover:opacity-100 disabled:opacity-20`}
              >
                −
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
