import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import { useFallingLeavesColorControls } from "@/components/leaves/useFallingLeavesColorControls";
import type { Vec3 } from "@/types/math";

import { createCanopyBlobMaterial } from "./canopyBlobMaterial";
import { createCanopyLeavesMaterial } from "./canopyLeavesMaterial";
import { createCanopyLeavesShadowMaterial } from "./canopyLeavesShadowMaterial";
import { useCanopyLeavesFlutter } from "./useCanopyLeavesFlutter";

import {
  TREE_V4_CANOPY_BLOB_TEXTURE_PATH,
  TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
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

  const canopyBlobMaterial = useMemo(
    () => createCanopyBlobMaterial(canopyBlobTexture),
    [canopyBlobTexture],
  );

  const canopyLeafAlphaTexture = useTexture(
    TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
  );

  const canopyLeavesMaterial = useMemo(
    () => createCanopyLeavesMaterial(canopyLeafAlphaTexture),
    [canopyLeafAlphaTexture],
  );

  const canopyLeavesShadowMaterial = useMemo(
    () => createCanopyLeavesShadowMaterial(canopyLeafAlphaTexture),
    [canopyLeafAlphaTexture],
  );

  useFallingLeavesColorControls(canopyLeavesMaterial);
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
        material={canopyBlobMaterial}
        position={nodes.CanopyBlob001.position}
      />
      <mesh
        castShadow
        geometry={nodes.CanopyLeaves001.geometry}
        material={canopyLeavesMaterial}
        customDepthMaterial={canopyLeavesShadowMaterial}
        position={nodes.CanopyLeaves001.position}
      />
    </group>
  );
}

useTexture.preload(TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH);
useTexture.preload(TREE_V4_TRUNK_NORMAL_MAP_PATH);
useTexture.preload(TREE_V4_CANOPY_BLOB_TEXTURE_PATH);
useTexture.preload(TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH);
