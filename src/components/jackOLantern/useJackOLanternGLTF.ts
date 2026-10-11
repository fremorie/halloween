import { useGLTF } from "@react-three/drei";

import { JACK_O_LANTERN_MODEL_PATH } from "./constants";
import type { JackOLanternGLTFResult } from "./types";

export function useJackOLanternGLTF() {
  return useGLTF(
    JACK_O_LANTERN_MODEL_PATH,
  ) as unknown as JackOLanternGLTFResult;
}

useGLTF.preload(JACK_O_LANTERN_MODEL_PATH);
