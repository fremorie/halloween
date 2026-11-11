import { BrushKeyCap } from "@/components/ui/brushKeyCap/brushKeyCap";
import { HintBox } from "@/components/ui/hintBox/hintBox";
import { FLY_KEY_CODES } from "@/settings/controlsSettings";

export function FlyHint() {
  return (
    <HintBox dismissKeyCodes={FLY_KEY_CODES}>
      <p className="relative flex min-w-90 items-center justify-center gap-2">
        Press <BrushKeyCap>shift</BrushKeyCap> to fly
      </p>
    </HintBox>
  );
}
