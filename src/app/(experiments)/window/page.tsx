"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

import { WindowFrame } from "./windowFrame";

export default function Page() {
  return (
    <>
      <Leva theme={{ sizes: { rootWidth: "380px", controlWidth: "160px" } }} />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [1, 1, 1],
        }}
      >
        <OrbitControls makeDefault />
        <Stage>
          <WindowFrame />
        </Stage>
      </Canvas>
    </>
  );
}
