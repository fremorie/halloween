import { useFrame } from "@react-three/fiber";

import { capeWaveTimeUniform } from "@/components/materials/capeMaterial";

export function useCapeWave() {
  useFrame(({ clock }) => {
    capeWaveTimeUniform.value = clock.elapsedTime;
  });
}
