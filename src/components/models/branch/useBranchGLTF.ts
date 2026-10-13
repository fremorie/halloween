import { useGLTF } from "@react-three/drei";

import { BRANCH_MODEL_PATH } from "./constants";
import type { BranchGLTFResult } from "./types";

export function useBranchGLTF() {
  return useGLTF(BRANCH_MODEL_PATH) as unknown as BranchGLTFResult;
}

useGLTF.preload(BRANCH_MODEL_PATH);
