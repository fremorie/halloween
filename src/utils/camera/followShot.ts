import { MathUtils, type Vector3 } from "three";

import {
  CAMERA_FOLLOW_SPEED,
  CAMERA_ZOOM_SPEED,
} from "@/settings/cameraSettings";
import type { CameraPose } from "@/types/camera";

export function followShotLookAt(
  pose: CameraPose,
  shotLookAt: Vector3,
  delta: number,
) {
  pose.lookAt.lerp(shotLookAt, 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta));
}

export function followShot(
  pose: CameraPose,
  shotLookAt: Vector3,
  shotZoom: number,
  shotHeightFactor: number,
  shotOrbitAngle: number,
  delta: number,
) {
  followShotLookAt(pose, shotLookAt, delta);
  pose.zoom = MathUtils.damp(pose.zoom, shotZoom, CAMERA_ZOOM_SPEED, delta);
  pose.heightFactor = MathUtils.damp(
    pose.heightFactor,
    shotHeightFactor,
    CAMERA_ZOOM_SPEED,
    delta,
  );
  pose.orbitAngle = MathUtils.damp(
    pose.orbitAngle,
    shotOrbitAngle,
    CAMERA_ZOOM_SPEED,
    delta,
  );
}
