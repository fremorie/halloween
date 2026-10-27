import type { Matrix4 } from "three";

import { useInstanceMatrices } from "./useInstanceMatrices";
import { useYarnStrandGeometry } from "./useYarnStrandGeometry";

type Props = {
  stemMatrices: Matrix4[];
};

export function YarnWrap({ stemMatrices }: Props) {
  const yarnStrandGeometry = useYarnStrandGeometry();
  const yarnInstancesRef = useInstanceMatrices(stemMatrices);

  return (
    <instancedMesh
      key={`yarn-${stemMatrices.length}`}
      ref={yarnInstancesRef}
      args={[yarnStrandGeometry, undefined, stemMatrices.length]}
    >
      <meshBasicMaterial color="red" />
    </instancedMesh>
  );
}
