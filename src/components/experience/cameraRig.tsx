import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

import {
  CAMERA_FIT_MARGIN,
  CAMERA_FIT_RADIUS,
  CAMERA_FOLLOW_SPEED,
  CAMERA_FOV,
  CAMERA_HEIGHT,
  CAMERA_ZOOM_SPEED,
  CAT_CLOSE_UP_LOOK_AT_HEIGHT,
  CAT_CLOSE_UP_ZOOM,
  LOOK_AT_HEIGHT,
  SOLVING_HALF_WIDTH,
  WALKING_DROP,
  WALKING_LEAD,
  WALKING_ZOOM,
} from "@/settings/cameraSettings";
import { useGameStore } from "@/store/gameStore";
import { getSolvingFocus } from "@/utils/journey";
import type { GameMode } from "@/types/game";

function getGoalZoom(mode: GameMode) {
  if (mode === "rewarding") return CAT_CLOSE_UP_ZOOM;
  if (mode === "approaching" || mode === "solving") return 1;
  return WALKING_ZOOM;
}

export function CameraRig() {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const [rig] = useState(() => ({
    goal: new Vector3(),
    target: new Vector3(),
  }));
  const zoomRef = useRef(1);
  const placedRef = useRef(false);

  const halfHeight = Math.tan(MathUtils.degToRad(CAMERA_FOV / 2));
  const solvingDistance =
    Math.max(
      CAMERA_FIT_RADIUS / halfHeight,
      SOLVING_HALF_WIDTH / (halfHeight * aspect),
    ) * CAMERA_FIT_MARGIN;

  useFrame(({ camera }, delta) => {
    const { catPosition, mode, currentStationIndex } = useGameStore.getState();
    const isFramingCatCloseUp = mode === "rewarding";
    const isFramingPuzzle = mode === "approaching" || mode === "solving";

    if (isFramingCatCloseUp) {
      rig.goal.set(catPosition.x, CAT_CLOSE_UP_LOOK_AT_HEIGHT, catPosition.z);
    } else if (isFramingPuzzle) {
      const [focusX, focusZ] = getSolvingFocus(currentStationIndex);
      rig.goal.set(focusX, LOOK_AT_HEIGHT, focusZ);
    } else {
      rig.goal.set(
        catPosition.x,
        LOOK_AT_HEIGHT - WALKING_DROP,
        catPosition.z - WALKING_LEAD,
      );
    }
    const goalZoom = getGoalZoom(mode);

    if (placedRef.current) {
      rig.target.lerp(rig.goal, 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta));
      zoomRef.current = MathUtils.damp(
        zoomRef.current,
        goalZoom,
        CAMERA_ZOOM_SPEED,
        delta,
      );
    } else {
      rig.target.copy(rig.goal);
      zoomRef.current = goalZoom;
      placedRef.current = true;
    }

    const zoom = zoomRef.current;
    camera.position.set(
      rig.target.x,
      rig.target.y + CAMERA_HEIGHT * zoom,
      rig.target.z + solvingDistance * zoom,
    );
    camera.lookAt(rig.target);
  });

  return null;
}
