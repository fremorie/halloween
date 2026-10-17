"use client";

import { useRef, useState } from "react";

import { ProgressBar } from "@/app/(experiments)/ui/progress-bar/progressBar";
import { StartButton } from "@/app/(experiments)/ui/progress-bar/startButton";
import { useStartButtonReveal } from "@/app/(experiments)/ui/progress-bar/useStartButtonReveal";

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
