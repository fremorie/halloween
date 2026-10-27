import { useEffect, useState, type AnimationEvent } from "react";

import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";

const MOVEMENT_KEY_CODES = KEYBOARD_CONTROLS_MAP.flatMap(
  (control) => control.keys,
);

type HintPhase = "fadingIn" | "visible" | "leaving" | "gone";

export function useHintPhaseUntilFirstMove() {
  const [hintPhase, setHintPhase] = useState<HintPhase>("fadingIn");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!MOVEMENT_KEY_CODES.includes(event.code)) return;
      setHintPhase((currentPhase) => {
        if (currentPhase === "fadingIn") return "gone";
        if (currentPhase === "visible") return "leaving";
        return currentPhase;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAnimationEnd = (
    animationEvent: AnimationEvent<HTMLDivElement>,
  ) => {
    if (animationEvent.target !== animationEvent.currentTarget) return;
    if (hintPhase === "fadingIn") setHintPhase("visible");
    if (hintPhase === "leaving") setHintPhase("gone");
  };

  return { hintPhase, handleAnimationEnd };
}
