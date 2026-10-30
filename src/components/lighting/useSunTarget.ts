import { type RefObject, useLayoutEffect } from "react";
import type { DirectionalLight } from "three";

import { SUN_LIGHT_SETTINGS } from "@/settings/lightSettings";

export function useSunTarget(sunLightRef: RefObject<DirectionalLight | null>) {
  useLayoutEffect(() => {
    const sunLight = sunLightRef.current;
    if (!sunLight) return;

    sunLight.target.position.set(...SUN_LIGHT_SETTINGS.targetPosition);
    sunLight.target.updateMatrixWorld();
  }, [sunLightRef]);
}
