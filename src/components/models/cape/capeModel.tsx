import { useCapeGLTF } from "./useCapeGLTF";

export function CapeModel() {
  const { nodes, materials } = useCapeGLTF();

  return (
    <group dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Cape.geometry}
        material={materials.CapePainted}
      />
    </group>
  );
}
