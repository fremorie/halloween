import type { CameraProps } from "@react-three/fiber";

import { Vec3 } from "@/types/math";

export const CAMERA_SETTINGS: CameraProps = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: [4, 1.5, 8],
};

export const CAMERA_TARGET: Vec3 = [0, 2.5, 0];
