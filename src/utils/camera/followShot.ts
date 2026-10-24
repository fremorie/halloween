import { MathUtils, type Vector3 } from "three";

import { CAMERA_ZOOM_SPEED } from "@/settings/cameraSettings";
import type { CameraPose } from "@/types/camera";

export function followShotLookAt(
  pose: CameraPose,
  shotLookAt: Vector3,
  followSpeed: number,
  delta: number,
) {
  pose.lookAt.lerp(shotLookAt, 1 - Math.exp(-followSpeed * delta));
}

export function followShot(
  pose: CameraPose,
  shotLookAt: Vector3,
  shotZoom: number,
  shotHeightFactor: number,
  shotOrbitAngle: number,
  followSpeed: number,
  delta: number,
) {
  followShotLookAt(pose, shotLookAt, followSpeed, delta);
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
