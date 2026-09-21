"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

type SoundContextValue = ReturnType<typeof useSound>;

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

export function useGameSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useGameSound phải được dùng bên trong SoundProvider");
  }
  return ctx;
}
