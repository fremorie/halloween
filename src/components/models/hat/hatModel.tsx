import { useHatGLTF } from "./useHatGLTF";

export function HatModel() {
  const { nodes, materials } = useHatGLTF();

  return (
    <group dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Hat.geometry}
        material={materials["Material.001"]}
        position={[0.042, 1.753, -0.378]}
      />
    </group>
  );
}
