import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { DoubleSide, type Mesh } from "three";

import { LEAVES_TEXTURE_PATH } from "@/components/leaves/constants";
import { TREE_MODEL_PATH } from "@/components/models/tree/treeModel";

import { createCanopyLeavesGeometry } from "./createCanopyLeavesGeometry";

type TreeNodes = {
  nodes: {
    Leaves: Mesh;
  };
};

export function CanopyLeaves() {
  const { nodes } = useGLTF(TREE_MODEL_PATH) as unknown as TreeNodes;
  const leafAlphaTexture = useTexture(LEAVES_TEXTURE_PATH);

  const canopyLeavesGeometry = useMemo(
    () => createCanopyLeavesGeometry(nodes.Leaves.geometry),
    [nodes.Leaves.geometry],
  );

  return (
    <group scale={0.5}>
      <mesh geometry={canopyLeavesGeometry} position={[0.168, 6.448, -0.674]}>
        <meshBasicMaterial
          color="#e8803a"
          alphaMap={leafAlphaTexture}
          alphaTest={0.5}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
