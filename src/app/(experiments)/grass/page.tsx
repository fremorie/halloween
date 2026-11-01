"use client";

import { Suspense } from "react";
import { Leva } from "leva";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Effects } from "@/components/postprocessing/effects";
import { GrassField } from "@/components/grass/GrassField";
import { RevealSystem } from "@/components/materials/revealSystem";
import { revealUniforms } from "@/components/materials/revealUniforms";
import { PAPER_COLOR } from "@/settings/paperSettings";

const FULLY_REVEALED_RADIUS = 1000;
const REVEAL_START_TIME = 0;
const INSTANT_REVEAL_SPEED = 100000;
const CAMERA_POSITION: [number, number, number] = [-3.5, 1.4, 7];
const CAMERA_TARGET: [number, number, number] = [-5.8, 0.6, 0];

function RevealEverything() {
  useFrame(() => {
    revealUniforms.uRevealMaxRadius.value = FULLY_REVEALED_RADIUS;
    revealUniforms.uRevealInitialSpeed.value = INSTANT_REVEAL_SPEED;
    revealUniforms.uRevealStartTimes.value.fill(REVEAL_START_TIME);
  });

  return null;
}

export default function Page() {
  return (
    <>
      <Leva collapsed />
      <Canvas
        flat
        dpr={[1, 1.5]}
        camera={{ fov: 38, near: 0.1, far: 1000, position: CAMERA_POSITION }}
      >
        <color args={[PAPER_COLOR]} attach="background" />
        <fog attach="fog" args={["#ffffff", 25, 75]} />
        <Suspense fallback={null}>
          <Effects />
          <RevealSystem />
          <RevealEverything />
          <GrassField />
        </Suspense>
        <OrbitControls makeDefault target={CAMERA_TARGET} />
      </Canvas>
    </>
  );
}
