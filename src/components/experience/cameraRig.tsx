import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

import { useGameStore } from "@/store/gameStore";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";
import {
  flyInToCat,
  followShot,
  getCameraShot,
  getNextScriptedMoveStart,
  getScriptedMovePhase,
  getShotFollowSpeed,
  getShotHeightFactor,
  getShotOrbitAngle,
  getShotZoom,
  placeCamera,
  pullBackForKnitting,
  pushInToCat,
  setShotLookAt,
  snapToShot,
} from "@/utils/camera";
import { isTouchScreen } from "@/utils/isTouchScreen";

export function CameraRig() {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const isTouchDevice = isTouchScreen();
  const shotLookAtRef = useRef(new Vector3());
  const poseRef = useRef<CameraPose>({
    lookAt: new Vector3(),
    zoom: 1,
    heightFactor: 1,
    orbitAngle: 0,
  });
  const isPlacedRef = useRef(false);
  const scriptedMoveStartRef = useRef<ScriptedMoveStart | null>(null);

  useFrame(({ camera, clock }, delta) => {
    const { catPosition, mode, currentStationIndex, rewardBeat, introBeat } =
      useGameStore.getState();
    const pose = poseRef.current;
    const shotLookAt = shotLookAtRef.current;
    const shot = getCameraShot(mode, rewardBeat, introBeat);
    const shotZoom = getShotZoom(shot, aspect, isTouchDevice);
    const shotHeightFactor = getShotHeightFactor(shot);
    const shotOrbitAngle = getShotOrbitAngle(shot);
    const shotFollowSpeed = getShotFollowSpeed(shot, isTouchDevice);
    setShotLookAt(shotLookAt, shot, catPosition, currentStationIndex);

    scriptedMoveStartRef.current = getNextScriptedMoveStart(
      scriptedMoveStartRef.current,
      getScriptedMovePhase(shot, rewardBeat, mode),
      clock.elapsedTime,
      pose,
    );
    const scriptedMoveStart = scriptedMoveStartRef.current;

    if (!isPlacedRef.current) {
      snapToShot(pose, shotLookAt, shotZoom, shotHeightFactor, shotOrbitAngle);
      isPlacedRef.current = true;
    } else if (scriptedMoveStart?.phase === "knittingPullBack") {
      pullBackForKnitting(
        pose,
        scriptedMoveStart,
        shotLookAt,
        shotZoom,
        clock.elapsedTime,
        delta,
      );
    } else if (scriptedMoveStart?.phase === "introFlyIn") {
      flyInToCat(pose, scriptedMoveStart, shotLookAt, clock.elapsedTime);
    } else if (scriptedMoveStart?.phase === "catCloseUp") {
      pushInToCat(pose, scriptedMoveStart, shotLookAt, clock.elapsedTime);
    } else {
      followShot(
        pose,
        shotLookAt,
        shotZoom,
        shotHeightFactor,
        shotOrbitAngle,
        shotFollowSpeed,
        delta,
      );
    }

    placeCamera(camera, pose);
  });

  return null;
}
