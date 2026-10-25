import { useFrame } from "@react-three/fiber";

import { revealTimeUniform } from "./revealUniforms";

export function RevealClock() {
  useFrame(({ clock }) => {
    revealTimeUniform.value = clock.elapsedTime;
  });

  return null;
}
