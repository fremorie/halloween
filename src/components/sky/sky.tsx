import { useTexture } from "@react-three/drei";
import { BackSide, type MeshBasicMaterial, SRGBColorSpace } from "three";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import {
  SKY_DOME_HEIGHT_SEGMENTS,
  SKY_DOME_RADIUS,
  SKY_DOME_WIDTH_SEGMENTS,
  SKY_INTENSITY,
  SKY_REVEAL_DURATION,
  SKY_REVEAL_EASE,
} from "@/settings/skySettings";
import { RENDER_ORDER } from "@/utils/renderOrder";
import { useIsSkyRevealed } from "@/utils/animation/useIsSkyRevealed";

const PAINTED_SKY_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/sky.jpg`;

export function PaintedSky() {
  const paintedSkyTexture = useTexture(
    PAINTED_SKY_TEXTURE_PATH,
    (loadedPaintedSkyTexture) => {
      loadedPaintedSkyTexture.colorSpace = SRGBColorSpace;
    },
  );
  const skyMaterialRef = useRef<MeshBasicMaterial>(null);
  const isSkyRevealed = useIsSkyRevealed();

  useEffect(() => {
    const skyMaterial = skyMaterialRef.current;

    if (!skyMaterial) {
      return;
    }

    const skyOpacityTween = gsap.to(skyMaterial, {
      opacity: isSkyRevealed ? 1 : 0,
      duration: isSkyRevealed ? SKY_REVEAL_DURATION : 0,
      ease: SKY_REVEAL_EASE,
      overwrite: true,
    });

    return () => {
      skyOpacityTween.kill();
    };
  }, [isSkyRevealed]);

  return (
    <mesh
      visible={isSkyRevealed}
      renderOrder={RENDER_ORDER.sky}
      scale={[SKY_DOME_RADIUS, SKY_DOME_RADIUS, -SKY_DOME_RADIUS]}
    >
      <sphereGeometry
        args={[1, SKY_DOME_WIDTH_SEGMENTS, SKY_DOME_HEIGHT_SEGMENTS]}
      />
      <meshBasicMaterial
        ref={skyMaterialRef}
        map={paintedSkyTexture}
        color={[SKY_INTENSITY, SKY_INTENSITY, SKY_INTENSITY]}
        side={BackSide}
        transparent
        opacity={0}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}
