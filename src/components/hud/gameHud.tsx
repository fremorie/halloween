"use client";

import { useEffect } from "react";

import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";

export function GameHud() {
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);
  const rejection = useGameStore((state) => state.rejection);
  const cutThread = useGameStore((state) => state.cutThread);
  const isNearStation = useGameStore((state) => state.isNearStation);
  const beginApproach = useGameStore((state) => state.beginApproach);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") cutThread();
      if (event.code === "KeyE") beginApproach();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cutThread, beginApproach]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center">
      {puzzlePhase === "won" && (
        <p className="text-4xl text-orange-700">Hooray!</p>
      )}

      {puzzlePhase === "drawing" && rejection && (
        <p className="opacity-70">{REFUSAL_MESSAGES[rejection.reason]}</p>
      )}

      {puzzlePhase === "drawing" && (
        <button
          type="button"
          onClick={cutThread}
          className="pointer-events-auto bg-white px-4 py-1.5 text-sm transition-colors hover:text-orange-500"
        >
          Reset (Esc)
        </button>
      )}

      {isNearStation && (
        <button
          type="button"
          onClick={beginApproach}
          className="pointer-events-auto bg-white px-6 py-2 text-xl text-orange-700 transition-colors hover:text-orange-500"
        >
          Start (E)
        </button>
      )}
    </div>
  );
}
