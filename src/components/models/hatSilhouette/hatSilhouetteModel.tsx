import { useTexture } from "@react-three/drei";

import { useHatGLTF } from "./useHatGLTF";

export function HatSilhouetteModel() {
  const { nodes } = useHatGLTF();
  const hatSilhouetteTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/HatSilhouetteBaseColor.png`,
    (loadedHatSilhouetteTexture) => {
      loadedHatSilhouetteTexture.flipY = false;
    },
  );

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Hat.geometry} position={[-5.703, 2.765, 0.042]}>
        <meshBasicMaterial map={hatSilhouetteTexture} />
      </mesh>
    </group>
  );
}
