"use client";

import { useRef, useState } from "react";

import { ProgressBar } from "./progressBar";
import { StartButton } from "./startButton";
import { useStartButtonReveal } from "./useStartButtonReveal";

type ProgressBarWithStartButtonProps = {
  value: number;
  onStartClick: () => void;
};

export function ProgressBarWithStartButton({
  value,
  onStartClick,
}: ProgressBarWithStartButtonProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const [isProgressBarFilled, setIsProgressBarFilled] = useState(false);

  useStartButtonReveal({
    isProgressBarFilled,
    progressBarRef,
    startButtonRef,
  });

  return (
    <div className="relative">
      <ProgressBar
        ref={progressBarRef}
        value={value}
        onFilled={() => setIsProgressBarFilled(true)}
      />
      <div className="absolute inset-0">
        <StartButton ref={startButtonRef} onClick={onStartClick} />
      </div>
    </div>
  );
}
