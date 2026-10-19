import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useSilhouetteFade } from "@/utils/animation/useSilhouetteFade";
import { useWingsGLTF } from "./useWingsGLTF";

type Props = {
  isRevealed: boolean;
};

export function WingsSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useWingsGLTF();
  const wingsSilhouetteTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/WingsSilhouetteBaseColor.png`,
    (loadedWingsSilhouetteTexture) => {
      loadedWingsSilhouetteTexture.flipY = false;
    },
  );

  const materialRef = useRef<MeshBasicMaterial | null>(null);

  useSilhouetteFade({ materialRef, isRevealed });

  return (
    <group dispose={null}>
      <mesh geometry={nodes.Cube.geometry} position={[-5.8, 0, -36]}>
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
