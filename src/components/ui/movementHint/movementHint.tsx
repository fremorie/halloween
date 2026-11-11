import { ArrowKeysImg } from "@/components/ui/movementHint/arrowKeysImg";
import { HintBox } from "@/components/ui/hintBox/hintBox";
import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";

const MOVEMENT_KEY_CODES = KEYBOARD_CONTROLS_MAP.flatMap(
  (control) => control.keys,
);

export function MovementHint() {
  return (
    <HintBox dismissKeyCodes={MOVEMENT_KEY_CODES}>
      <p className="relative">Use arrow keys to move around</p>
      <ArrowKeysImg />
    </HintBox>
  );
}
