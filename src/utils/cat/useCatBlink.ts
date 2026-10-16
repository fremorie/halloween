import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import type { Mesh } from "three";

import {
  CAT_BLINK_HALF_DURATION,
  CAT_BLINK_INTERVAL,
  CAT_FIRST_BLINK_DELAY,
  CAT_LID_CLOSED_ROTATION_X,
} from "./constants";

export function useCatBlink(
  existingTopLids: Mesh | null = null,
  existingBottomLids: Mesh | null = null,
) {
  const topLidsRef = useRef<Mesh>(existingTopLids);
  const bottomLidsRef = useRef<Mesh>(existingBottomLids);

  useGSAP(() => {
    const topLids = topLidsRef.current;
    const bottomLids = bottomLidsRef.current;
    if (!topLids || !bottomLids) return;

    gsap
      .timeline({
        delay: CAT_FIRST_BLINK_DELAY,
        repeat: -1,
        repeatDelay: CAT_BLINK_INTERVAL,
      })
      .to([topLids.rotation, bottomLids.rotation], {
        x: CAT_LID_CLOSED_ROTATION_X,
        duration: CAT_BLINK_HALF_DURATION,
        ease: "power2.inOut",
        repeat: 1,
        yoyo: true,
      });
  });

  return { topLidsRef, bottomLidsRef };
}
