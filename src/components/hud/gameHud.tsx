"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

import { useGameStore } from "@/store/gameStore";
import { IntroTextBox } from "@/components/ui/introTextBox/introTextBox";
import { Button } from "@/components/ui/button/button";
import { levels } from "@/data/levels";
import { PuzzleInstructions } from "@/components/ui/puzzleInstructions/puzzleInstructions";
import { MARCELINOS_COMMENTS } from "@/settings/journeySettings";
import { Comment } from "@/components/ui/comment/comment";

const TouchJoystick = dynamic(
  () =>
    import("@/components/hud/touchJoystick").then(
      (touchJoystickModule) => touchJoystickModule.TouchJoystick,
    ),
  { ssr: false },
);

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
  const advanceRewardBeat = useGameStore((state) => state.advanceRewardBeat);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") cutThread();
      if (event.code === "KeyE") beginApproach();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cutThread, beginApproach]);

  const canCatWalk = mode === "walking" || mode === "done";

  return (
    <>
      {canCatWalk && <TouchJoystick />}
      {mode === "solving" && currentStationIndex === 0 && (
        <div className="pointer-events-none absolute top-4 left-4 flex flex-col items-center">
          <PuzzleInstructions />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-16 text-center">
        {rewardBeat === "speech" && (
          <>
            <Comment
              text={MARCELINOS_COMMENTS[levels[currentStationIndex].piece]}
            />
            <Button onClick={advanceRewardBeat}>Continue</Button>
          </>
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

        {mode === "done" && <Button onClick={restartGame}>Play again</Button>}
      </div>
    </>
  );
}
