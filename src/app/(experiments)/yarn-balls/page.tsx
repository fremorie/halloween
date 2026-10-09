"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, StatsGl } from "@react-three/drei";

import { Lights } from "@/components/lightning/lights";
import { YarnBalls } from "./yarnBalls";

export default function Page() {
  return (
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

      <Lights />

      <YarnBalls />

      {/* Ground */}
      <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <OrbitControls makeDefault />
      <StatsGl className="fixed top-0 left-0" />
    </Canvas>
  );
}
