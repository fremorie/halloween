import { type RefObject, useRef } from "react";
import { type Group, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

import { useGameStore } from "@/store/gameStore";
import type { FinaleBeat } from "@/types/finale";
import {
  FINALE_BEAT_DURATIONS,
  FINALE_HOVER_HEIGHT,
  FINALE_TAKE_OFF_EASE,
} from "@/settings/finaleSettings";
import { getEasedProgress } from "@/utils/camera/getEasedProgress";

const takeOffEase = gsap.parseEase(FINALE_TAKE_OFF_EASE);

export function useCatFlight(rootRef: RefObject<Group | null>) {
  const currentBeatStartRef = useRef<{
    beat: FinaleBeat | null;
    elapsedTime: number;
  }>({ beat: null, elapsedTime: 0 });

  useFrame(({ clock }) => {
    const root = rootRef.current;
    const { mode, finaleBeat, catPosition } = useGameStore.getState();
    if (!root || mode !== "finale") {
      return;
    }

    const currentBeatStart = currentBeatStartRef.current;
    if (currentBeatStart.beat !== finaleBeat) {
      currentBeatStart.beat = finaleBeat;
      currentBeatStart.elapsedTime = clock.elapsedTime;
    }

    const elapsedSinceBeatStart =
      clock.elapsedTime - currentBeatStart.elapsedTime;

    if (finaleBeat === "takeOff") {
      const takeOffProgress = getEasedProgress(
        takeOffEase,
        elapsedSinceBeatStart,
        FINALE_BEAT_DURATIONS.takeOff,
      );
      root.position.y = MathUtils.lerp(0, FINALE_HOVER_HEIGHT, takeOffProgress);
    }

    catPosition.copy(root.position);
  });
}
