import { Vec3 } from "@/types/math";
import { useBranchGLTF } from "./useBranchGLTF";
import { branchPlacement } from "@/components/branch/utils/branchPlacement";
import { NODE_RADIUS } from "@/app/(experiments)/eulerian-path/utils/graph";
import { useMemo } from "react";

type Props = {
  from: Vec3;
  to: Vec3;
};

export function BranchModel({ from, to }: Props) {
  const { nodes, materials } = useBranchGLTF();
  const { matrix } = useMemo(
    () => branchPlacement(from, to, NODE_RADIUS * 0.8),
    [from, to],
  );

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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaf001.geometry}
        material={materials.Leaf}
        position={[0.398, 0.343, -0.018]}
        rotation={[0.819, 0, 0]}
        scale={0.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaf002.geometry}
        material={materials.Leaf}
        position={[0.401, 0.339, -0.015]}
        rotation={[2.26, -1.004, 0.201]}
        scale={0.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaf003.geometry}
        material={materials.Leaf}
        position={[0.707, -0.245, -0.067]}
        rotation={[-1.919, -0.002, 2.735]}
        scale={0.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Leaf004.geometry}
        material={materials.Leaf}
        position={[0.711, -0.238, -0.067]}
        rotation={[-1.395, -0.969, 2.178]}
        scale={0.139}
      />
    </group>
  );
}
