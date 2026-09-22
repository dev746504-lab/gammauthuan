"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DraggableSituationCard from "./DraggableSituationCard";
import DropZone from "./DropZone";
import Timer from "./Timer";
import ConfettiBurst from "./ConfettiBurst";
import conflictSituationsData from "@/data/conflictSituations.json";
import { useGameSound } from "./SoundProvider";
import type { ConflictSituation, Stage3Stats } from "@/lib/types";

const situations = conflictSituationsData as ConflictSituation[];
const TOTAL_CARDS = situations.length;
const STAGE_DURATION_SECONDS = 90;
const ADVANCE_DELAY_MS = 1300;
const WRONG_HINT_DURATION_MS = 1600;

type Zone = "conflict" | "not-conflict";
type Point = { x: number; y: number };

function isPointInRect(point: Point, rect: DOMRect, padding = 16): boolean {
  return (
    point.x >= rect.left - padding &&
    point.x <= rect.right + padding &&
    point.y >= rect.top - padding &&
    point.y <= rect.bottom + padding
  );
}

type ConflictSortStageProps = {
  onComplete: (stats: Stage3Stats) => void;
};

export default function ConflictSortStage({ onComplete }: ConflictSortStageProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(STAGE_DURATION_SECONDS);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [returnSignal, setReturnSignal] = useState(0);
  const [wrongHint, setWrongHint] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showBurst, setShowBurst] = useState(false);
  const [matched, setMatched] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const conflictZoneRef = useRef<HTMLDivElement>(null);
  const notConflictZoneRef = useRef<HTMLDivElement>(null);
  const sound = useGameSound();

  const current = situations[index];

  // Đồng hồ chỉ mang tính tạo nhịp độ, hết giờ không kết thúc chặng.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timerId = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timerId);
  }, [secondsLeft]);

  function resolveZone(point: Point): Zone | null {
    const conflictRect = conflictZoneRef.current?.getBoundingClientRect();
    const notConflictRect = notConflictZoneRef.current?.getBoundingClientRect();
    if (conflictRect && isPointInRect(point, conflictRect)) return "conflict";
    if (notConflictRect && isPointInRect(point, notConflictRect)) return "not-conflict";
    return null;
  }

  const handleDragMove = (point: Point) => {
    const zone = resolveZone(point);
    setActiveZone((prev) => (prev === zone ? prev : zone));
  };

  const handleDragRelease = (point: Point) => {
    if (isBusy) return;
    const zone = resolveZone(point);
    setActiveZone(null);

    const correctZone: Zone = current.isConflict ? "conflict" : "not-conflict";

    if (zone === correctZone) {
      setIsBusy(true);
      setMatched(true);
      setFeedback(current.feedback);
      setShowBurst(true);
      sound.playCorrect();

      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);

      setTimeout(() => {
        setShowBurst(false);
        setFeedback(null);
        setMatched(false);
        if (index + 1 >= TOTAL_CARDS) {
          onComplete({ correctCount: newCorrectCount, totalCards: TOTAL_CARDS });
        } else {
          setIndex((i) => i + 1);
        }
        setIsBusy(false);
      }, ADVANCE_DELAY_MS);
      return;
    }

    setReturnSignal((n) => n + 1);
    if (zone) {
      sound.playIncorrect();
      setWrongHint(true);
      setTimeout(() => setWrongHint(false), WRONG_HINT_DURATION_MS);
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col gap-3 px-4 sm:max-w-2xl">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-sm font-bold text-white drop-shadow sm:text-base">
          Đã phân loại {correctCount}/{TOTAL_CARDS} thẻ
        </p>
        <Timer secondsLeft={secondsLeft} />
      </div>

      <div
        ref={panelRef}
        className="relative w-full rounded-3xl bg-white/95 p-4 shadow-2xl sm:p-6"
      >
        {showBurst && <ConfettiBurst />}

        <p className="mb-4 text-center text-sm font-semibold text-slate-500 sm:text-base">
          ✋ Kéo thẻ vào đúng khu vực nhé!
        </p>

        <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-4 sm:min-h-[220px] sm:flex-row sm:justify-between">
          <DropZone
            ref={conflictZoneRef}
            icon="🔥"
            label="Dễ gây mâu thuẫn"
            tone="conflict"
            isActive={activeZone === "conflict"}
          />

          <div className="flex w-full flex-1 items-center justify-center py-2">
            <AnimatePresence mode="wait">
              {!matched && (
                <DraggableSituationCard
                  key={current.id}
                  text={current.text}
                  disabled={isBusy}
                  returnSignal={returnSignal}
                  dragConstraints={panelRef}
                  onDragMove={handleDragMove}
                  onDragRelease={handleDragRelease}
                />
              )}
            </AnimatePresence>
          </div>

          <DropZone
            ref={notConflictZoneRef}
            icon="🤝"
            label="Không gây mâu thuẫn"
            tone="not-conflict"
            isActive={activeZone === "not-conflict"}
          />
        </div>

        <AnimatePresence>
          {wrongHint && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-center text-base font-semibold text-amber-600"
            >
              💡 Thử nghĩ lại xem nhé!
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-base font-semibold text-emerald-700 sm:text-lg"
            >
              🎉 {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
