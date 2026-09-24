"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import ConfettiBurst from "./ConfettiBurst";
import wordPairsData from "@/data/wordPairs.json";
import { useGameSound } from "./SoundProvider";
import type { Stage1Stats, WordCardData } from "@/lib/types";

const wordPairs = wordPairsData as WordCardData[];
const TOTAL_PAIRS = wordPairs.length / 2;

type DeckCard = WordCardData & { cardId: string };

function buildShuffledDeck(): DeckCard[] {
  const deck: DeckCard[] = wordPairs.map((card, index) => ({
    ...card,
    cardId: `${card.pairId}-${index}`,
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

type MemoryGameProps = {
  onComplete: (stats: Stage1Stats) => void;
};

export default function MemoryGame({ onComplete }: MemoryGameProps) {
  const [deck] = useState<DeckCard[]>(() => buildShuffledDeck());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const finishedRef = useRef(false);
  const sound = useGameSound();

  const isComplete = matchedPairIds.length === TOTAL_PAIRS;

  useEffect(() => {
    if (!isComplete || finishedRef.current) return;
    finishedRef.current = true;
    const t = setTimeout(() => {
      onComplete({ pairsFound: matchedPairIds.length, totalPairs: TOTAL_PAIRS });
    }, 700);
    return () => clearTimeout(t);
  }, [isComplete, matchedPairIds.length, onComplete]);

  const handleCardClick = (card: DeckCard) => {
    if (isLocked || flippedIds.includes(card.cardId) || matchedPairIds.includes(card.pairId)) return;
    sound.playFlip();
    const nextFlipped = [...flippedIds, card.cardId];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const first = deck.find((c) => c.cardId === nextFlipped[0])!;
      const second = deck.find((c) => c.cardId === nextFlipped[1])!;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setMatchedPairIds((prev) => [...prev, first.pairId]);
          setFlippedIds([]);
          setIsLocked(false);
          sound.playCorrect();
          setShowBurst(true);
          setTimeout(() => setShowBurst(false), 900);
        }, 350);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
          sound.playIncorrect();
        }, 1000);
      }
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col gap-3 px-4 sm:max-w-2xl">
      <p className="text-center text-sm font-bold text-white drop-shadow sm:text-base">
        Đã ghép {matchedPairIds.length}/{TOTAL_PAIRS} cặp
      </p>

      <div className="relative w-full rounded-3xl bg-white/95 p-3 shadow-2xl sm:p-4">
        {showBurst && <ConfettiBurst />}
        <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
          {deck.map((card, index) => (
            <Card
              key={card.cardId}
              label={String.fromCharCode(65 + index)}
              word={card.word}
              emoji={card.emoji}
              isFlipped={flippedIds.includes(card.cardId)}
              isMatched={matchedPairIds.includes(card.pairId)}
              disabled={isLocked}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
