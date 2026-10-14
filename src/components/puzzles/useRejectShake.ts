import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Group } from "three";

import {
  REJECT_SHAKE_DISTANCE,
  REJECT_SHAKE_DURATION,
  REJECT_SHAKE_WIGGLES,
} from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import { getWiggleEase } from "@/utils/animation/getWiggleEase";

export function useRejectShake(
  groupRef: RefObject<Group | null>,
  levelIndex: number,
  nodeId: number,
  restingX: number,
) {
  const lastRejection = useGameStore((store) => store.lastRejection);

  useGSAP(() => {
    const group = groupRef.current;
    const isRejectedNode =
      lastRejection?.levelIndex === levelIndex &&
      lastRejection.nodeId === nodeId;
    if (!group || !isRejectedNode) return;

    gsap.fromTo(
      group.position,
      { x: restingX },
      {
        x: restingX + REJECT_SHAKE_DISTANCE,
        duration: REJECT_SHAKE_DURATION,
        ease: getWiggleEase("puzzleNodeRejectShake", REJECT_SHAKE_WIGGLES),
      },
    );
  }, [lastRejection]);
}
