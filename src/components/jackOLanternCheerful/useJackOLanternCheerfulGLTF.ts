import { useGLTF } from "@react-three/drei";

import { JACK_O_LANTERN_CHEERFUL_MODEL_PATH } from "./constants";
import type { JackOLanternCheerfulGLTFResult } from "./types";

export function useJackOLanternCheerfulGLTF() {
  return useGLTF(
    JACK_O_LANTERN_CHEERFUL_MODEL_PATH,
  ) as unknown as JackOLanternCheerfulGLTFResult;
}

useGLTF.preload(JACK_O_LANTERN_CHEERFUL_MODEL_PATH);
