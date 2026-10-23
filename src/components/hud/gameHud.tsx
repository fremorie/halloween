"use client";

import { useEffect } from "react";

import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";

export function GameHud() {
  const mode = useGameStore((state) => state.mode);
  const finishIntro = useGameStore((state) => state.finishIntro);
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);
  const rejection = useGameStore((state) => state.rejection);
  const cutThread = useGameStore((state) => state.cutThread);
  const isNearStation = useGameStore((state) => state.isNearStation);
  const beginApproach = useGameStore((state) => state.beginApproach);
  const currentStationIndex = useGameStore(
    (state) => state.currentStationIndex,
  );
  const restartGame = useGameStore((state) => state.restartGame);
  const rewardBeat = useGameStore((state) => state.rewardBeat);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") cutThread();
      if (event.code === "KeyE") beginApproach();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cutThread, beginApproach]);

  return (
    <>
      {mode === "solving" && (
        <div className="pointer-events-none absolute inset-x-0 top-4 flex flex-col items-center text-center">
          <p className="max-w-72 text-sm opacity-70">
            Visit every edge exactly once.
            <br />
            Click a yarn ball to start.
          </p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center">
        {rewardBeat && <p className="text-xl">{rewardBeat}</p>}
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

        {mode === "intro" && (
          <button
            type="button"
            onClick={finishIntro}
            className="pointer-events-auto bg-white px-6 py-2 text-xl"
          >
            {/* Cat: "Will you help me make a costume?" */}
            Sure, why not
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

        {mode === "walking" && !isNearStation && (
          <p className="opacity-70">
            {currentStationIndex === 0
              ? "Walk to the first piece"
              : "Walk to the next piece"}
          </p>
        )}

        {mode === "done" && (
          <button
            type="button"
            onClick={restartGame}
            className="pointer-events-auto bg-white px-6 py-2 text-xl text-orange-700 transition-colors hover:text-orange-500"
          >
            Play again
          </button>
        )}
      </div>
    </>
  );
}
