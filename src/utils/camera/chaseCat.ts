import { MathUtils, type Vector3 } from "three";

import { CAMERA_ZOOM_SPEED } from "@/settings/cameraSettings";
import type { CameraPose } from "@/types/camera";
import { dampAngle } from "@/utils/animation";

export function chaseCat(
  pose: CameraPose,
  catLookAt: Vector3,
  chaseZoom: number,
  chaseHeightFactor: number,
  behindCatOrbitAngle: number,
  delta: number,
) {
  pose.lookAt.copy(catLookAt);
  pose.zoom = MathUtils.damp(pose.zoom, chaseZoom, CAMERA_ZOOM_SPEED, delta);
  pose.heightFactor = MathUtils.damp(
    pose.heightFactor,
    chaseHeightFactor,
    CAMERA_ZOOM_SPEED,
    delta,
  );
  pose.orbitAngle = dampAngle(
    pose.orbitAngle,
    behindCatOrbitAngle,
    CAMERA_ZOOM_SPEED,
    delta,
  );
}
