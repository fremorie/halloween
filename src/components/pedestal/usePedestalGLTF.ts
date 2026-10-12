import { useGLTF } from "@react-three/drei";

import { PEDESTAL_MODEL_PATH } from "./constants";
import type { PedestalGLTFResult } from "./types";

export function usePedestalGLTF() {
  return useGLTF(PEDESTAL_MODEL_PATH) as unknown as PedestalGLTFResult;
}

useGLTF.preload(PEDESTAL_MODEL_PATH);
