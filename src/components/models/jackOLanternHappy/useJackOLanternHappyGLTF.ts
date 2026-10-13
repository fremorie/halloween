import { useGLTF } from "@react-three/drei";

import { JACK_O_LANTERN_HAPPY_MODEL_PATH } from "./constants";
import type { JackOLanternHappyGLTFResult } from "./types";

export function useJackOLanternHappyGLTF() {
  return useGLTF(
    JACK_O_LANTERN_HAPPY_MODEL_PATH,
  ) as unknown as JackOLanternHappyGLTFResult;
}

useGLTF.preload(JACK_O_LANTERN_HAPPY_MODEL_PATH);
