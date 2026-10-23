import { gsap } from "gsap";
import { MathUtils, type Vector3 } from "three";

import {
  CAT_CLOSE_UP_HEIGHT_FACTOR,
  CAT_CLOSE_UP_ORBIT_DEGREES,
  CAT_CLOSE_UP_ZOOM,
  INTRO_FLY_IN_LANDING_EASE,
  INTRO_FLY_IN_LANDING_START_FACTOR,
  INTRO_FLY_IN_ORBIT_EASE,
} from "@/settings/cameraSettings";
import { INTRO_BEAT_DURATIONS } from "@/settings/introSettings";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";

import { getEasedProgress } from "./getEasedProgress";

const orbitEase = gsap.parseEase(INTRO_FLY_IN_ORBIT_EASE);
const landingEase = gsap.parseEase(INTRO_FLY_IN_LANDING_EASE);
const closeUpOrbitRadians = MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES);
const flyInDuration = INTRO_BEAT_DURATIONS.flyIn;
const landingStartTime = flyInDuration * INTRO_FLY_IN_LANDING_START_FACTOR;
const landingDuration = flyInDuration - landingStartTime;

export function flyInToCat(
  pose: CameraPose,
  moveStart: ScriptedMoveStart,
  catLookAt: Vector3,
  elapsedTime: number,
) {
  const elapsedSinceMoveStart = elapsedTime - moveStart.elapsedTime;
  const orbitProgress = getEasedProgress(
    orbitEase,
    elapsedSinceMoveStart,
    flyInDuration,
  );
  const landingProgress = getEasedProgress(
    landingEase,
    elapsedSinceMoveStart - landingStartTime,
    landingDuration,
  );

  pose.orbitAngle = MathUtils.lerp(
    moveStart.orbitAngle,
    closeUpOrbitRadians,
    orbitProgress,
  );
  pose.heightFactor = MathUtils.lerp(
    moveStart.heightFactor,
    CAT_CLOSE_UP_HEIGHT_FACTOR,
    orbitProgress,
  );
  pose.lookAt.lerpVectors(moveStart.lookAt, catLookAt, landingProgress);
  pose.zoom = MathUtils.lerp(
    moveStart.zoom,
    CAT_CLOSE_UP_ZOOM,
    landingProgress,
  );
}
