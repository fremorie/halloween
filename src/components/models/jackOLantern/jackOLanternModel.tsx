import { useFrame } from "@react-three/fiber";
import { FrontSide } from "three";

import { lanternMaterial } from "@/components/materials/lanternFaceMaterial";
import { useJackOLanternGLTF } from "./useJackOLanternGLTF";

export function JackOLanternModel() {
  const { nodes, materials } = useJackOLanternGLTF();

  useFrame((state) => {
    lanternMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pumpkin.geometry}
        material={materials.pumpkin}
        material-shadowSide={FrontSide}
      />
      <mesh geometry={nodes.pumpkin_1.geometry} material={lanternMaterial} />
    </group>
  );
}
