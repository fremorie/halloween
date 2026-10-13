"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Perf } from "r3f-perf";

import { Lights } from "@/components/lighting/experiments/lights";
import { Kuwahara } from "@/components/postprocessing/kuwahara";
import { JackOLantern } from "./jackOLantern";
import { useLanternControls } from "./useLanternControls";

export default function Page() {
  const { kuwahara } = useControls({
    kuwahara: { value: true, label: "Kuwahara filter" },
  });

  useLanternControls();

  return (
    <>
      <Leva
        theme={{
          sizes: {
            rootWidth: "320px",
            controlWidth: "160px",
            colorPickerHeight: "140px",
          },
        }}
      />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 1.5, 6],
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

        <JackOLantern />

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

        <OrbitControls makeDefault target={[0, 1, 0]} />
        <Perf position="bottom-right" />
      </Canvas>
    </>
  );
}
