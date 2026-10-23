import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

import {
  CAMERA_FIT_MARGIN,
  CAMERA_FIT_RADIUS,
  CAMERA_FOLLOW_SPEED,
  CAMERA_FOV,
  CAMERA_HEIGHT,
  CAMERA_ZOOM_SPEED,
  CAT_CLOSE_UP_EASE,
  CAT_CLOSE_UP_HEIGHT_FACTOR,
  CAT_CLOSE_UP_LOOK_AT_DURATION_FACTOR,
  CAT_CLOSE_UP_LOOK_AT_HEIGHT,
  CAT_CLOSE_UP_ORBIT_DEGREES,
  CAT_CLOSE_UP_ZOOM,
  KNITTING_PULL_BACK_EASE,
  KNITTING_PULL_BACK_ZOOM,
  LOOK_AT_HEIGHT,
  SOLVING_HALF_WIDTH,
  SOLVING_LOOK_AT_HEIGHT,
  WALKING_DROP,
  WALKING_LEAD,
  WALKING_ZOOM,
} from "@/settings/cameraSettings";
import { useGameStore } from "@/store/gameStore";
import { getSolvingFocus } from "@/utils/journey";
import {
  CAT_CLOSE_UP_BEATS,
  REWARD_BEAT_DURATIONS,
} from "@/settings/rewardSettings";

const closeUpEase = gsap.parseEase(CAT_CLOSE_UP_EASE);
const closeUpLookAtEase = gsap.parseEase("power2.inOut");
const knittingPullBackEase = gsap.parseEase(KNITTING_PULL_BACK_EASE);
const closeUpOrbitRadians = MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES);

type ScriptedMovePhase = "knittingPullBack" | "catCloseUp";

type ScriptedMoveStart = {
  phase: ScriptedMovePhase;
  elapsedTime: number;
  zoom: number;
  target: Vector3;
};

function getScriptedMovePhase(
  isFramingCatCloseUp: boolean,
  isKnitting: boolean,
): ScriptedMovePhase | null {
  if (isFramingCatCloseUp) return "catCloseUp";
  if (isKnitting) return "knittingPullBack";
  return null;
}

function getGoalZoom(isFramingCatCloseUp: boolean, isFramingPuzzle: boolean) {
  if (isFramingCatCloseUp) return CAT_CLOSE_UP_ZOOM;
  if (isFramingPuzzle) return 1;
  return WALKING_ZOOM;
}

function getProgress(elapsedSinceStart: number, duration: number) {
  return MathUtils.clamp(elapsedSinceStart / duration, 0, 1);
}

