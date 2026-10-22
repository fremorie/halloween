import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect } from "react";

import { KNITTING_DURATION } from "@/settings/rewardSettings";
import { useGameStore } from "@/store/gameStore";
import { patchworkStitchProgressUniform } from "./patchworkMaterial";

export function usePatchworkStitching(levelIndex: number) {
  const isKnitting = useGameStore(
    (store) =>
      store.rewardBeat === "knit" && store.currentStationIndex === levelIndex,
  );

  useEffect(() => {
    patchworkStitchProgressUniform.value = 0;
  }, []);

  useGSAP(() => {
    if (!isKnitting) return;

    gsap.to(patchworkStitchProgressUniform, {
      value: 1,
      duration: KNITTING_DURATION,
      ease: "power1.inOut",
    });
  }, [isKnitting]);
}
