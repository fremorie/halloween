import { usePedestalGLTF } from "./usePedestalGLTF";

export function PedestalModel() {
  const { nodes, materials } = usePedestalGLTF();

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pedestal.geometry}
        material={materials.palette}
      />
    </group>
  );
}
