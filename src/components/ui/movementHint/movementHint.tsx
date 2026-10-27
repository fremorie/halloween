import { alef } from "@/components/ui/fonts/fonts";
import { BrushStroke } from "@/components/ui/textBox/brushStroke";
import { ArrowKeysImg } from "@/components/ui/movementHint/arrowKeysImg";
import { useHintPhaseUntilFirstMove } from "@/components/ui/movementHint/useHintPhaseUntilFirstMove";
import { isTouchScreen } from "@/utils/isTouchScreen";

export function MovementHint() {
  const { hintPhase, handleAnimationEnd } = useHintPhaseUntilFirstMove();

  if (hintPhase === "gone" || isTouchScreen()) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center">
      <div
        aria-live="polite"
        onAnimationEnd={handleAnimationEnd}
        className={`${alef.className} relative flex items-center gap-4 overflow-hidden border-2 border-black bg-background px-5 py-3 text-lg text-neutral-900 ${
          hintPhase === "leaving"
            ? "animate-movement-hint-fade-out"
            : "animate-movement-hint-fade-in"
        }`}
      >
        <BrushStroke color="yellow" className="-top-2 -left-3 h-5.75" />
        <BrushStroke color="yellow" className="-right-3 -bottom-2 h-5.75" />
        <p className="relative">Use arrow keys to move around</p>
        <ArrowKeysImg />
      </div>
    </div>
  );
}
