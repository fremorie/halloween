import { useFrame } from "@react-three/fiber";

import { lanternTimeUniform } from "./lanternFaceMaterial";

export function LanternFaceClock() {
  useFrame(({ clock }) => {
    lanternTimeUniform.value = clock.elapsedTime;
  });

  return null;
}
