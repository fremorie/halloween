import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useSilhouetteFade } from "@/utils/animation/useSilhouetteFade";
import { useCapeGLTF } from "./useCapeGLTF";
import { CAPE_SILHOUETTE_TEXTURE_PATH } from "./constants";

type Props = {
  isRevealed: boolean;
};

export function CapeSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useCapeGLTF();
  const capeSilhouetteTexture = useTexture(
    CAPE_SILHOUETTE_TEXTURE_PATH,
    (loadedHatSilhouetteTexture) => {
      loadedHatSilhouetteTexture.flipY = false;
    },
  );

  const materialRef = useRef<MeshBasicMaterial | null>(null);

  useSilhouetteFade({ materialRef, isRevealed });

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cape.geometry} position={[5.8, 0, -18]}>
        <meshBasicMaterial
          ref={materialRef}
          map={capeSilhouetteTexture}
          transparent={true}
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

useTexture.preload(CAPE_SILHOUETTE_TEXTURE_PATH);
