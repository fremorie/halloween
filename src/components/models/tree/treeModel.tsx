import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

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
  leavesMaterial: THREE.ShaderMaterial;
};

export function TreeModel(props: Props) {
  const { leavesMaterial, ...groupProps } = props;

  const { nodes, materials } = useGLTF(
    TREE_MODEL_PATH,
  ) as unknown as GLTFResult;

  return (
    <group {...groupProps} dispose={null}>
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
