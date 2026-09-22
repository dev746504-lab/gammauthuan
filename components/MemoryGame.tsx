"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";
import Timer from "./Timer";
import TeamScoreboard from "./TeamScoreboard";
import TeamPicker from "./TeamPicker";
import ConfettiBurst from "./ConfettiBurst";
import wordPairsData from "@/data/wordPairs.json";
import { useGameSound } from "./SoundProvider";
import type { Stage1Stats, WordCardData } from "@/lib/types";

const GAME_DURATION_SECONDS = 300;

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
  teamScores: number[];
  onTeamScored: (teamId: number) => void;
  onComplete: (stats: Stage1Stats) => void;
};

export default function MemoryGame({ teamScores, onTeamScored, onComplete }: MemoryGameProps) {
  const [deck] = useState<DeckCard[]>(() => buildShuffledDeck());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(GAME_DURATION_SECONDS);
  const [isLocked, setIsLocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState<number | null>(null);
  const finishedRef = useRef(false);
  const sound = useGameSound();

  const isComplete = matchedPairIds.length === TOTAL_PAIRS;

  const finishGame = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete({
      pairsFound: matchedPairIds.length,
      totalPairs: TOTAL_PAIRS,
      timeUsedSeconds: GAME_DURATION_SECONDS - secondsLeft,
    });
  }, [matchedPairIds.length, secondsLeft, onComplete]);

  useEffect(() => {
    if (isComplete || secondsLeft <= 0) return;
    const timerId = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, [isComplete, secondsLeft]);

  useEffect(() => {
    if (!isComplete && secondsLeft > 0) return;
    const delay = isComplete ? 700 : 0;
    const t = setTimeout(finishGame, delay);
    return () => clearTimeout(t);
  }, [isComplete, secondsLeft, finishGame]);

  const handleCardClick = (card: DeckCard) => {
    if (activeTeamId === null) return;
    if (isLocked || flippedIds.includes(card.cardId) || matchedPairIds.includes(card.pairId)) return;
    sound.playFlip();
    const nextFlipped = [...flippedIds, card.cardId];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const first = deck.find((c) => c.cardId === nextFlipped[0])!;
      const second = deck.find((c) => c.cardId === nextFlipped[1])!;
      const scoringTeamId = activeTeamId;

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setMatchedPairIds((prev) => [...prev, first.pairId]);
          onTeamScored(scoringTeamId);
          setFlippedIds([]);
          setIsLocked(false);
          sound.playCorrect();
          setShowBurst(true);
          setTimeout(() => setShowBurst(false), 900);
          // Ghép đúng -> đội này được lật tiếp, không đổi lượt.
        }, 350);
      } else {
        setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
          sound.playIncorrect();
          setActiveTeamId(null); // Sai -> chuyển lượt, chọn đội khác.
        }, 1000);
      }
    }
  };

  return (
    <div className="relative mx-auto flex w-full max-w-xl flex-col gap-3 px-4 sm:max-w-2xl">
      <div className="flex w-full flex-col gap-2">
        <TeamScoreboard scores={teamScores} activeTeamId={activeTeamId} />
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-white drop-shadow sm:text-base">
            Đã ghép {matchedPairIds.length}/{TOTAL_PAIRS} cặp
          </p>
          <Timer secondsLeft={secondsLeft} />
        </div>
      </div>

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
              disabled={isLocked || activeTeamId === null}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        {activeTeamId === null && !isComplete && (
          <div className="absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-white/90 p-4">
            <TeamPicker prompt="Đội nào lật thẻ?" onSelectTeam={setActiveTeamId} />
          </div>
        )}
      </div>
    </div>
  );
}
