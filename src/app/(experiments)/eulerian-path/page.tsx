"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Perf } from "r3f-perf";

import { Lights } from "@/components/lightning/lights";
import { EulerianPath } from "./eulerianPath";
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
          position: [0, 2.5, 9],
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

        <EulerianPath />

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

        <OrbitControls makeDefault target={[0, 2, 0]} />
        <Perf position="bottom-right" />
      </Canvas>
    </>
  );
}
