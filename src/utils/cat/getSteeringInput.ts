import { MathUtils, type Vector2 } from "three";
import type { HeldControls } from "@/settings/controlsSettings";

export function getSteeringInput(
  keys: HeldControls,
  joystickTilt: Vector2,
  out: Vector2,
): Vector2 {
  return out.set(
    MathUtils.clamp(
      (keys.right ? 1 : 0) - (keys.left ? 1 : 0) + joystickTilt.x,
      -1,
      1,
    ),
    MathUtils.clamp(
      (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0) + joystickTilt.y,
      -1,
      1,
    ),
  );
}
