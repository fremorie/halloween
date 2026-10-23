import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

gsap.registerPlugin(SplitText);

const LETTER_RISE_DURATION = 0.9;
const LETTER_STAGGER = 0.04;

type TitleIntroOptions = {
  containerRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
  onIntroComplete?: () => void;
};

export function useTitleIntro({
  containerRef,
  titleRef,
  onIntroComplete,
}: TitleIntroOptions) {
  useGSAP(
    () => {
      gsap.set(containerRef.current, { visibility: "visible" });

      const motionQuery = gsap.matchMedia(containerRef);
      motionQuery.add("(prefers-reduced-motion: no-preference)", () => {
        const titleSplit = SplitText.create(titleRef.current, {
          type: "words,chars",
          mask: "chars",
        });
        gsap.set(titleSplit.masks, { padding: "0.2em", margin: "-0.2em" });

        gsap.timeline({ onComplete: onIntroComplete }).from(
          titleSplit.chars,
          {
            yPercent: 130,
            stagger: LETTER_STAGGER,
            duration: LETTER_RISE_DURATION,
            ease: "circ.inOut",
          },
          "doodleShown",
        );
      });
      motionQuery.add("(prefers-reduced-motion: reduce)", () =>
        onIntroComplete?.(),
      );
    },
    { scope: containerRef },
  );
}
