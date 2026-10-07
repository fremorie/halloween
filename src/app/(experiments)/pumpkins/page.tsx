"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, StatsGl } from "@react-three/drei";

import { Pumpkins } from "./pumpkins";
import { RenderStats } from "./renderStats";

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
        <Stage>
          <Pumpkins />
        </Stage>
        <OrbitControls makeDefault />
        <StatsGl className="fixed top-0 left-0" />
        <RenderStats />
      </Canvas>
    </>
  );
}
