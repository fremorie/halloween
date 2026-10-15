import { useGLTF } from "@react-three/drei";

import { CAT_MODEL_PATH } from "./constants";
import type { CatGLTFResult } from "./types";

export function useCatGLTF() {
  return useGLTF(CAT_MODEL_PATH) as unknown as CatGLTFResult;
}

useGLTF.preload(CAT_MODEL_PATH);
