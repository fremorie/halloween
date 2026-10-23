import type { Vector3 } from "three";

import {
  CAT_CLOSE_UP_LOOK_AT_HEIGHT,
  LOOK_AT_HEIGHT,
  SOLVING_LOOK_AT_HEIGHT,
  WALKING_DROP,
  WALKING_LEAD,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";
import { getSolvingFocus } from "@/utils/journey";

export function setShotLookAt(
  shotLookAt: Vector3,
  shot: CameraShot,
  catPosition: Vector3,
  currentStationIndex: number,
) {
  if (shot === "catCloseUp") {
    shotLookAt.set(catPosition.x, CAT_CLOSE_UP_LOOK_AT_HEIGHT, catPosition.z);
    return;
  }
  if (shot === "puzzle") {
    const [focusX, focusZ] = getSolvingFocus(currentStationIndex);
    shotLookAt.set(focusX, SOLVING_LOOK_AT_HEIGHT, focusZ);
    return;
  }
  shotLookAt.set(
    catPosition.x,
    LOOK_AT_HEIGHT - WALKING_DROP,
    catPosition.z - WALKING_LEAD,
  );
}
