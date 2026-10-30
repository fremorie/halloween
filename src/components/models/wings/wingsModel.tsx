import React, { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import type { Group } from "three";

import { useWingsGLTF } from "@/components/models/wings/useWingsGLTF";
import {
  WINGS_FLY_TIME_SCALE,
  WINGS_SPREAD_DURATION,
  WINGS_WAVE_TIME_SCALE,
} from "./constants";

type Props = {
  isFlying?: boolean;
};

export function WingsModel({ isFlying }: Props) {
  const groupRef = useRef<Group>(null);
  const { nodes, materials, animations } = useWingsGLTF();
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    const waveAction = actions.Wave;
    const flyAction = actions.Fly;

    if (!waveAction || !flyAction) {
      return;
    }

    waveAction.setEffectiveTimeScale(WINGS_WAVE_TIME_SCALE);
    flyAction.setEffectiveTimeScale(WINGS_FLY_TIME_SCALE);

    const fadingInAction = isFlying ? flyAction : waveAction;
    const fadingOutAction = isFlying ? waveAction : flyAction;

    fadingInAction.reset().fadeIn(WINGS_SPREAD_DURATION).play();
    fadingOutAction.fadeOut(WINGS_SPREAD_DURATION);
  }, [actions, isFlying]);

  return (
    <group ref={groupRef} dispose={null}>
      <group name="Scene">
        <group name="WingRig">
          <skinnedMesh
            castShadow
            name="Wings"
            geometry={nodes.Wings.geometry}
            material={materials.Wings}
            skeleton={nodes.Wings.skeleton}
          />
          <primitive object={nodes.Root} />
          <primitive object={nodes.Skeleton1L} />
          <primitive object={nodes.Skeleton1R} />
        </group>
      </group>
    </group>
  );
}
