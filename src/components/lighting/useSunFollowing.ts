import type { RefObject } from "react";
import type { DirectionalLight } from "three";
import { useFrame } from "@react-three/fiber";

import { useGameStore } from "@/store/gameStore";
import { SUN_LIGHT_SETTINGS } from "@/settings/lightSettings";

export function useSunFollowing(
  sunLightRef: RefObject<DirectionalLight | null>,
) {
  const [offsetX, offsetY, offsetZ] = SUN_LIGHT_SETTINGS.offsetFromTarget;

  useFrame(() => {
    const sunLight = sunLightRef.current;
    if (!sunLight) return;

    const { catPosition } = useGameStore.getState();
    const { target } = sunLight;

    target.position.set(
      catPosition.x,
      0,
      catPosition.z - SUN_LIGHT_SETTINGS.targetLead,
    );
    sunLight.position.set(
      target.position.x + offsetX,
      target.position.y + offsetY,
      target.position.z + offsetZ,
    );
    target.updateMatrixWorld();
  });
}
