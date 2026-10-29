import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import type { Mesh } from "three";

import { LEAVES_TEXTURE_PATH } from "@/components/leaves/constants";
import { useFallingLeavesColorControls } from "@/components/leaves/useFallingLeavesColorControls";
import { TREE_MODEL_PATH } from "@/components/models/tree/treeModel";

import { createCanopyLeavesGeometry } from "./createCanopyLeavesGeometry";
import {
  canopyLeavesTimeUniform,
  createCanopyLeavesMaterial,
} from "./canopyLeavesMaterial";

type TreeNodes = {
  nodes: {
    Leaves: Mesh;
  };
};

export function CanopyLeaves() {
  const { nodes } = useGLTF(TREE_MODEL_PATH) as unknown as TreeNodes;
  const leafTexture = useTexture(LEAVES_TEXTURE_PATH);

  const canopyLeavesGeometry = useMemo(
    () => createCanopyLeavesGeometry(nodes.Leaves.geometry),
    [nodes.Leaves.geometry],
  );

  const canopyLeavesMaterial = useMemo(
    () => createCanopyLeavesMaterial(leafTexture),
    [leafTexture],
  );

  useFallingLeavesColorControls(canopyLeavesMaterial);

  useFrame((_, delta) => {
    canopyLeavesTimeUniform.value += delta;
  });

  return (
    <group scale={0.5}>
      <mesh
        geometry={canopyLeavesGeometry}
        material={canopyLeavesMaterial}
        position={[0.168, 6.448, -0.674]}
      />
    </group>
  );
}
