import { useFrame } from "@react-three/fiber";

import { lanternMaterial } from "@/components/materials/lanternFaceMaterial";
import { useJackOLanternCheerfulGLTF } from "./useJackOLanternCheerfulGLTF";

export function JackOLanternCheerfulModel() {
  const { nodes, materials } = useJackOLanternCheerfulGLTF();

  useFrame((state) => {
    lanternMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin002.geometry}
        material={materials.pumpkin}
      />
      <mesh geometry={nodes.pumpkin002_1.geometry} material={lanternMaterial} />
    </group>
  );
}
