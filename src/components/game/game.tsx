"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { GameHud } from "@/components/hud/gameHud";
import { LoadingScreen } from "@/components/ui/loadingScreen/loadingScreen";
import { useGameStore } from "@/store/gameStore";

const Experience = dynamic(
  () =>
    import("@/components/experience/experience").then(
      (experienceModule) => experienceModule.Experience,
    ),
  { ssr: false },
);

export function Game() {
  const startIntro = useGameStore((state) => state.startIntro);
  const [isTitleIntroDone, setIsTitleIntroDone] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);

  return (
    <>
      <LoadingScreen
        isSceneReady={isSceneReady}
        onTitleIntroComplete={() => setIsTitleIntroDone(true)}
        onStart={startIntro}
      />
      {isTitleIntroDone && (
        <Experience onSceneReady={() => setIsSceneReady(true)} />
      )}
      <GameHud />
    </>
  );
}
