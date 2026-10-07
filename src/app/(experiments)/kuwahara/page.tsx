"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, StatsGl } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Pumpkins } from "./pumpkins";
import { RenderStats } from "./renderStats";
import { Environment } from "./environment";
import { Kuwahara } from "./kuwahara";

export default function Page() {
  return (
    <>
      <Leva theme={{ sizes: { rootWidth: "380px", controlWidth: "160px" } }} />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [5, 3, -6],
        }}
      >
        <color args={["#ffffff"]} attach="background" />

        <EffectComposer multisampling={8}>
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
          <Kuwahara />
        </EffectComposer>

        <Environment />

        <Pumpkins />
        {/* Ground */}
        <mesh
          receiveShadow
          position-y={0}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <OrbitControls makeDefault />
        <StatsGl className="fixed top-0 left-0" />
        <RenderStats />
      </Canvas>
    </>
  );
}
