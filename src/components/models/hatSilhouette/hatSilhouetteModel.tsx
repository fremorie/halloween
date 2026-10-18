import { useHatGLTF } from "./useHatGLTF";

export function HatSilhouetteModel() {
  const { nodes, materials } = useHatGLTF();

  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Hat.geometry}
        material={materials.Hat}
        position={[-5.703, 2.765, 0.042]}
      />
    </group>
  );
}
