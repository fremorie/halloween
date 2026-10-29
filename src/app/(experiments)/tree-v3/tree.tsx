import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";
import { TREE_MODEL_PATH } from "@/components/models/tree/treeModel";

import { CanopyLeaves } from "./canopyLeaves";
import { useFullyRevealedColors } from "./useFullyRevealedColors";

const CANOPY_BLOB_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/LeavesBaseColor.jpg`;

type GLTFResult = GLTF & {
  nodes: {
    Leaves: THREE.Mesh;
    Tree: THREE.Mesh;
  };
  materials: {
    Tree: THREE.MeshStandardMaterial;
  };
};

export function Tree() {
  useFullyRevealedColors();

  const { nodes, materials } = useGLTF(
    TREE_MODEL_PATH,
  ) as unknown as GLTFResult;

  const canopyBlobTexture = useTexture(
    CANOPY_BLOB_TEXTURE_PATH,
    (loadedCanopyBlobTexture) => {
      loadedCanopyBlobTexture.flipY = false;
      loadedCanopyBlobTexture.colorSpace = THREE.SRGBColorSpace;
    },
  );

  return (
    <>
      <group scale={0.5} dispose={null}>
        <mesh
          castShadow
          geometry={nodes.Leaves.geometry}
          position={[0.168, 6.448, -0.674]}
        >
          <meshStandardMaterial map={canopyBlobTexture} />
        </mesh>
        <mesh castShadow geometry={nodes.Tree.geometry}>
          <RevealStandardMaterial sourceMaterial={materials.Tree} />
        </mesh>
      </group>
      <CanopyLeaves />
    </>
  );
}

useTexture.preload(CANOPY_BLOB_TEXTURE_PATH);
