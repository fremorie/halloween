import { FrontSide, MeshStandardMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import fragmentShader from "@/shaders/pedestal/fragment.glsl";

import { usePedestalGLTF } from "./usePedestalGLTF";

export function PedestalModel() {
  const { nodes, materials } = usePedestalGLTF();
  const paletteMaterial = materials.palette;

  return (
    <group dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.pedestal.geometry}>
        <CustomShaderMaterial
          baseMaterial={MeshStandardMaterial}
          fragmentShader={fragmentShader}
          map={paletteMaterial.map}
          normalMap={paletteMaterial.normalMap}
          normalScale={paletteMaterial.normalScale}
          roughness={paletteMaterial.roughness}
          metalness={paletteMaterial.metalness}
          shadowSide={FrontSide}
        />
      </mesh>
    </group>
  );
}
