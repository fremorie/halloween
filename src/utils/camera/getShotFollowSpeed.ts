import {
  CAMERA_FOLLOW_SPEED,
  TOUCH_SCREEN_WALKING_FOLLOW_SPEED,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

export function getShotFollowSpeed(shot: CameraShot, isTouchDevice: boolean) {
  return shot === "walking" && isTouchDevice
    ? TOUCH_SCREEN_WALKING_FOLLOW_SPEED
    : CAMERA_FOLLOW_SPEED;
}
