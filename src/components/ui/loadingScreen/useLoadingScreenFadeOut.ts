import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { RefObject } from "react";

import { prefersReducedMotion } from "@/components/ui/progressBar/prefersReducedMotion";

const LOADING_SCREEN_FADE_OUT_DURATION = 0.8;

type LoadingScreenFadeOutOptions = {
  isFadingOut: boolean;
  loadingScreenRef: RefObject<HTMLElement | null>;
  onFadedOut: () => void;
};

export function useLoadingScreenFadeOut({
  isFadingOut,
  loadingScreenRef,
  onFadedOut,
}: LoadingScreenFadeOutOptions) {
  useGSAP(
    () => {
      if (!isFadingOut) return;

      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: prefersReducedMotion() ? 0 : LOADING_SCREEN_FADE_OUT_DURATION,
        ease: "power1.inOut",
        onComplete: onFadedOut,
      });
    },
    { dependencies: [isFadingOut] },
  );
}
