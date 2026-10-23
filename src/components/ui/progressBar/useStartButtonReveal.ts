import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

import { prefersReducedMotion } from "./prefersReducedMotion";

const COMPLETED_PROGRESS_BAR_HEIGHT = "4rem";
const PROGRESS_BAR_GROW_DURATION = 0.3;
const START_BUTTON_FADE_IN_DURATION = 0.5;

type StartButtonRevealOptions = {
  isProgressBarFilled: boolean;
  progressBarRef: RefObject<HTMLElement | null>;
  startButtonRef: RefObject<HTMLElement | null>;
};

export function useStartButtonReveal({
  isProgressBarFilled,
  progressBarRef,
  startButtonRef,
}: StartButtonRevealOptions) {
  useGSAP(
    () => {
      if (!isProgressBarFilled) return;

      const shouldSkipMotion = prefersReducedMotion();

      gsap
        .timeline()
        .to(progressBarRef.current, {
          height: COMPLETED_PROGRESS_BAR_HEIGHT,
          duration: shouldSkipMotion ? 0 : PROGRESS_BAR_GROW_DURATION,
          ease: "power2.out",
        })
        .to(startButtonRef.current, {
          autoAlpha: 1,
          duration: shouldSkipMotion ? 0 : START_BUTTON_FADE_IN_DURATION,
        });
    },
    { dependencies: [isProgressBarFilled] },
  );
}
