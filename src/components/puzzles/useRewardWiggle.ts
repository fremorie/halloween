import type { RefObject } from "react";
import type { Group } from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import {
  REWARD_WIGGLE_DISTANCE,
  REWARD_WIGGLE_WIGGLES,
} from "@/settings/puzzleSettings";
import { REWARD_BEAT_DURATIONS } from "@/settings/rewardSettings";
import { useGameStore } from "@/store/gameStore";
import { getWiggleEase } from "@/utils/animation";

export function useRewardWiggle(
  groupRef: RefObject<Group | null>,
  levelIndex: number,
) {
  const isWiggling = useGameStore(
    (store) =>
      store.rewardBeat === "wiggle" && store.currentStationIndex === levelIndex,
  );

  useGSAP(() => {
    const group = groupRef.current;
    if (!group || !isWiggling) return;

    gsap.fromTo(
      group.position,
      { x: 0 },
      {
        x: REWARD_WIGGLE_DISTANCE,
        duration: REWARD_BEAT_DURATIONS.wiggle,
        ease: getWiggleEase(
          "puzzleNodeRewardWiggle",
          REWARD_WIGGLE_WIGGLES,
          "uniform",
        ),
      },
    );
  }, [isWiggling]);
}