export function CameraRig() {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const [rig] = useState(() => ({
    goal: new Vector3(),
    target: new Vector3(),
  }));
  const zoomRef = useRef(1);
  const heightFactorRef = useRef(1);
  const orbitAngleRef = useRef(0);
  const placedRef = useRef(false);
  const scriptedMoveStartRef = useRef<ScriptedMoveStart | null>(null);

  const halfHeight = Math.tan(MathUtils.degToRad(CAMERA_FOV / 2));
  const solvingDistance =
    Math.max(
      CAMERA_FIT_RADIUS / halfHeight,
      SOLVING_HALF_WIDTH / (halfHeight * aspect),
    ) * CAMERA_FIT_MARGIN;

  useFrame(({ camera, clock }, delta) => {
    const { catPosition, mode, currentStationIndex, rewardBeat } =
      useGameStore.getState();
    const isFramingCatCloseUp =
      rewardBeat !== null && CAT_CLOSE_UP_BEATS.includes(rewardBeat);
    const isFramingPuzzle =
      mode === "approaching" || mode === "solving" || mode === "rewarding";

    if (isFramingCatCloseUp) {
      rig.goal.set(catPosition.x, CAT_CLOSE_UP_LOOK_AT_HEIGHT, catPosition.z);
    } else if (isFramingPuzzle) {
      const [focusX, focusZ] = getSolvingFocus(currentStationIndex);
      rig.goal.set(focusX, SOLVING_LOOK_AT_HEIGHT, focusZ);
    } else {
      rig.goal.set(
        catPosition.x,
        LOOK_AT_HEIGHT - WALKING_DROP,
        catPosition.z - WALKING_LEAD,
      );
    }
    const goalZoom = getGoalZoom(isFramingCatCloseUp, isFramingPuzzle);

    const scriptedMovePhase = getScriptedMovePhase(
      isFramingCatCloseUp,
      rewardBeat === "knit",
    );

    if (scriptedMovePhase === null) {
      scriptedMoveStartRef.current = null;
    } else if (scriptedMoveStartRef.current?.phase !== scriptedMovePhase) {
      scriptedMoveStartRef.current = {
        phase: scriptedMovePhase,
        elapsedTime: clock.elapsedTime,
        zoom: zoomRef.current,
        target: rig.target.clone(),
      };
    }

    const scriptedMoveStart = scriptedMoveStartRef.current;

    if (scriptedMoveStart?.phase === "knittingPullBack") {
      const easedPullBackProgress = knittingPullBackEase(
        getProgress(
          clock.elapsedTime - scriptedMoveStart.elapsedTime,
          REWARD_BEAT_DURATIONS.knit,
        ),
      );

      rig.target.lerp(rig.goal, 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta));
      zoomRef.current = MathUtils.lerp(
        scriptedMoveStart.zoom,
        KNITTING_PULL_BACK_ZOOM,
        easedPullBackProgress,
      );
    } else if (scriptedMoveStart?.phase === "catCloseUp") {
      const closeUpStart = scriptedMoveStart;
      const elapsedSinceCloseUpStart =
        clock.elapsedTime - closeUpStart.elapsedTime;
      const easedCloseUpProgress = closeUpEase(
        getProgress(elapsedSinceCloseUpStart, REWARD_BEAT_DURATIONS.zoomIn),
      );
      const easedLookAtProgress = closeUpLookAtEase(
        getProgress(
          elapsedSinceCloseUpStart,
          REWARD_BEAT_DURATIONS.zoomIn * CAT_CLOSE_UP_LOOK_AT_DURATION_FACTOR,
        ),
      );

      rig.target.lerpVectors(
        closeUpStart.target,
        rig.goal,
        easedLookAtProgress,
      );
      zoomRef.current = MathUtils.lerp(
        closeUpStart.zoom,
        CAT_CLOSE_UP_ZOOM,
        easedCloseUpProgress,
      );
      heightFactorRef.current = MathUtils.lerp(
        1,
        CAT_CLOSE_UP_HEIGHT_FACTOR,
        easedCloseUpProgress,
      );
      orbitAngleRef.current = closeUpOrbitRadians * easedCloseUpProgress;
    } else if (placedRef.current) {
      rig.target.lerp(rig.goal, 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta));
      zoomRef.current = MathUtils.damp(
        zoomRef.current,
        goalZoom,
        CAMERA_ZOOM_SPEED,
        delta,
      );
      heightFactorRef.current = MathUtils.damp(
        heightFactorRef.current,
        1,
        CAMERA_ZOOM_SPEED,
        delta,
      );
      orbitAngleRef.current = MathUtils.damp(
        orbitAngleRef.current,
        0,
        CAMERA_ZOOM_SPEED,
        delta,
      );
    } else {
      rig.target.copy(rig.goal);
      zoomRef.current = goalZoom;
      placedRef.current = true;
    }

    const zoom = zoomRef.current;
    const orbitAngle = orbitAngleRef.current;
    camera.position.set(
      rig.target.x + Math.sin(orbitAngle) * solvingDistance * zoom,
      rig.target.y + CAMERA_HEIGHT * heightFactorRef.current * zoom,
      rig.target.z + Math.cos(orbitAngle) * solvingDistance * zoom,
    );
    camera.lookAt(rig.target);
  });

  return null;
}
