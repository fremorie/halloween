import { useEffect, useMemo } from "react";
import type { Matrix4 } from "three";

import { createYarnMaterial } from "@/components/materials/yarnMaterial";
import { useInstanceMatrices } from "./useInstanceMatrices";
import { useYarnStrandGeometry } from "./useYarnStrandGeometry";

type Props = {
  stemMatrices: Matrix4[];
};

export function YarnWrap({ stemMatrices }: Props) {
  const yarnStrandGeometry = useYarnStrandGeometry();
  const yarnMaterial = useMemo(() => createYarnMaterial(), []);
  const yarnInstancesRef = useInstanceMatrices(stemMatrices);

  useEffect(() => () => yarnMaterial.dispose(), [yarnMaterial]);

  return (
    <instancedMesh
      key={`yarn-${stemMatrices.length}`}
      ref={yarnInstancesRef}
      args={[yarnStrandGeometry, yarnMaterial, stemMatrices.length]}
    />
  );
}
