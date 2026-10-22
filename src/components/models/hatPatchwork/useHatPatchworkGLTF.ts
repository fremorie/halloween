import { useGLTF } from "@react-three/drei";

import { HAT_PATCHWORK_MODEL_PATH } from "./constants";
import { HatPatchworkGLTFResult } from "./types";

export function useHatPatchworkGLTF() {
  return useGLTF(HAT_PATCHWORK_MODEL_PATH) as unknown as HatPatchworkGLTFResult;
}

useGLTF.preload(HAT_PATCHWORK_MODEL_PATH);
