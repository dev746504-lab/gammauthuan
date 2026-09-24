import { forwardRef } from "react";

type DropZoneProps = {
  icon: string;
  label: string;
  tone: "conflict" | "not-conflict";
  isActive: boolean;
};

const TONE_CLASSES: Record<DropZoneProps["tone"], string> = {
  conflict: "border-rose-300 bg-rose-50 text-rose-600",
  "not-conflict": "border-emerald-300 bg-emerald-50 text-emerald-600",
};

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(function DropZone(
  { icon, label, tone, isActive },
  ref
) {
  return (
    <div
      ref={ref}
      className={`flex w-full shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-4 border-dashed px-4 py-5 text-center transition-all duration-200 sm:w-56 ${
        TONE_CLASSES[tone]
      } ${isActive ? "scale-105 border-solid shadow-lg" : ""}`}
    >
      <span className="text-4xl sm:text-5xl">{icon}</span>
      <span className="text-base font-bold sm:text-lg">{label}</span>
    </div>
  );
});

export default DropZone;
