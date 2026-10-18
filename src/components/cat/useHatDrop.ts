import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";
import type { Group } from "three";

import { HAT_DROP_DURATION, HAT_DROP_HEIGHT } from "@/settings/rewardSettings";

export function useHatDrop(hatGroupRef: RefObject<Group | null>) {
  useGSAP(() => {
    const hatGroup = hatGroupRef.current;
    if (!hatGroup) return;

    gsap.from(hatGroup.position, {
      y: HAT_DROP_HEIGHT,
      duration: HAT_DROP_DURATION,
      ease: "bounce.out",
    });
  }, []);
}
