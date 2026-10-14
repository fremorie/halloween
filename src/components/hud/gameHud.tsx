"use client";

import { useGameStore } from "@/store/gameStore";

export function GameHud() {
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);
  const puzzleMessage = useGameStore((state) => state.puzzleMessage);
  const cutThread = useGameStore((state) => state.cutThread);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center">
      {puzzlePhase === "won" && (
        <p className="text-4xl text-orange-700">Hooray!</p>
      )}

      {puzzlePhase === "drawing" && puzzleMessage && (
        <p className="opacity-70">{puzzleMessage}</p>
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
    </div>
  );
}
