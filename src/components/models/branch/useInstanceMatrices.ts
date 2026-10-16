import { useLayoutEffect, useRef } from "react";
import type { InstancedMesh, Matrix4 } from "three";

import { applyInstanceMatrices } from "@/utils/instances";

export function useInstanceMatrices(instanceMatrices: Matrix4[]) {
  const instancesRef = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    applyInstanceMatrices(instancesRef.current, instanceMatrices);
  }, [instanceMatrices]);

  return instancesRef;
}
