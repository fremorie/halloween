import { useGLTF } from "@react-three/drei";

import { HAT_MODEL_PATH } from "./constants";
import { HatGLTFResult } from "./types";

export function useHatGLTF() {
  return useGLTF(HAT_MODEL_PATH) as unknown as HatGLTFResult;
}

useGLTF.preload(HAT_MODEL_PATH);
