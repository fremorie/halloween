import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Euler, Group } from "three";

import {
  HOVER_LEAN,
  HOVER_SETTLE_DURATION,
  HOVER_TURN,
  HOVER_WOBBLE_ANGLE,
  HOVER_WOBBLE_DURATION,
  HOVER_WOBBLE_WIGGLES,
} from "@/settings/puzzleSettings";
import { getWiggleEase } from "@/utils/animation";

function leanTo(rotation: Euler, leanAngle: number, turnAngle: number) {
  gsap.to(rotation, {
    x: leanAngle,
    y: turnAngle,
    duration: HOVER_SETTLE_DURATION,
    ease: "expo.out",
    overwrite: "auto",
  });
}

function wobble(rotation: Euler) {
  gsap.fromTo(
    rotation,
    { z: 0 },
    {
      z: HOVER_WOBBLE_ANGLE,
      duration: HOVER_WOBBLE_DURATION,
      ease: getWiggleEase("puzzleNodeHoverWobble", HOVER_WOBBLE_WIGGLES),
    },
  );
}

export function useHoverAnimation(
  groupRef: RefObject<Group | null>,
  isHovered: boolean,
) {
  useGSAP(() => {
    const group = groupRef.current;
    if (!group) return;

    if (isHovered) {
      leanTo(group.rotation, HOVER_LEAN, HOVER_TURN);
      wobble(group.rotation);
    } else {
      leanTo(group.rotation, 0, 0);
    }
  }, [isHovered]);
}
