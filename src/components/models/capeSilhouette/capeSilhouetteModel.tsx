import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import type { MeshBasicMaterial } from "three";

import { useSilhouetteFade } from "@/utils/animation/useSilhouetteFade";
import { useCapeGLTF } from "./useCapeGLTF";

type Props = {
  isRevealed: boolean;
};

export function CapeSilhouetteModel({ isRevealed }: Props) {
  const { nodes } = useCapeGLTF();
  const capeSilhouetteTexture = useTexture(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/CapeSilhouetteBaseColor.png`,
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
