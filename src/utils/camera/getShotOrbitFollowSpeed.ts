import {
  CAMERA_WALKING_ORBIT_FOLLOW_SPEED,
  CAMERA_ZOOM_SPEED,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

export function getShotOrbitFollowSpeed(shot: CameraShot) {
  return shot === "walking"
    ? CAMERA_WALKING_ORBIT_FOLLOW_SPEED
    : CAMERA_ZOOM_SPEED;
}
