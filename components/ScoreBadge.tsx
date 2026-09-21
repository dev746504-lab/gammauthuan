type ScoreBadgeProps = {
  score: number;
};

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-lg font-bold text-amber-600 shadow-md sm:text-xl">
      <span aria-hidden>⭐</span>
      <span>{score} điểm</span>
    </div>
  );
}
