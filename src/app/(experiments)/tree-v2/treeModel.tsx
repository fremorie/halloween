import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

import type { Vec3 } from "@/types/math";

export const TREE_MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/models/TreeV2.glb`;

type GLTFResult = GLTF & {
  nodes: {
    Leaves002: THREE.Mesh;
    Tree004: THREE.Mesh;
  };
  materials: {
    "Foliage.003": THREE.MeshStandardMaterial;
    Tree: THREE.MeshStandardMaterial;
  };
};

type Props = {
  scale?: number;
  position?: Vec3;
  "rotation-y"?: number;
};

export function TreeModelV2(props: Props) {
  const { nodes, materials } = useGLTF(
    TREE_MODEL_PATH,
  ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Leaves002.geometry}
        material={materials["Foliage.003"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree004.geometry}
        material={materials.Tree}
      />
    </group>
  );
}

useGLTF.preload(TREE_MODEL_PATH);
