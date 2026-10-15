"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Perf } from "r3f-perf";

import { Lights } from "@/components/lighting/experiments/lights";
import { Kuwahara } from "@/components/postprocessing/kuwahara";
import { CatModel } from "@/components/models/cat/CatModel";
import { useEyeControls } from "./useEyeControls";

export default function Page() {
  const { kuwahara } = useControls({
    kuwahara: { value: true, label: "Kuwahara filter" },
  });
  const eyeParams = useEyeControls();

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
          position: [4, 1.5, 8],
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

        <CatModel position-y={1.1} rotation-y={-2} eyeParams={eyeParams} />

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
