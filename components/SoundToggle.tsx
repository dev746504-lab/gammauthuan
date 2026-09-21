"use client";

import { useGameSound } from "./SoundProvider";

export default function SoundToggle() {
  const { muted, toggleMuted } = useGameSound();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
      aria-pressed={muted}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl shadow-md transition hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
