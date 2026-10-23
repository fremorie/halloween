import type { Vector3 } from "three";

import type { CameraPose } from "@/types/camera";

export function snapToShot(
  pose: CameraPose,
  shotLookAt: Vector3,
  shotZoom: number,
  shotHeightFactor: number,
) {
  pose.lookAt.copy(shotLookAt);
  pose.zoom = shotZoom;
  pose.heightFactor = shotHeightFactor;
}
