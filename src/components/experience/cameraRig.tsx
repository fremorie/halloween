import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

import { useGameStore } from "@/store/gameStore";
import type { CameraPose, ScriptedMoveStart } from "@/types/camera";
import {
  followShot,
  getCameraShot,
  getNextScriptedMoveStart,
  getScriptedMovePhase,
  getShotZoom,
  getSolvingDistance,
  placeCamera,
  pullBackForKnitting,
  pushInToCat,
  setShotLookAt,
  snapToShot,
} from "@/utils/camera";

export function CameraRig() {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const shotLookAtRef = useRef(new Vector3());
  const poseRef = useRef<CameraPose>({
    lookAt: new Vector3(),
    zoom: 1,
    heightFactor: 1,
    orbitAngle: 0,
  });
  const isPlacedRef = useRef(false);
  const scriptedMoveStartRef = useRef<ScriptedMoveStart | null>(null);

  const solvingDistance = getSolvingDistance(aspect);

  useFrame(({ camera, clock }, delta) => {
    const { catPosition, mode, currentStationIndex, rewardBeat } =
      useGameStore.getState();
    const pose = poseRef.current;
    const shotLookAt = shotLookAtRef.current;
    const shot = getCameraShot(mode, rewardBeat);
    const shotZoom = getShotZoom(shot);
    setShotLookAt(shotLookAt, shot, catPosition, currentStationIndex);

    scriptedMoveStartRef.current = getNextScriptedMoveStart(
      scriptedMoveStartRef.current,
      getScriptedMovePhase(shot, rewardBeat),
      clock.elapsedTime,
      pose,
    );
    const scriptedMoveStart = scriptedMoveStartRef.current;

    if (!isPlacedRef.current) {
      snapToShot(pose, shotLookAt, shotZoom);
      isPlacedRef.current = true;
    } else if (scriptedMoveStart?.phase === "knittingPullBack") {
      pullBackForKnitting(
        pose,
        scriptedMoveStart,
        shotLookAt,
        clock.elapsedTime,
        delta,
      );
    } else if (scriptedMoveStart?.phase === "catCloseUp") {
      pushInToCat(pose, scriptedMoveStart, shotLookAt, clock.elapsedTime);
    } else {
      followShot(pose, shotLookAt, shotZoom, delta);
    }

    placeCamera(camera, pose, solvingDistance);
  });

  return null;
}
