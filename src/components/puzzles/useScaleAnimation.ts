import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Group } from "three";

import {
  CURRENT_NODE_SCALE,
  NODE_SCALE_SETTLE_DURATION,
  VISITED_NODE_SCALE,
} from "@/settings/puzzleSettings";
import type { NodeState } from "@/types/puzzle";
import { uniformScale } from "@/utils/animation/uniformScale";

function getRestingScale(state: NodeState, isHovered: boolean) {
  if (state === "current") return CURRENT_NODE_SCALE;
  if (state === "visited" || isHovered) return VISITED_NODE_SCALE;
  return 1;
}

export function useScaleAnimation(
  groupRef: RefObject<Group | null>,
  state: NodeState,
  isHovered: boolean,
) {
  const restingScale = getRestingScale(state, isHovered);

  useGSAP(() => {
    const group = groupRef.current;
    if (!group) return;

    gsap.to(group.scale, {
      ...uniformScale(restingScale),
      duration: NODE_SCALE_SETTLE_DURATION,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [restingScale]);
}
