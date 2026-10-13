import type { Vector3 } from "three";
import type { HeldControls } from "@/settings/controlsSettings";

export function getMoveDirection(keys: HeldControls, out: Vector3): Vector3 {
  return out
    .set(
      (keys.right ? 1 : 0) - (keys.left ? 1 : 0),
      0,
      (keys.backward ? 1 : 0) - (keys.forward ? 1 : 0),
    )
    .normalize();
}
