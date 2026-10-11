import { useJackOLanternGLTF } from "./useJackOLanternGLTF";

export function JackOLanternModel() {
  const { nodes, materials } = useJackOLanternGLTF();

  return (
    <group dispose={null}>
      <group position={[-0.008, 0.591, 0.155]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pumpkin.geometry}
          material={materials.pumpkinSkin}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pumpkin_1.geometry}
          material={materials.stem}
        />
        <mesh
          geometry={nodes.pumpkin_2.geometry}
          material={materials.pumpkinCarved}
        />
        <mesh
          geometry={nodes.pumpkin_3.geometry}
          material={materials.pumpkinCut}
        />
      </group>
    </group>
  );
}
