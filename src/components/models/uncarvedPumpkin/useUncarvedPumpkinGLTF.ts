import { useGLTF } from "@react-three/drei";

import { UNCARVED_PUMPKIN_MODEL_PATH } from "./constants";
import type { UncarvedPumpkinGLTFResult } from "./types";

export function useUncarvedPumpkinGLTF() {
  return useGLTF(
    UNCARVED_PUMPKIN_MODEL_PATH,
  ) as unknown as UncarvedPumpkinGLTFResult;
}

useGLTF.preload(UNCARVED_PUMPKIN_MODEL_PATH);
