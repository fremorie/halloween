import { AnimationClip, type Group, MathUtils } from "three";
import { type RefObject, useRef } from "react";

import { useWingsGLTF } from "@/components/models/wings/useWingsGLTF";
import { WINGS_FLY_TIME_SCALE } from "@/components/models/wings/constants";
import { useFrame } from "@react-three/fiber";
import {
  FINALE_BOB_AMPLITUDE,
  FINALE_BOB_PHASE,
  FINALE_HOVER_HEIGHT,
} from "@/settings/finaleSettings";

export function useCatFlightBob(
  rootRef: RefObject<Group | null>,
  bobGroupRef: RefObject<Group | null>,
  isFlying: boolean,
) {
  const flyingStartRef = useRef<{
    wasFlying: boolean;
    flyingStartElapsedTime: number;
  }>({
    wasFlying: false,
    flyingStartElapsedTime: 0,
  });
  const { animations } = useWingsGLTF();

  const flyClip = AnimationClip.findByName(animations, "Fly");

  useFrame(({ clock }) => {
    const root = rootRef.current;
    const bobGroup = bobGroupRef.current;

    if (!root || !bobGroup || !flyClip) {
      return;
    }

    const flapPeriod = flyClip.duration / WINGS_FLY_TIME_SCALE;

    const flyingStart = flyingStartRef.current;

    if (isFlying && !flyingStart.wasFlying) {
      flyingStart.flyingStartElapsedTime = clock.elapsedTime;
    }
    flyingStart.wasFlying = isFlying;

    if (!isFlying) {
      bobGroup.position.y = 0;
      return;
    }

    const elapsedSinceFlyingStart =
      clock.elapsedTime - flyingStart.flyingStartElapsedTime;
    const flapAngle =
      (2 * Math.PI * elapsedSinceFlyingStart) / flapPeriod + FINALE_BOB_PHASE;
    const heightEnvelope = MathUtils.clamp(
      root.position.y / FINALE_HOVER_HEIGHT,
      0,
      1,
    );

    bobGroup.position.y =
      Math.sin(flapAngle) * FINALE_BOB_AMPLITUDE * heightEnvelope;
  });
}
