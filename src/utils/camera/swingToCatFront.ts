import { gsap } from "gsap";
import { MathUtils, type Vector3 } from "three";

import {
  CAT_CLOSE_UP_HEIGHT_FACTOR,
  CAT_CLOSE_UP_ORBIT_DEGREES,
  CAT_CLOSE_UP_ZOOM,
  FINALE_TURN_AROUND_EASE,
} from "@/settings/cameraSettings";
import { FINALE_BEAT_DURATIONS } from "@/settings/finaleSettings";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";
import { getShortestAngleDifference } from "@/utils/animation";

import { getEasedProgress } from "./getEasedProgress";

const swingEase = gsap.parseEase(FINALE_TURN_AROUND_EASE);
const swingDuration = FINALE_BEAT_DURATIONS.landing;
const closeUpOrbitRadians = MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES);

export function swingToCatFront(
  pose: CameraPose,
  moveStart: ScriptedMoveStart,
  catLookAt: Vector3,
  elapsedTime: number,
) {
  const swingProgress = getEasedProgress(
    swingEase,
    elapsedTime - moveStart.elapsedTime,
    swingDuration,
  );
  const orbitSweep = getShortestAngleDifference(
    moveStart.orbitAngle,
    closeUpOrbitRadians,
  );

  pose.lookAt.copy(catLookAt);
  pose.orbitAngle = moveStart.orbitAngle + orbitSweep * swingProgress;
  pose.zoom = MathUtils.lerp(moveStart.zoom, CAT_CLOSE_UP_ZOOM, swingProgress);
  pose.heightFactor = MathUtils.lerp(
    moveStart.heightFactor,
    CAT_CLOSE_UP_HEIGHT_FACTOR,
    swingProgress,
  );
}
