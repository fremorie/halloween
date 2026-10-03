"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import { Rain } from "./rain";

export default function Page() {
  return (
    <>
      <Leva theme={{ sizes: { rootWidth: "380px", controlWidth: "160px" } }} />
      <Canvas>
        <OrthographicCamera makeDefault position={[0, 0, 1]} />
        <Rain />
      </Canvas>
    </>
  );
}
