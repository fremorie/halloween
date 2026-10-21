import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { createLeavesMaterial } from "./leavesMaterial";

export const TREE_MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/models/Tree.glb`;

type GLTFResult = GLTF & {
  nodes: {
    Leaves1001: THREE.Mesh;
    Leaves2001: THREE.Mesh;
    Leaves3001: THREE.Mesh;
    Tree1001: THREE.Mesh;
  };
};

const leavesMaterial = createLeavesMaterial();

type Props = {
  scale?: number;
};

export function TreeModel(props: Props) {
  const { nodes } = useGLTF(TREE_MODEL_PATH) as unknown as GLTFResult;

  useFrame(({ clock }) => {
    leavesMaterial.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Leaves1001.geometry}
        material={leavesMaterial}
        position={[-2.707, 5.443, -0.721]}
      />
      <mesh
        geometry={nodes.Leaves2001.geometry}
        material={leavesMaterial}
        position={[0.35, 8.225, -0.165]}
      />
      <mesh
        geometry={nodes.Leaves3001.geometry}
        material={leavesMaterial}
        position={[2.86, 5.676, -1.135]}
      />
      <mesh
        castShadow
        geometry={nodes.Tree1001.geometry}
        position={[0.809, 0, 0.092]}
      >
        <meshStandardMaterial color="#84661d" />
      </mesh>
    </group>
  );
}

useGLTF.preload(TREE_MODEL_PATH);
