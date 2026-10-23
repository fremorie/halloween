import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useSilhouetteFade } from "@/utils/animation/useSilhouetteFade";
import { useWingsGLTF } from "./useWingsGLTF";
import { WINGS_SILHOUETTE_TEXTURE_PATH } from "./constants";

type Props = {
  isRevealed: boolean;
};

export function WingsSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useWingsGLTF();
  const wingsSilhouetteTexture = useTexture(
    WINGS_SILHOUETTE_TEXTURE_PATH,
    (loadedWingsSilhouetteTexture) => {
      loadedWingsSilhouetteTexture.flipY = false;
    },
  );

  const materialRef = useRef<MeshBasicMaterial | null>(null);

  useSilhouetteFade({ materialRef, isRevealed });

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry} position={[-5.8, -0.197, -36]}>
        <meshBasicMaterial
          ref={materialRef}
          map={wingsSilhouetteTexture}
          transparent={true}
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

useTexture.preload(WINGS_SILHOUETTE_TEXTURE_PATH);
