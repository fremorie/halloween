import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

import { prefersReducedMotion } from "@/utils/animation/prefersReducedMotion";

const ERROR_MESSAGE_FADE_IN_DURATION = 0.3;
const ERROR_MESSAGE_VISIBLE_DURATION = 3;
const ERROR_MESSAGE_FADE_OUT_DURATION = 0.6;

type ErrorMessageFadeOptions = {
  errorMessageRef: RefObject<HTMLElement | null>;
  occurrence: object;
  isShowing: boolean;
};

export function useErrorMessageFade({
  errorMessageRef,
  occurrence,
  isShowing,
}: ErrorMessageFadeOptions) {
  useGSAP(
    () => {
      const shouldSkipMotion = prefersReducedMotion();
      const fadeOut = {
        autoAlpha: 0,
        duration: shouldSkipMotion ? 0 : ERROR_MESSAGE_FADE_OUT_DURATION,
        ease: "power1.in",
      };

      gsap.killTweensOf(errorMessageRef.current);

      if (!isShowing) {
        gsap.to(errorMessageRef.current, fadeOut);

        return;
      }

      gsap
        .timeline()
        .to(errorMessageRef.current, {
          autoAlpha: 1,
          duration: shouldSkipMotion ? 0 : ERROR_MESSAGE_FADE_IN_DURATION,
          ease: "power1.out",
        })
        .to(errorMessageRef.current, {
          ...fadeOut,
          delay: ERROR_MESSAGE_VISIBLE_DURATION,
        });
    },
    { dependencies: [occurrence, isShowing] },
  );
}
