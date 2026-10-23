import { gsap } from "gsap";
import { MathUtils, type Vector3 } from "three";

import {
  CAT_CLOSE_UP_EASE,
  CAT_CLOSE_UP_HEIGHT_FACTOR,
  CAT_CLOSE_UP_LOOK_AT_DURATION_FACTOR,
  CAT_CLOSE_UP_ORBIT_DEGREES,
  CAT_CLOSE_UP_ZOOM,
} from "@/settings/cameraSettings";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";

import { getEasedProgress } from "./getEasedProgress";

const pushInEase = gsap.parseEase(CAT_CLOSE_UP_EASE);
const lookAtEase = gsap.parseEase("power2.inOut");
const closeUpOrbitRadians = MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES);

export function pushInToCat(
  pose: CameraPose,
  moveStart: ScriptedMoveStart,
  catLookAt: Vector3,
  elapsedTime: number,
  pushInDuration: number,
) {
  const lookAtDuration = pushInDuration * CAT_CLOSE_UP_LOOK_AT_DURATION_FACTOR;
  const elapsedSinceMoveStart = elapsedTime - moveStart.elapsedTime;
  const pushInProgress = getEasedProgress(
    pushInEase,
    elapsedSinceMoveStart,
    pushInDuration,
  );
  const lookAtProgress = getEasedProgress(
    lookAtEase,
    elapsedSinceMoveStart,
    lookAtDuration,
  );

  pose.lookAt.lerpVectors(moveStart.lookAt, catLookAt, lookAtProgress);
  pose.zoom = MathUtils.lerp(moveStart.zoom, CAT_CLOSE_UP_ZOOM, pushInProgress);
  pose.heightFactor = MathUtils.lerp(
    moveStart.heightFactor,
    CAT_CLOSE_UP_HEIGHT_FACTOR,
    pushInProgress,
  );
  pose.orbitAngle = MathUtils.lerp(
    moveStart.orbitAngle,
    closeUpOrbitRadians,
    pushInProgress,
  );
}
