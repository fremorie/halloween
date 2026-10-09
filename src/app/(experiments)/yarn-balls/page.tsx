"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, StatsGl } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Lights } from "@/components/lightning/lights";
import { YarnBalls } from "./yarnBalls";
import { Kuwahara } from "@/components/postprocessing/kuwahara";

export default function Page() {
  const { kuwahara } = useControls({
    kuwahara: { value: true, label: "Kuwahara filter" },
  });

  return (
    <>
      <Leva theme={{ sizes: { rootWidth: "280px", controlWidth: "30px" } }} />
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

        <EffectComposer multisampling={4}>
          {kuwahara && <Kuwahara />}
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>

        <Lights />

        <YarnBalls />

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
      </Canvas>
    </>
  );
}
