import { useGLTF } from "@react-three/drei";

import { YARN_BALL_MODEL_PATH } from "./constants";
import type { YarnBallGLTFResult } from "./types";

export function useYarnBallGLTF() {
  return useGLTF(YARN_BALL_MODEL_PATH) as unknown as YarnBallGLTFResult;
}

useGLTF.preload(YARN_BALL_MODEL_PATH);
