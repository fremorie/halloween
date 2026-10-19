import { useGLTF } from "@react-three/drei";

import { CAPE_MODEL_PATH } from "./constants";
import type { CapeGLTFResult } from "./types";

export function useCapeGLTF() {
  return useGLTF(CAPE_MODEL_PATH) as unknown as CapeGLTFResult;
}

useGLTF.preload(CAPE_MODEL_PATH);
