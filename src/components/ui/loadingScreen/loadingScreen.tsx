"use client";

import { GameTitle } from "@/components/ui/gameTitile/gameTitle";
import { ProgressBar } from "@/components/ui/progressBar";

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F2EBDE] pb-[15vh]">
      <div className="flex flex-col">
        <GameTitle />
        <ProgressBar value={100} onStartClick={() => alert("start")} />
      </div>
    </div>
  );
}
