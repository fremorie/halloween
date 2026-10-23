"use client";

import { useProgress } from "@react-three/drei";
import { useState } from "react";

import { GameTitle } from "@/components/ui/gameTitile/gameTitle";
import { ProgressBar } from "@/components/ui/progressBar";

const LAST_PROGRESS_BEFORE_SCENE_READY = 99;

type LoadingScreenProps = {
  isSceneReady: boolean;
  onTitleIntroComplete: () => void;
};

export function LoadingScreen({
  isSceneReady,
  onTitleIntroComplete,
}: LoadingScreenProps) {
  const { progress } = useProgress();
  const [isStarted, setIsStarted] = useState(false);
  const displayedProgress = isSceneReady
    ? 100
    : Math.min(progress, LAST_PROGRESS_BEFORE_SCENE_READY);

  if (isStarted) return null;

  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#F2EBDE] pb-[15vh]">
      <div className="flex flex-col">
        <GameTitle onIntroComplete={onTitleIntroComplete} />
        <ProgressBar
          value={displayedProgress}
          onStartClick={() => setIsStarted(true)}
        />
      </div>
    </div>
  );
}
