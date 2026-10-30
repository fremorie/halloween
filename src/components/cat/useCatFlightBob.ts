import { AnimationClip, type Group, MathUtils } from "three";
import { type RefObject, useRef } from "react";

import { useWingsGLTF } from "@/components/models/wings/useWingsGLTF";
import { WINGS_FLY_TIME_SCALE } from "@/components/models/wings/constants";
import type { FinaleBeat } from "@/types/finale";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/store/gameStore";
import {
  FINALE_BOB_AMPLITUDE,
  FINALE_BOB_PHASE,
  FINALE_HOVER_HEIGHT,
} from "@/settings/finaleSettings";

export function useCatFlightBob(
  rootRef: RefObject<Group | null>,
  bobGroupRef: RefObject<Group | null>,
) {
  const takeOffStartRef = useRef<{
    lastSeenBeat: FinaleBeat | null;
    takeOffElapsedTime: number;
  }>({
    lastSeenBeat: null,
    takeOffElapsedTime: 0,
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

    const { mode, finaleBeat } = useGameStore.getState();

    if (mode !== "finale") {
      bobGroup.position.y = 0;
      return;
    }

    const takeOffStart = takeOffStartRef.current;

    if (takeOffStart.lastSeenBeat !== finaleBeat) {
      takeOffStart.lastSeenBeat = finaleBeat;
      if (finaleBeat === "takeOff") {
        takeOffStart.takeOffElapsedTime = clock.elapsedTime;
      }
    }

    const elapsedSinceTakeOff =
      clock.elapsedTime - takeOffStart.takeOffElapsedTime;
    const flapAngle =
      (2 * Math.PI * elapsedSinceTakeOff) / flapPeriod + FINALE_BOB_PHASE;
    const heightEnvelope = MathUtils.clamp(
      root.position.y / FINALE_HOVER_HEIGHT,
      0,
      1,
    );

    bobGroup.position.y =
      Math.sin(flapAngle) * FINALE_BOB_AMPLITUDE * heightEnvelope;
  });
}
