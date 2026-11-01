import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

import {
  branchLeavesTimeUniform,
  createBranchLeavesShadowMaterial,
  createBranchLeavesMaterial,
} from "./branchLeavesMaterial";
import { BRANCH_LEAF_TEXTURE_PATH } from "./constants";

export function useBranchLeavesMaterials() {
  const leafTexture = useTexture(
    BRANCH_LEAF_TEXTURE_PATH,
    (loadedLeafTexture) => {
      loadedLeafTexture.colorSpace = SRGBColorSpace;
    },
  );

  const leafMaterial = useMemo(
    () => createBranchLeavesMaterial(leafTexture),
    [leafTexture],
  );
  const leafShadowMaterial = useMemo(
    () => createBranchLeavesShadowMaterial(),
    [],
  );

  useEffect(() => () => leafMaterial.dispose(), [leafMaterial]);
  useEffect(() => () => leafShadowMaterial.dispose(), [leafShadowMaterial]);

  useFrame(({ clock }) => {
    branchLeavesTimeUniform.value = clock.elapsedTime;
  });

  return { leafMaterial, leafShadowMaterial };
}

useTexture.preload(BRANCH_LEAF_TEXTURE_PATH);
