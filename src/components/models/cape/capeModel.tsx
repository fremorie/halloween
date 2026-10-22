import type { Ref } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide, MeshStandardMaterial, SRGBColorSpace } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import type CustomShaderMaterialVanilla from "three-custom-shader-material/vanilla";

import fragmentShader from "@/shaders/cape/fragment.glsl";
import vertexShader from "@/shaders/cape/vertex.glsl";

import { CAPE_BASE_COLOR_TEXTURE_PATH } from "./constants";
import { useCapeGLTF } from "./useCapeGLTF";

export type CapeMaterial = CustomShaderMaterialVanilla<
  typeof MeshStandardMaterial
>;

type Props = {
  materialRef?: Ref<CapeMaterial>;
};

export function CapeModel({ materialRef }: Props) {
  const { nodes } = useCapeGLTF();
  const capeBaseColorTexture = useTexture(
    CAPE_BASE_COLOR_TEXTURE_PATH,
    (loadedCapeBaseColorTexture) => {
      loadedCapeBaseColorTexture.flipY = false;
      loadedCapeBaseColorTexture.colorSpace = SRGBColorSpace;
    },
  );

  return (
    <group dispose={null}>
      <mesh castShadow geometry={nodes.Cape.geometry}>
        <CustomShaderMaterial
          ref={materialRef}
          baseMaterial={MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          map={capeBaseColorTexture}
          roughness={0.5}
          metalness={0}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}

useTexture.preload(CAPE_BASE_COLOR_TEXTURE_PATH);
