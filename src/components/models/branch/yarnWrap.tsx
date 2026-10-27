import { useEffect, useMemo } from "react";
import type { Matrix4 } from "three";

import { createYarnMaterial } from "@/components/materials/yarnMaterial";
import { useInstanceMatrices } from "./useInstanceMatrices";
import { useYarnStrandGeometry } from "./useYarnStrandGeometry";
import { useYarnWrapping } from "./useYarnWrapping";

type Props = {
  stemMatrices: Matrix4[];
  edgeThreading: boolean[];
};

export function YarnWrap({ stemMatrices, edgeThreading }: Props) {
  const yarnStrandGeometry = useYarnStrandGeometry(stemMatrices.length);
  const yarnMaterial = useMemo(() => createYarnMaterial(), []);
  const yarnInstancesRef = useInstanceMatrices(stemMatrices);
  useYarnWrapping(yarnStrandGeometry, edgeThreading);

  useEffect(() => () => yarnMaterial.dispose(), [yarnMaterial]);

  return (
    <instancedMesh
      key={`yarn-${stemMatrices.length}`}
      ref={yarnInstancesRef}
      args={[yarnStrandGeometry, yarnMaterial, stemMatrices.length]}
    />
  );
}
