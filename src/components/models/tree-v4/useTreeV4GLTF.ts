import { useGLTF } from "@react-three/drei";

import { TREE_V4_MODEL_PATH } from "./constants";
import type { TreeV4GLTFResult } from "./types";

export function useTreeV4GLTF() {
  return useGLTF(TREE_V4_MODEL_PATH) as unknown as TreeV4GLTFResult;
}

useGLTF.preload(TREE_V4_MODEL_PATH);
