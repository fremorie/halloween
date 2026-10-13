"use client";

import { Leva } from "leva";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { Effects } from "@/components/postprocessing/effects";
import { CAMERA_SETTINGS, CAMERA_TARGET } from "@/settings/cameraSettings";
import { PAPER_COLOR } from "@/settings/paperSettings";
import { World } from "@/components/world/world";
import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";

export function Experience() {
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
      <KeyboardControls
        map={KEYBOARD_CONTROLS_MAP}
        onChange={(name, pressed) => console.log(name, pressed)}
      >
        <Canvas
          flat
          shadows="percentage"
          dpr={[1, 1.5]}
          camera={CAMERA_SETTINGS}
        >
          <color args={[PAPER_COLOR]} attach="background" />

          <Effects />

          <World />

          <OrbitControls makeDefault target={CAMERA_TARGET} />
          <Perf position="bottom-right" />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
