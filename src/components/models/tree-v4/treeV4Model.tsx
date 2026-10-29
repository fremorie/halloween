import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import type { Vec3 } from "@/types/math";

import { createCanopyLeavesMaterial } from "./canopyLeavesMaterial";
import { useCanopyLeavesFlutter } from "./useCanopyLeavesFlutter";

import {
  TREE_V4_CANOPY_BLOB_TEXTURE_PATH,
  TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
  TREE_V4_CANOPY_LEAF_TEXTURE_PATH,
  TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH,
  TREE_V4_TRUNK_NORMAL_MAP_PATH,
} from "./constants";
import { useTreeV4GLTF } from "./useTreeV4GLTF";

type Props = {
  scale?: number;
  position?: Vec3;
  "rotation-y"?: number;
};

export function TreeV4Model(props: Props) {
  const { nodes } = useTreeV4GLTF();

  const [trunkBaseColorTexture, canopyBlobTexture] = useTexture(
    [TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH, TREE_V4_CANOPY_BLOB_TEXTURE_PATH],
    (loadedColorTextures) => {
      loadedColorTextures.forEach((loadedColorTexture) => {
        loadedColorTexture.flipY = false;
        loadedColorTexture.colorSpace = SRGBColorSpace;
      });
    },
  );

  const trunkNormalMap = useTexture(
    TREE_V4_TRUNK_NORMAL_MAP_PATH,
    (loadedTrunkNormalMap) => {
      loadedTrunkNormalMap.flipY = false;
    },
  );

  const canopyLeafTexture = useTexture(
    TREE_V4_CANOPY_LEAF_TEXTURE_PATH,
    (loadedCanopyLeafTexture) => {
      loadedCanopyLeafTexture.colorSpace = SRGBColorSpace;
    },
  );

  const canopyLeafAlphaTexture = useTexture(
    TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
  );

  const canopyLeavesMaterial = useMemo(
    () => createCanopyLeavesMaterial(canopyLeafTexture, canopyLeafAlphaTexture),
    [canopyLeafTexture, canopyLeafAlphaTexture],
  );

  useCanopyLeavesFlutter();

  return (
    <group {...props} dispose={null}>
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
        material={canopyLeavesMaterial}
        position={nodes.CanopyLeaves001.position}
      />
    </group>
  );
}

useTexture.preload(TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH);
useTexture.preload(TREE_V4_TRUNK_NORMAL_MAP_PATH);
useTexture.preload(TREE_V4_CANOPY_BLOB_TEXTURE_PATH);
useTexture.preload(TREE_V4_CANOPY_LEAF_TEXTURE_PATH);
useTexture.preload(TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH);
