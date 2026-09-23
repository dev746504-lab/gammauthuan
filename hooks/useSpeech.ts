"use client";

import { useCallback, useEffect, useState } from "react";
import { speakText, stopSpeaking } from "@/lib/speech";

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Ngừng đọc nếu component unmount (vd. chuyển sang tình huống khác) khi đang đọc dở.
  useEffect(() => stopSpeaking, []);

  const speak = useCallback((text: string) => {
    setIsSpeaking(true);
    speakText(text, () => setIsSpeaking(false));
  }, []);

  const stop = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  const toggle = useCallback(
    (text: string) => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, speak, stop]
  );

  return { speak, stop, toggle, isSpeaking };
}
