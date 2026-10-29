import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import { useFallingLeavesColorControls } from "@/components/leaves/useFallingLeavesColorControls";

import { createCanopyBlobMaterial } from "./canopyBlobMaterial";
import { createCanopyLeavesMaterial } from "./canopyLeavesMaterial";
import { createCanopyLeavesShadowMaterial } from "./canopyLeavesShadowMaterial";
import {
  TREE_V4_CANOPY_BLOB_TEXTURE_PATH,
  TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
  TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH,
  TREE_V4_TRUNK_NORMAL_MAP_PATH,
} from "./constants";
import { createTrunkMaterial } from "./trunkMaterial";
import { useCanopyLeavesFlutter } from "./useCanopyLeavesFlutter";

export type TreeV4Materials = ReturnType<typeof useTreeV4Materials>;

export function useTreeV4Materials() {
  const trunkBaseColorTexture = useTexture(
    TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH,
    (loadedTrunkBaseColorTexture) => {
      loadedTrunkBaseColorTexture.flipY = false;
      loadedTrunkBaseColorTexture.colorSpace = SRGBColorSpace;
    },
  );

  const canopyBlobTexture = useTexture(
    TREE_V4_CANOPY_BLOB_TEXTURE_PATH,
    (loadedCanopyBlobTexture) => {
      loadedCanopyBlobTexture.flipY = false;
      loadedCanopyBlobTexture.colorSpace = SRGBColorSpace;
    },
  );

  const trunkNormalMap = useTexture(
    TREE_V4_TRUNK_NORMAL_MAP_PATH,
    (loadedTrunkNormalMap) => {
      loadedTrunkNormalMap.flipY = false;
    },
  );

  const canopyLeafAlphaTexture = useTexture(
    TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH,
  );

  const trunkMaterial = useMemo(
    () => createTrunkMaterial(trunkBaseColorTexture, trunkNormalMap),
    [trunkBaseColorTexture, trunkNormalMap],
  );

  const canopyBlobMaterial = useMemo(
    () => createCanopyBlobMaterial(canopyBlobTexture),
    [canopyBlobTexture],
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

  return {
    trunkMaterial,
    canopyBlobMaterial,
    canopyLeavesMaterial,
    canopyLeavesShadowMaterial,
  };
}

useTexture.preload(TREE_V4_TRUNK_BASE_COLOR_TEXTURE_PATH);
useTexture.preload(TREE_V4_TRUNK_NORMAL_MAP_PATH);
useTexture.preload(TREE_V4_CANOPY_BLOB_TEXTURE_PATH);
useTexture.preload(TREE_V4_CANOPY_LEAF_ALPHA_TEXTURE_PATH);
