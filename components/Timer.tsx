type TimerProps = {
  secondsLeft: number;
};

export default function Timer({ secondsLeft }: TimerProps) {
  const safeSeconds = Math.max(0, secondsLeft);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const isUrgent = safeSeconds <= 10;

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-lg font-bold shadow-md sm:text-xl ${
        isUrgent ? "animate-pulse bg-rose-500 text-white" : "bg-white/90 text-slate-700"
      }`}
    >
      <span aria-hidden>⏱️</span>
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
