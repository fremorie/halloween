import type { Camera } from "three";

import { CAMERA_HEIGHT } from "@/settings/cameraSettings";
import type { CameraPose } from "@/types/camera";

export function placeCamera(
  camera: Camera,
  pose: CameraPose,
  solvingDistance: number,
) {
  const { lookAt, zoom, heightFactor, orbitAngle } = pose;
  const horizontalDistance = solvingDistance * zoom;

  camera.position.set(
    lookAt.x + Math.sin(orbitAngle) * horizontalDistance,
    lookAt.y + CAMERA_HEIGHT * heightFactor * zoom,
    lookAt.z + Math.cos(orbitAngle) * horizontalDistance,
  );
  camera.lookAt(lookAt);
}
