import type { JSX } from "react";

import { useEyeMaterial } from "@/components/materials/useEyeMaterial";
import type { EyeParams } from "@/types/eye";
import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatGLTF } from "./useCatGLTF";
import { useCatBlink } from "@/utils/cat/useCatBlink";
import { useCatEyeGlances } from "@/utils/cat/useCatEyeGlances";

type CatModelProps = JSX.IntrinsicElements["group"] & {
  eyeParams?: EyeParams;
};

export function CatModel({ eyeParams, ...props }: CatModelProps) {
  const { nodes, materials } = useCatGLTF();
  const eyeMaterial = useEyeMaterial(materials.Eye.map, eyeParams);
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
