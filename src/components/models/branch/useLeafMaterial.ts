import { useEffect, useMemo } from "react";
import type { MeshStandardMaterial } from "three";

export function useLeafMaterial(sourceMaterial: MeshStandardMaterial) {
  const leafMaterial = useMemo(() => {
    const material = sourceMaterial.clone();
    material.color.set("#ffffff");
    return material;
  }, [sourceMaterial]);

  useEffect(() => () => leafMaterial.dispose(), [leafMaterial]);

  return leafMaterial;
}
