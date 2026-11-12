import { useEffect, useState, type AnimationEvent } from "react";

type HintPhase = "fadingIn" | "visible" | "leaving" | "gone";

export function useHintPhaseUntilKeyPress(dismissKeyCodes: string[]) {
  const [hintPhase, setHintPhase] = useState<HintPhase>("fadingIn");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dismissKeyCodes.includes(event.code)) return;
      setHintPhase((currentPhase) => {
        if (currentPhase === "fadingIn") return "gone";
        if (currentPhase === "visible") return "leaving";
        return currentPhase;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismissKeyCodes]);

  const handleAnimationEnd = (
    animationEvent: AnimationEvent<HTMLDivElement>,
  ) => {
    if (animationEvent.target !== animationEvent.currentTarget) return;
    if (hintPhase === "fadingIn") setHintPhase("visible");
    if (hintPhase === "leaving") setHintPhase("gone");
  };

  return { hintPhase, handleAnimationEnd };
}
