import type { JSX } from "react";

import {
  CAT_BOTTOM_LID_OPEN_ROTATION_X,
  CAT_TOP_LID_OPEN_ROTATION_X,
} from "./constants";
import { useCatV1GLTF } from "./useCatV1GLTF";

export function CatV1Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useCatV1GLTF();

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
        material={materials.Eye}
        position={[-0.243, 0.353, -1.237]}
      />
      <mesh
        geometry={nodes.RightEye.geometry}
        material={materials.Eye}
        position={[0.241, 0.353, -1.237]}
      />

      <mesh
        geometry={nodes.BottomLids.geometry}
        material={materials.EyeLids}
        position={[-0.243, 0.353, -1.237]}
        rotation-x={CAT_BOTTOM_LID_OPEN_ROTATION_X}
      />
      <mesh
        geometry={nodes.TopLids.geometry}
        material={materials.EyeLids}
        position={[-0.243, 0.353, -1.237]}
        rotation-x={CAT_TOP_LID_OPEN_ROTATION_X}
      />
    </group>
  );
}
