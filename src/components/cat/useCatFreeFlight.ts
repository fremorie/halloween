import type { RefObject } from "react";
import { type Group, MathUtils } from "three";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import type { ControlName } from "@/settings/controlsSettings";
import {
  CAT_FREE_FLIGHT_HEIGHT,
  CAT_FREE_FLIGHT_RISE_SPEED,
  CAT_LANDING_AIM_BELOW_GROUND,
  CAT_STEP_DOWN_SPEED,
  MAX_STEP_DURATION,
} from "@/settings/catSettings";
import { useGameStore } from "@/store/gameStore";
import { flyButtonHold } from "@/store/flyButtonHold";
import { useCatLanding } from "./useCatLanding";

export function useCatFreeFlight(rootRef: RefObject<Group | null>) {
  const [, getKeys] = useKeyboardControls<ControlName>();
  const { descendOntoScenery, descendShovingPumpkinsAside } = useCatLanding();

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

    const stepDuration = Math.min(delta, MAX_STEP_DURATION);
    const isCatWalking = !isFlyHeld && !isCatFreeFlying;
    const desiredHeight = Math.max(
      0,
      isCatWalking
        ? root.position.y - CAT_STEP_DOWN_SPEED * stepDuration
        : MathUtils.damp(
            root.position.y,
            targetHeight,
            CAT_FREE_FLIGHT_RISE_SPEED,
            stepDuration,
          ),
    );

    const sceneryLimitedHeight = descendOntoScenery(root, desiredHeight);
    const isStandingOnScenery = sceneryLimitedHeight > desiredHeight;

    root.position.y = descendShovingPumpkinsAside(root, sceneryLimitedHeight);

    const isCatAirborne =
      isFlyHeld ||
      (isCatFreeFlying && root.position.y > 0 && !isStandingOnScenery);

    if (isCatAirborne !== isCatFreeFlying) {
      setCatFreeFlying(isCatAirborne);
    }
  });
}
