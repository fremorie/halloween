import { useMemo } from "react";
import { useTexture } from "@react-three/drei";

import { createLeavesMaterial, leavesTimeUniform } from "./leavesMaterial";
import { createLeavesShadowMaterial } from "./leavesShadowMaterial";
import { useFrame } from "@react-three/fiber";

const LEAVES_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/LeavesBaseColor.jpg`;

export function useLeavesMaterial() {
  const leavesTexture = useTexture(
    LEAVES_TEXTURE_PATH,
    (loadedLeavesTexture) => {
      loadedLeavesTexture.flipY = false;
    },
  );

  const leavesMaterial = useMemo(
    () => createLeavesMaterial(leavesTexture),
    [leavesTexture],
  );

  useFrame(({ clock }) => {
    leavesTimeUniform.value = clock.elapsedTime;
  });

  return leavesMaterial;
}

export function useLeavesShadowMaterial() {
  return useMemo(() => createLeavesShadowMaterial(), []);
}

useTexture.preload(LEAVES_TEXTURE_PATH);
