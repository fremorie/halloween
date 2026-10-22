import { useRef } from "react";
import type { Mesh } from "three";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { YARN_BALL_RADIUS } from "@/components/models/yarnBall/constants";
import { createPuzzleBackgroundMaterial } from "@/components/puzzleBackground/material";
import { PUZZLE_BACKGROUND_PLACEMENT_BY_PIECE } from "@/components/puzzleBackground/constants";
import { PUZZLE_BACKGROUND_FADE_DURATION } from "@/settings/journeySettings";
import type { CostumePiece } from "@/types/level";

const material = createPuzzleBackgroundMaterial();

type Props = {
  piece: CostumePiece;
  isActive: boolean;
};

export function PuzzleBackground({ piece, isActive }: Props) {
  const { centreY, width, height } =
    PUZZLE_BACKGROUND_PLACEMENT_BY_PIECE[piece];
  const backgroundMeshRef = useRef<Mesh>(null);

  useGSAP(() => {
    const backgroundMesh = backgroundMeshRef.current;
    if (!backgroundMesh) {
      return;
    }

    if (isActive) {
      backgroundMesh.visible = true;
    }

    gsap.to(material.uniforms.uOpacity, {
      value: isActive ? 1 : 0,
      duration: PUZZLE_BACKGROUND_FADE_DURATION,
      ease: "sine.out",
      overwrite: "auto",
      onComplete: () => {
        if (!isActive) {
          backgroundMesh.visible = false;
        }
      },
    });
  }, [isActive]);

  return (
    <mesh
      ref={backgroundMeshRef}
      visible={false}
      renderOrder={1}
      position-y={centreY}
      position-z={-YARN_BALL_RADIUS}
      scale={[width, height, 1]}
      material={material}
    >
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
