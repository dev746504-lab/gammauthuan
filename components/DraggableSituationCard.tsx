"use client";

import { useEffect, type RefObject } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

type Point = { x: number; y: number };

type DraggableSituationCardProps = {
  text: string;
  disabled?: boolean;
  returnSignal: number;
  dragConstraints: RefObject<HTMLElement | null>;
  onDragMove: (point: Point) => void;
  onDragRelease: (point: Point) => void;
};

export default function DraggableSituationCard({
  text,
  disabled = false,
  returnSignal,
  dragConstraints,
  onDragMove,
  onDragRelease,
}: DraggableSituationCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const wrongFlash = useMotionValue(0);

  useEffect(() => {
    if (returnSignal === 0) return;
    const startX = x.get();
    animate(x, [startX, startX - 14, startX + 14, startX - 10, startX + 10, 0], {
      duration: 0.5,
      ease: "easeInOut",
    });
    animate(y, 0, { type: "spring", stiffness: 260, damping: 20 });
    animate(wrongFlash, [1, 1, 0], { duration: 0.6, times: [0, 0.5, 1] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnSignal]);

  return (
    <motion.div
      drag={!disabled}
      dragMomentum={false}
      dragElastic={0.15}
      dragConstraints={dragConstraints}
      style={{ x, y }}
      whileDrag={{ scale: 1.06 }}
      onDrag={(_, info) => onDragMove({ x: info.point.x, y: info.point.y })}
      onDragEnd={(_, info) => onDragRelease({ x: info.point.x, y: info.point.y })}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.3 }}
      className={`relative flex w-full max-w-md touch-none items-center justify-center rounded-2xl border-4 border-violet-200 bg-white p-6 text-center shadow-xl sm:max-w-lg ${
        disabled ? "pointer-events-none opacity-70" : "cursor-grab active:cursor-grabbing"
      }`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-rose-400 bg-rose-50"
        style={{ opacity: wrongFlash }}
      />
      <p className="relative text-xl font-bold leading-relaxed text-slate-700 sm:text-2xl">
        {text}
      </p>
    </motion.div>
  );
}
