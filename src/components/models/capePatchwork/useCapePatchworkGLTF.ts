import { useGLTF } from "@react-three/drei";

import { CAPE_PATCHWORK_MODEL_PATH } from "./constants";
import { CapePatchworkGLTFResult } from "./types";

export function useCapePatchworkGLTF() {
  return useGLTF(
    CAPE_PATCHWORK_MODEL_PATH,
  ) as unknown as CapePatchworkGLTFResult;
}

useGLTF.preload(CAPE_PATCHWORK_MODEL_PATH);
