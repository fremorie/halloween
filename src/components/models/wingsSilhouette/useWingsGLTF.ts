import { useGLTF } from "@react-three/drei";

import { WINGS_MODEL_PATH } from "./constants";
import { WingsGLTFResult } from "./types";

export function useWingsGLTF() {
  return useGLTF(WINGS_MODEL_PATH) as unknown as WingsGLTFResult;
}

useGLTF.preload(WINGS_MODEL_PATH);
