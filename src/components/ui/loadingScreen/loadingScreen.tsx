"use client";

import { useProgress } from "@react-three/drei";
import { useRef, useState } from "react";

import { GameTitle } from "@/components/ui/gameTitile/gameTitle";
import { ProgressBar } from "@/components/ui/progressBar";
import { useLoadingScreenFadeOut } from "./useLoadingScreenFadeOut";

const LAST_PROGRESS_BEFORE_SCENE_READY = 99;

type Props = {
  isSceneReady: boolean;
  onTitleIntroComplete: () => void;
  onStart: () => void;
};

export function LoadingScreen({
  isSceneReady,
  onTitleIntroComplete,
  onStart,
}: Props) {
  const { progress } = useProgress();
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const displayedProgress = isSceneReady
    ? 100
    : Math.min(progress, LAST_PROGRESS_BEFORE_SCENE_READY);

  useLoadingScreenFadeOut({
    isFadingOut,
    loadingScreenRef,
    onFadedOut: () => setIsStarted(true),
  });

  if (isStarted) return null;

  return (
    <div
      ref={loadingScreenRef}
      className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#F2EBDE] pb-[15vh]"
    >
      <div className="flex flex-col">
        <GameTitle onIntroComplete={onTitleIntroComplete} />
        <ProgressBar
          value={displayedProgress}
          onStartClick={() => {
            setIsFadingOut(true);
            onStart();
          }}
        />
      </div>
    </div>
  );
}
