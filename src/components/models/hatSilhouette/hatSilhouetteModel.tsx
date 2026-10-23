import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useSilhouetteFade } from "@/utils/animation/useSilhouetteFade";
import { useHatGLTF } from "./useHatGLTF";
import { HAT_SILHOUETTE_TEXTURE_PATH } from "./constants";

type Props = {
  isRevealed: boolean;
};

export function HatSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useHatGLTF();
  const hatSilhouetteTexture = useTexture(
    HAT_SILHOUETTE_TEXTURE_PATH,
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

useTexture.preload(HAT_SILHOUETTE_TEXTURE_PATH);
