import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { createLeavesMaterial } from "./leavesMaterial";
import { useMemo } from "react";

export const TREE_MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/models/Tree.glb`;

type GLTFResult = GLTF & {
  nodes: {
    Leaves: THREE.Mesh;
    Tree: THREE.Mesh;
  };
  materials: {
    Tree: THREE.MeshStandardMaterial;
  };
};

type Props = {
  scale?: number;
};

export function TreeModel(props: Props) {
  const { nodes, materials } = useGLTF(
    TREE_MODEL_PATH,
  ) as unknown as GLTFResult;

  const leavesTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/LeavesBaseColor.jpg`,
    (loadedLeavesTexture) => {
      loadedLeavesTexture.flipY = false;
    },
  );

  const leavesMaterial = useMemo(
    () => createLeavesMaterial(leavesTexture),
    [leavesTexture],
  );

  useFrame(({ clock }) => {
    leavesMaterial.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Leaves.geometry}
        material={leavesMaterial}
        position={[0.168, 6.448, -0.674]}
      />
      <mesh
        castShadow
        geometry={nodes.Tree.geometry}
        material={materials.Tree}
      />
    </group>
  );
}

useGLTF.preload(TREE_MODEL_PATH);
