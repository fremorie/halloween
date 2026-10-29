import { useFrame } from "@react-three/fiber";

import { canopyLeavesTimeUniform } from "./canopyLeavesMaterial";

export function useCanopyLeavesFlutter() {
  useFrame(({ clock }) => {
    canopyLeavesTimeUniform.value = clock.elapsedTime;
  });
}
