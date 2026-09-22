export type TeamMeta = {
  id: number;
  name: string;
  emoji: string;
  bg: string;
  bgSoft: string;
  border: string;
  text: string;
  ring: string;
};

export const TEAMS: TeamMeta[] = [
  {
    id: 0,
    name: "Đội 1",
    emoji: "🔴",
    bg: "bg-rose-500",
    bgSoft: "bg-rose-50",
    border: "border-rose-400",
    text: "text-rose-600",
    ring: "ring-rose-400",
  },
  {
    id: 1,
    name: "Đội 2",
    emoji: "🔵",
    bg: "bg-sky-500",
    bgSoft: "bg-sky-50",
    border: "border-sky-400",
    text: "text-sky-600",
    ring: "ring-sky-400",
  },
  {
    id: 2,
    name: "Đội 3",
    emoji: "🟡",
    bg: "bg-amber-500",
    bgSoft: "bg-amber-50",
    border: "border-amber-400",
    text: "text-amber-600",
    ring: "ring-amber-400",
  },
  {
    id: 3,
    name: "Đội 4",
    emoji: "🟢",
    bg: "bg-emerald-500",
    bgSoft: "bg-emerald-50",
    border: "border-emerald-400",
    text: "text-emerald-600",
    ring: "ring-emerald-400",
  },
];

export const TEAM_COUNT = TEAMS.length;

export function createEmptyTeamScores(): number[] {
  return TEAMS.map(() => 0);
}
