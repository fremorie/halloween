import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

import type { Vec3 } from "@/types/math";
import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";

import { useLeavesShadowMaterial } from "./useLeavesMaterial";

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
  position?: Vec3;
  "rotation-y"?: number;
};

export function TreeModel(props: Props) {
  const { leavesMaterial, ...groupProps } = props;

  const leavesShadowMaterial = useLeavesShadowMaterial();

  const { nodes, materials } = useGLTF(
    TREE_MODEL_PATH,
  ) as unknown as GLTFResult;

  return (
    <group {...groupProps} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Leaves.geometry}
        material={leavesMaterial}
        customDepthMaterial={leavesShadowMaterial}
        position={[0.168, 6.448, -0.674]}
      />
      <mesh castShadow geometry={nodes.Tree.geometry}>
        <RevealStandardMaterial sourceMaterial={materials.Tree} />
      </mesh>
    </group>
  );
}

useGLTF.preload(TREE_MODEL_PATH);
