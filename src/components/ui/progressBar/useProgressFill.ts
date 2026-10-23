import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

import { prefersReducedMotion } from "@/utils/animation/prefersReducedMotion";

const FILL_DURATION = 0.4;
const FULL_PROGRESS_VALUE = 100;

type ProgressFillOptions = {
  value: number;
  indicatorRef: RefObject<HTMLElement | null>;
  onFilled: () => void;
};

export function useProgressFill({
  value,
  indicatorRef,
  onFilled,
}: ProgressFillOptions) {
  useGSAP(
    () => {
      gsap.to(indicatorRef.current, {
        width: `${value}%`,
        duration: prefersReducedMotion() ? 0 : FILL_DURATION,
        ease: "power1.out",
        overwrite: "auto",
        onComplete: value >= FULL_PROGRESS_VALUE ? onFilled : undefined,
      });
    },
    { dependencies: [value] },
  );
}
