import { useGLTF, useTexture } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const TREE_MODEL_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/models/TreeV3.glb`;
const TRUNK_BASE_COLOR_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/TreeBaseColor.png`;
const TRUNK_NORMAL_MAP_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/TreeNormalMap.png`;
const CANOPY_BLOB_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/LeavesBaseColor2.jpg`;
const CANOPY_LEAF_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/CanopyLeaf.png`;
const CANOPY_LEAF_ALPHA_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/MapleLeaf.png`;

type GLTFResult = GLTF & {
  nodes: {
    Trunk001: THREE.Mesh;
    CanopyBlob001: THREE.Mesh;
    CanopyLeaves001: THREE.Mesh;
  };
};

export function Tree() {
  const { nodes } = useGLTF(TREE_MODEL_PATH) as unknown as GLTFResult;

  const [trunkBaseColorTexture, canopyBlobTexture] = useTexture(
    [TRUNK_BASE_COLOR_TEXTURE_PATH, CANOPY_BLOB_TEXTURE_PATH],
    (loadedColorTextures) => {
      loadedColorTextures.forEach((loadedColorTexture) => {
        loadedColorTexture.flipY = false;
        loadedColorTexture.colorSpace = THREE.SRGBColorSpace;
      });
    },
  );

  const trunkNormalMap = useTexture(
    TRUNK_NORMAL_MAP_PATH,
    (loadedTrunkNormalMap) => {
      loadedTrunkNormalMap.flipY = false;
    },
  );

  const canopyLeafTexture = useTexture(
    CANOPY_LEAF_TEXTURE_PATH,
    (loadedCanopyLeafTexture) => {
      loadedCanopyLeafTexture.colorSpace = THREE.SRGBColorSpace;
    },
  );

  const canopyLeafAlphaTexture = useTexture(CANOPY_LEAF_ALPHA_TEXTURE_PATH);

  return (
    <group scale={0.5} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Trunk001.geometry}>
        <meshStandardMaterial
          map={trunkBaseColorTexture}
          normalMap={trunkNormalMap}
        />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.CanopyBlob001.geometry}
        position={nodes.CanopyBlob001.position}
      >
        <meshStandardMaterial map={canopyBlobTexture} />
      </mesh>
      <mesh
        castShadow
        geometry={nodes.CanopyLeaves001.geometry}
        position={nodes.CanopyLeaves001.position}
      >
        <meshStandardMaterial
          map={canopyLeafTexture}
          alphaMap={canopyLeafAlphaTexture}
          alphaTest={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(TREE_MODEL_PATH);
