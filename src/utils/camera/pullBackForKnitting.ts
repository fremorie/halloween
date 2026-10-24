import { gsap } from "gsap";
import { MathUtils, type Vector3 } from "three";

import {
  CAMERA_FOLLOW_SPEED,
  KNITTING_PULL_BACK_EASE,
  KNITTING_PULL_BACK_ZOOM,
} from "@/settings/cameraSettings";
import { REWARD_BEAT_DURATIONS } from "@/settings/rewardSettings";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";

import { followShotLookAt } from "./followShot";
import { getEasedProgress } from "./getEasedProgress";

const pullBackEase = gsap.parseEase(KNITTING_PULL_BACK_EASE);

export function pullBackForKnitting(
  pose: CameraPose,
  moveStart: ScriptedMoveStart,
  shotLookAt: Vector3,
  shotZoom: number,
  elapsedTime: number,
  delta: number,
) {
  const pullBackProgress = getEasedProgress(
    pullBackEase,
    elapsedTime - moveStart.elapsedTime,
    REWARD_BEAT_DURATIONS.knit,
  );

  followShotLookAt(pose, shotLookAt, CAMERA_FOLLOW_SPEED, delta);
  pose.zoom = MathUtils.lerp(
    moveStart.zoom,
    KNITTING_PULL_BACK_ZOOM * shotZoom,
    pullBackProgress,
  );
}
