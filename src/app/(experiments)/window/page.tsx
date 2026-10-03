"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

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
        <directionalLight
          castShadow
          color="#ffffff"
          position={[10, 10, 5]}
          intensity={4.5}
          shadow-normalBias={0}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={2}
          shadow-camera-bottom={-4}
          shadow-camera-near={-5}
          shadow-camera-far={20}
          shadow-radius={10}
          shadow-mapSize={[1500, 1500]}
        />
        <ambientLight color="#ffffff" intensity={1.5} />
        <WindowFrame />
      </Canvas>
    </>
  );
}
