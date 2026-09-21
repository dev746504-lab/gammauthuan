"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAudioContext,
  playClickSound,
  playCorrectSound,
  playFanfareSound,
  playFlipSound,
  playIncorrectSound,
} from "@/lib/sound";

const STORAGE_KEY = "gqmt-sound-muted";

export function useSound() {
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // Đọc trạng thái đã lưu sau khi hydrate để tránh lệch nội dung server/client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== null) setMuted(saved === "true");
  }, []);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = getAudioContext();
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const play = useCallback(
    (fn: (ctx: AudioContext) => void) => {
      if (muted) return;
      try {
        fn(ensureContext());
      } catch {
        // Bỏ qua lỗi audio (trình duyệt chặn autoplay, không hỗ trợ, v.v.)
      }
    },
    [muted, ensureContext]
  );

  return {
    muted,
    toggleMuted,
    playFlip: () => play(playFlipSound),
    playCorrect: () => play(playCorrectSound),
    playIncorrect: () => play(playIncorrectSound),
    playFanfare: () => play(playFanfareSound),
    playClick: () => play(playClickSound),
  };
}
