import { useBranchGLTF } from "./useBranchGLTF";

type Props = {
  position?: [number, number, number];
  rotationY?: number;
  scale?: number;
};

export function BranchModel({ position, rotationY, scale }: Props) {
  const { nodes, materials } = useBranchGLTF();

  return (
    <group position={position} rotation-y={rotationY} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Branch.geometry}
        material={materials["branch.001"]}
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
