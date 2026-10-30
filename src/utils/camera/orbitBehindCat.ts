import { gsap } from "gsap";
import { MathUtils, type Vector3 } from "three";

import { FINALE_TURN_AROUND_EASE } from "@/settings/cameraSettings";
import { FINALE_BEAT_DURATIONS } from "@/settings/finaleSettings";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";
import { getShortestAngleDifference } from "@/utils/animation";

import { getEasedProgress } from "./getEasedProgress";

const turnAroundEase = gsap.parseEase(FINALE_TURN_AROUND_EASE);
const turnAroundDuration =
  FINALE_BEAT_DURATIONS.takeOff + FINALE_BEAT_DURATIONS.turnAround;

export function orbitBehindCat(
  pose: CameraPose,
  moveStart: ScriptedMoveStart,
  catLookAt: Vector3,
  chaseZoom: number,
  chaseHeightFactor: number,
  behindCatOrbitAngle: number,
  elapsedTime: number,
) {
  const turnAroundProgress = getEasedProgress(
    turnAroundEase,
    elapsedTime - moveStart.elapsedTime,
    turnAroundDuration,
  );
  const orbitSweep = getShortestAngleDifference(
    moveStart.orbitAngle,
    behindCatOrbitAngle,
  );

  pose.lookAt.copy(catLookAt);
  pose.orbitAngle = moveStart.orbitAngle + orbitSweep * turnAroundProgress;
  pose.zoom = MathUtils.lerp(moveStart.zoom, chaseZoom, turnAroundProgress);
  pose.heightFactor = MathUtils.lerp(
    moveStart.heightFactor,
    chaseHeightFactor,
    turnAroundProgress,
  );
}
