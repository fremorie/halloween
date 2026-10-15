import type { JSX } from "react";

import { useEyeMaterial } from "@/components/materials/useEyeMaterial";
import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatGLTF } from "./useCatGLTF";
import { useCatBlink } from "./useCatBlink";
import { useCatEyeGlances } from "./useCatEyeGlances";

export function CatModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useCatGLTF();
  const eyeMaterial = useEyeMaterial(materials.Eye.map);
  const { topLidsRef, bottomLidsRef } = useCatBlink();
  useCatEyeGlances(eyeMaterial);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cat.geometry}
        material={materials.Cat}
        position={[0, 0, 0.2]}
      />

      <mesh
        geometry={nodes.LeftEye.geometry}
        material={eyeMaterial}
        position={[-0.243, 0.353, -1.237]}
      />
      <mesh
        geometry={nodes.RightEye.geometry}
        material={eyeMaterial}
        position={[0.241, 0.353, -1.237]}
      />

      <mesh
        ref={bottomLidsRef}
        geometry={nodes.BottomLids.geometry}
        material={materials.EyeLids}
        position={[-0.243, 0.353, -1.237]}
        rotation-x={CAT_BOTTOM_LID_OPEN_ROTATION_X}
      />
      <mesh
        ref={topLidsRef}
        geometry={nodes.TopLids.geometry}
        material={materials.EyeLids}
        position={[-0.243, 0.353, -1.237]}
        rotation-x={CAT_TOP_LID_OPEN_ROTATION_X}
      />
    </group>
  );
}
