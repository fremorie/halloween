import type { CameraProps } from "@react-three/fiber";

import type { Vec3 } from "@/types/math";

export const CAMERA_FOV = 38;
export const CAMERA_FIT_RADIUS = 3.5;
export const SOLVING_HALF_WIDTH = 5.5;
export const CAMERA_FIT_MARGIN = 1.15;
export const LOOK_AT_HEIGHT = 3.2;
export const CAMERA_HEIGHT = 1.05;
export const WALKING_LEAD = -1;
export const WALKING_DROP = 1.3;
export const WALKING_ZOOM = 0.75;
export const CAMERA_FOLLOW_SPEED = 2.5;

export const CAMERA_SETTINGS: CameraProps = {
  fov: CAMERA_FOV,
  near: 0.1,
  far: 1000,
  position: [4, 1.5, 8],
};

export const CAMERA_TARGET: Vec3 = [0, 2.5, 0];

export const CAMERA_ZOOM_SPEED = 2;

export const CAT_CLOSE_UP_LOOK_AT_HEIGHT = 1.2;
export const CAT_CLOSE_UP_ZOOM = 0.4;

export const SOLVING_LOOK_AT_HEIGHT = 2.5;

export const CAT_CLOSE_UP_EASE = "power2.inOut";
export const KNITTING_PULL_BACK_EASE = "sine.inOut";
export const KNITTING_PULL_BACK_ZOOM = 1.15;
export const CAT_CLOSE_UP_HEIGHT_FACTOR = 0.4;
export const CAT_CLOSE_UP_ORBIT_DEGREES = 18;
export const CAT_CLOSE_UP_LOOK_AT_DURATION_FACTOR = 0.7;
