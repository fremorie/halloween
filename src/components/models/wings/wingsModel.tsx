import React, { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import type { Group } from "three";

import { useWingsGLTF } from "@/components/models/wings/useWingsGLTF";

export function WingsModel() {
  const groupRef = useRef<Group>(null);
  const { nodes, materials, animations } = useWingsGLTF();
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    actions.Wave?.setEffectiveTimeScale(0.25).play();
  }, [actions]);

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
