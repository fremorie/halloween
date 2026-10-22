import { useGLTF } from "@react-three/drei";

import { WINGS_PATCHWORK_MODEL_PATH } from "./constants";
import { WingsPatchworkGLTFResult } from "./types";

export function useWingsPatchworkGLTF() {
  return useGLTF(
    WINGS_PATCHWORK_MODEL_PATH,
  ) as unknown as WingsPatchworkGLTFResult;
}

useGLTF.preload(WINGS_PATCHWORK_MODEL_PATH);
