import type { RefObject } from "react";
import { type Group, MathUtils } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import {
  CAT_FREE_FLIGHT_HEIGHT,
  CAT_FREE_FLIGHT_RISE_SPEED,
  CAT_LANDING_AIM_BELOW_GROUND,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";
import { flyButtonHold } from "@/store/flyButtonHold";

export function useCatFreeFlight(rootRef: RefObject<Group | null>) {
  const [, getKeys] = useKeyboardControls<ControlName>();

  useFrame((_, delta) => {
    const root = rootRef.current;
    const { mode, isCatFreeFlying, setCatFreeFlying } = useGameStore.getState();

    if (!root || mode === "finale") {
      return;
    }

    const isFlyHeld =
      mode === "done" && (getKeys().fly || flyButtonHold.isHeld);
    const targetHeight = isFlyHeld
      ? CAT_FREE_FLIGHT_HEIGHT
      : -CAT_LANDING_AIM_BELOW_GROUND;

    root.position.y = Math.max(
      0,
      MathUtils.damp(
        root.position.y,
        targetHeight,
        CAT_FREE_FLIGHT_RISE_SPEED,
        Math.min(delta, MAX_STEP_DURATION),
      ),
    );

    const isCatAirborne = isFlyHeld || root.position.y > 0;

    if (isCatAirborne !== isCatFreeFlying) {
      setCatFreeFlying(isCatAirborne);
    }
  });
}
