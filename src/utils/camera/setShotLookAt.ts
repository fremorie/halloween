import type { Vector3 } from "three";

import {
  BIRD_VIEW_LOOK_AT,
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
  if (shot === "birdView") {
    shotLookAt.set(...BIRD_VIEW_LOOK_AT);
    return;
  }

  if (shot === "catCloseUp") {
    shotLookAt.set(
      catPosition.x,
      catPosition.y + CAT_CLOSE_UP_LOOK_AT_HEIGHT,
      catPosition.z,
    );

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
