"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import { Rain } from "./rain";

export default function Page() {
  return (
    <Canvas>
      <OrthographicCamera makeDefault position={[0, 0, 1]} />
      <Rain />
    </Canvas>
  );
}
