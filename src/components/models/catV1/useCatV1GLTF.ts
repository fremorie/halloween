import { useGLTF } from "@react-three/drei";

import { CAT_V1_MODEL_PATH } from "./constants";
import type { CatV1GLTFResult } from "./types";

export function useCatV1GLTF() {
  return useGLTF(CAT_V1_MODEL_PATH) as unknown as CatV1GLTFResult;
}

useGLTF.preload(CAT_V1_MODEL_PATH);
