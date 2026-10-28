import { type RefObject, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { FOOTSTEPS_MIN_WALK_PACE } from "@/settings/soundEffectSettings";
import { useGameStore } from "@/store/gameStore";

export function useFootsteps(walkPaceRef: RefObject<number>) {
  const footstepsSound = useGameStore((state) => state.footstepsSound);
  const footstepsSoundIdRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      footstepsSound?.pause();
    },
    [footstepsSound],
  );

  useFrame(() => {
    if (footstepsSound === null || footstepsSound.state() !== "loaded") return;

    const isCatWalking = walkPaceRef.current > FOOTSTEPS_MIN_WALK_PACE;
    const areFootstepsPlaying = footstepsSound.playing(
      footstepsSoundIdRef.current,
    );

    if (isCatWalking && !areFootstepsPlaying) {
      footstepsSoundIdRef.current = footstepsSound.play(
        footstepsSoundIdRef.current,
      );
    }
    if (!isCatWalking && areFootstepsPlaying) {
      footstepsSound.pause(footstepsSoundIdRef.current);
    }
  });
}
