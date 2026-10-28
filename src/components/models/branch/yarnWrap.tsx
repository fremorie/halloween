import { useEffect, useMemo } from "react";
import type { Matrix4 } from "three";

import { createYarnMaterial } from "@/components/materials/yarnMaterial";
import { useYarnControls } from "@/components/materials/useYarnControls";
import { useInstanceMatrices } from "./useInstanceMatrices";
import { useYarnStrandGeometry } from "./useYarnStrandGeometry";
import { useYarnWrapping } from "./useYarnWrapping";
import { useSewingMachineSound } from "./useSewingMachineSound";
import type { GraphEdge } from "@/types/graph";

type Props = {
  stemMatrices: Matrix4[];
  edges: GraphEdge[];
  edgeThreadStartNodeIds: (number | null)[];
};

export function YarnWrap({
  stemMatrices,
  edges,
  edgeThreadStartNodeIds,
}: Props) {
  const yarnStrandGeometry = useYarnStrandGeometry(stemMatrices.length);
  const yarnMaterial = useMemo(() => createYarnMaterial(), []);
  const yarnInstancesRef = useInstanceMatrices(stemMatrices);
  useYarnWrapping(yarnStrandGeometry, edges, edgeThreadStartNodeIds);
  useSewingMachineSound(edgeThreadStartNodeIds);
  useYarnControls();

  useEffect(() => () => yarnMaterial.dispose(), [yarnMaterial]);

  return (
    <instancedMesh
      key={`yarn-${stemMatrices.length}`}
      ref={yarnInstancesRef}
      args={[yarnStrandGeometry, yarnMaterial, stemMatrices.length]}
    />
  );
}
