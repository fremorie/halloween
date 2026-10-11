import { useFrame } from "@react-three/fiber";

import { lanternMaterial } from "@/components/materials/lanternFaceMaterial";
import { useJackOLanternHappyGLTF } from "./useJackOLanternHappyGLTF";

export function JackOLanternHappyModel() {
  const { nodes, materials } = useJackOLanternHappyGLTF();

  useFrame((state) => {
    lanternMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin001.geometry}
        material={materials.pumpkin}
      />
      <mesh geometry={nodes.pumpkin001_1.geometry} material={lanternMaterial} />
    </group>
  );
}
