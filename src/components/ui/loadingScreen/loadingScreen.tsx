"use client";

import { useProgress } from "@react-three/drei";
import { useState } from "react";

import { GameTitle } from "@/components/ui/gameTitile/gameTitle";
import { ProgressBar } from "@/components/ui/progressBar";

type LoadingScreenProps = {
  onTitleIntroComplete: () => void;
};

export function LoadingScreen({ onTitleIntroComplete }: LoadingScreenProps) {
  const { progress } = useProgress();
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted) return null;

  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#F2EBDE] pb-[15vh]">
      <div className="flex flex-col">
        <GameTitle onIntroComplete={onTitleIntroComplete} />
        <ProgressBar value={progress} onStartClick={() => setIsStarted(true)} />
      </div>
    </div>
  );
}
