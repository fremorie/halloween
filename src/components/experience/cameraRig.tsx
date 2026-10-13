import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";

import {
  CAMERA_FIT_MARGIN,
  CAMERA_FIT_RADIUS,
  CAMERA_FOLLOW_SPEED,
  CAMERA_FOV,
  CAMERA_HEIGHT,
  LOOK_AT_HEIGHT,
  SOLVING_HALF_WIDTH,
  WALKING_DROP,
  WALKING_LEAD,
  WALKING_ZOOM,
} from "@/settings/cameraSettings";
import { useGameStore } from "@/store/gameStore";

export function CameraRig() {
  const aspect = useThree((state) => state.size.width / state.size.height);
  const [rig] = useState(() => ({
    goal: new Vector3(),
    target: new Vector3(),
  }));
  const placedRef = useRef(false);

  const halfHeight = Math.tan(MathUtils.degToRad(CAMERA_FOV / 2));
  const solvingDistance =
    Math.max(
      CAMERA_FIT_RADIUS / halfHeight,
      SOLVING_HALF_WIDTH / (halfHeight * aspect),
    ) * CAMERA_FIT_MARGIN;
  const followDistance = solvingDistance * WALKING_ZOOM;
  const followHeight = CAMERA_HEIGHT * WALKING_ZOOM;

  useFrame(({ camera }, delta) => {
    const { catPosition } = useGameStore.getState();
    rig.goal.set(
      catPosition.x,
      LOOK_AT_HEIGHT - WALKING_DROP,
      catPosition.z - WALKING_LEAD,
    );

    if (placedRef.current) {
      rig.target.lerp(rig.goal, 1 - Math.exp(-CAMERA_FOLLOW_SPEED * delta));
    } else {
      rig.target.copy(rig.goal);
      placedRef.current = true;
    }

    camera.position.set(
      rig.target.x,
      rig.target.y + followHeight,
      rig.target.z + followDistance,
    );
    camera.lookAt(rig.target);
  });

  return null;
}
