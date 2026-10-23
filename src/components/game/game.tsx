"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { GameHud } from "@/components/hud/gameHud";
import { LoadingScreen } from "@/components/ui/loadingScreen/loadingScreen";

const Experience = dynamic(
  () =>
    import("@/components/experience/experience").then(
      (experienceModule) => experienceModule.Experience,
    ),
  { ssr: false },
);

export function Game() {
  const [isTitleIntroDone, setIsTitleIntroDone] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);

  return (
    <>
      <LoadingScreen
        isSceneReady={isSceneReady}
        onTitleIntroComplete={() => setIsTitleIntroDone(true)}
      />
      {isTitleIntroDone && (
        <Experience onSceneReady={() => setIsSceneReady(true)} />
      )}
      <GameHud />
    </>
  );
}
