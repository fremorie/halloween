import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Group } from "three";

import {
  VISITED_NODE_SCALE,
  WIN_HOP_DURATION,
  WIN_HOP_HEIGHT,
  WIN_HOP_STAGGER,
  WIN_NODE_SCALE,
} from "@/settings/puzzleSettings";
import { uniformScale } from "@/utils/animation";

const WIN_HOP_HALF_DURATION = WIN_HOP_DURATION / 2;

export function useCelebrationHop(
  groupRef: RefObject<Group | null>,
  isCelebrating: boolean,
  pathOrder: number,
  restingY: number,
) {
  useGSAP(() => {
    const group = groupRef.current;
    if (!group || !isCelebrating) return;

    gsap
      .timeline({ delay: pathOrder * WIN_HOP_STAGGER })
      .to(group.position, {
        y: restingY + WIN_HOP_HEIGHT,
        duration: WIN_HOP_HALF_DURATION,
        ease: "sine.out",
        yoyo: true,
        repeat: 1,
      })
      .to(
        group.scale,
        {
          ...uniformScale(WIN_NODE_SCALE),
          duration: WIN_HOP_HALF_DURATION,
          ease: "sine.out",
          overwrite: "auto",
        },
        0,
      )
      .to(
        group.scale,
        {
          ...uniformScale(VISITED_NODE_SCALE),
          duration: WIN_HOP_HALF_DURATION,
          ease: "sine.in",
        },
        WIN_HOP_HALF_DURATION,
      );
  }, [isCelebrating]);
}
