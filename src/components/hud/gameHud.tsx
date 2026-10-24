"use client";

import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";
import { IntroTextBox } from "@/components/ui/introTextBox/introTextBox";
import { Button } from "@/components/ui/button/button";
import { TextBox } from "@/components/ui/textBox/textBox";
import { levels } from "@/data/levels";
import { PuzzleInstructions } from "@/components/ui/puzzleInstructions/puzzleInstructions";

export function GameHud() {
  const mode = useGameStore((state) => state.mode);
  const finishIntro = useGameStore((state) => state.finishIntro);
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);
  const cutThread = useGameStore((state) => state.cutThread);
  const isNearStation = useGameStore((state) => state.isNearStation);
  const beginApproach = useGameStore((state) => state.beginApproach);
  const currentStationIndex = useGameStore(
    (state) => state.currentStationIndex,
  );
  const restartGame = useGameStore((state) => state.restartGame);
  const rewardBeat = useGameStore((state) => state.rewardBeat);
  const introBeat = useGameStore((state) => state.introBeat);

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
      {mode === "solving" && currentStationIndex === 0 && (
        <div className="pointer-events-none absolute top-4 left-4 flex flex-col items-center">
          <PuzzleInstructions />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-16 text-center">
        {rewardBeat === "speech" && (
          <TextBox>Nice {levels[currentStationIndex].piece}!</TextBox>
        )}

        {introBeat !== null && introBeat !== "flyIn" && <IntroTextBox />}

        {puzzlePhase === "drawing" && (
          <Button onClick={cutThread}>Reset (Esc)</Button>
        )}

        {introBeat !== null && introBeat !== "flyIn" && (
          <div className={introBeat === "askForHelp" ? "" : "invisible"}>
            <Button onClick={finishIntro}>
              {/* Cat: "Will you help me make a costume?" */}
              Sure, why not
            </Button>
          </div>
        )}

        {isNearStation && <Button onClick={beginApproach}>Start (E)</Button>}

        {mode === "walking" && !isNearStation && (
          <p className="opacity-70">
            {currentStationIndex === 0
              ? "Walk to the first piece"
              : "Walk to the next piece"}
          </p>
        )}

        {mode === "done" && <Button onClick={restartGame}>Play again</Button>}
      </div>
    </>
  );
}
