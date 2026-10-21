import { useMemo } from "react";
import { useTexture } from "@react-three/drei";

import { createLeavesMaterial, leavesTimeUniform } from "./leavesMaterial";
import { useFrame } from "@react-three/fiber";

export function useLeavesMaterial() {
  const leavesTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/LeavesBaseColor.jpg`,
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
