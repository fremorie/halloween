import { useMemo } from "react";
import * as THREE from "three";

import type { Vec3 } from "@/types/math";
import { useBranchGLTF } from "./useBranchGLTF";
import { getEdgePlacement } from "@/utils/graph/getEdgePlacement";

type Props = {
  from: Vec3;
  to: Vec3;
  tuckDistance: number;
};

export function BranchModel({ from, to, tuckDistance }: Props) {
  const { nodes, materials } = useBranchGLTF();
  const { matrix, turn } = useMemo(
    () => getEdgePlacement(from, to, tuckDistance),
    [from, to, tuckDistance],
  );

  const placedLeafMatrices = useMemo(() => {
    const leafNodes = [
      nodes.Leaf001,
      nodes.Leaf002,
      nodes.Leaf003,
      nodes.Leaf004,
    ];

    return leafNodes.map((leafNode) => {
      const placedLeafPosition = leafNode.position.clone().applyMatrix4(matrix);
      const placedLeafRotation = turn.clone().multiply(leafNode.quaternion);

      return new THREE.Matrix4().compose(
        placedLeafPosition,
        placedLeafRotation,
        leafNode.scale,
      );
    });
  }, [matrix, nodes, turn]);

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Branch.geometry}
        material={materials["branch.001"]}
        matrix={matrix}
        matrixAutoUpdate={false}
      />
      {placedLeafMatrices.map((placedLeafMatrix, leafIndex) => (
        <mesh
          key={leafIndex}
          castShadow
          receiveShadow
          geometry={nodes.Leaf001.geometry}
          material={materials.Leaf}
          matrix={placedLeafMatrix}
          matrixAutoUpdate={false}
        />
      ))}
    </group>
  );
}
