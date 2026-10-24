import { type Camera, MathUtils } from "three";

import {
  CAMERA_FIT_MARGIN,
  CAMERA_FIT_RADIUS,
  CAMERA_FOV,
  CAMERA_HEIGHT,
} from "@/settings/cameraSettings";
import type { CameraPose } from "@/types/camera";

const CAMERA_DISTANCE =
  (CAMERA_FIT_RADIUS / Math.tan(MathUtils.degToRad(CAMERA_FOV / 2))) *
  CAMERA_FIT_MARGIN;

export function placeCamera(camera: Camera, pose: CameraPose) {
  const { lookAt, zoom, heightFactor, orbitAngle } = pose;
  const horizontalDistance = CAMERA_DISTANCE * zoom;

  camera.position.set(
    lookAt.x + Math.sin(orbitAngle) * horizontalDistance,
    lookAt.y + CAMERA_HEIGHT * heightFactor * zoom,
    lookAt.z + Math.cos(orbitAngle) * horizontalDistance,
  );
  camera.lookAt(lookAt);
}
