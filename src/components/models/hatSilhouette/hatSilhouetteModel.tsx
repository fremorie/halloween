import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useHatGLTF } from "./useHatGLTF";
import { useSilhouetteFade } from "./useSilhouetteFade";

type Props = {
  isRevealed: boolean;
};

export function HatSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useHatGLTF();
  const hatSilhouetteTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/HatSilhouetteBaseColor.png`,
    (loadedHatSilhouetteTexture) => {
      loadedHatSilhouetteTexture.flipY = false;
    },
  );

  const materialRef = useRef<MeshBasicMaterial | null>(null);

  useSilhouetteFade({ materialRef, isRevealed });

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Hat.geometry} position={[-5.703, 2.765, 0.042]}>
        <meshBasicMaterial
          ref={materialRef}
          map={hatSilhouetteTexture}
          transparent={true}
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
