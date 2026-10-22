import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect } from "react";

import { levels } from "@/data/levels";
import { KNITTING_DURATION } from "@/settings/rewardSettings";
import { useGameStore } from "@/store/gameStore";
import { patchworkStitchProgressUniforms } from "./patchworkMaterial";

export function usePatchworkStitching(levelIndex: number) {
  const stitchProgressUniform =
    patchworkStitchProgressUniforms[levels[levelIndex].piece];
  const isKnitting = useGameStore(
    (store) =>
      store.rewardBeat === "knit" && store.currentStationIndex === levelIndex,
  );

  useEffect(() => {
    stitchProgressUniform.value = 0;
  }, [stitchProgressUniform]);

  useGSAP(() => {
    if (!isKnitting) return;

    gsap.to(stitchProgressUniform, {
      value: 1,
      duration: KNITTING_DURATION,
      ease: "power1.inOut",
    });
  }, [isKnitting]);
}
