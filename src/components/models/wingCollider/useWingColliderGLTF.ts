import { useGLTF } from "@react-three/drei";

import { WING_COLLIDER_MODEL_PATH } from "./constants";
import type { WingColliderGLTFResult } from "./types";

export function useWingColliderGLTF() {
  return useGLTF(WING_COLLIDER_MODEL_PATH) as unknown as WingColliderGLTFResult;
}

useGLTF.preload(WING_COLLIDER_MODEL_PATH);
