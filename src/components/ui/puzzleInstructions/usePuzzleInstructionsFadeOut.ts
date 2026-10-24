import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

import { prefersReducedMotion } from "@/utils/animation/prefersReducedMotion";

const PUZZLE_INSTRUCTIONS_FADE_OUT_DURATION = 0.5;

type PuzzleInstructionsFadeOutOptions = {
  isVisible: boolean;
  puzzleInstructionsRef: RefObject<HTMLElement | null>;
};

export function usePuzzleInstructionsFadeOut({
  isVisible,
  puzzleInstructionsRef,
}: PuzzleInstructionsFadeOutOptions) {
  useGSAP(
    () => {
      if (isVisible) return;

      gsap.to(puzzleInstructionsRef.current, {
        autoAlpha: 0,
        duration: prefersReducedMotion()
          ? 0
          : PUZZLE_INSTRUCTIONS_FADE_OUT_DURATION,
        ease: "power1.inOut",
      });
    },
    { dependencies: [isVisible] },
  );
}
