"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { Effects } from "@/components/postprocessing/effects";
import { CAMERA_SETTINGS, CAMERA_TARGET } from "@/settings/cameraSettings";
import { PAPER_COLOR } from "@/settings/paperSettings";
import { World } from "@/components/world/world";
import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";
import { CameraRig } from "@/components/experience/cameraRig";

export function Experience() {
  const { freeCamera } = useControls({
    freeCamera: { value: false, label: "Free camera" },
  });

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
        collapsed
      />
      <KeyboardControls map={KEYBOARD_CONTROLS_MAP}>
        <Canvas
          flat
          shadows="percentage"
          dpr={[1, 1.5]}
          camera={CAMERA_SETTINGS}
        >
          <color args={[PAPER_COLOR]} attach="background" />

          <Effects />

          <World />

          {freeCamera ? (
            <OrbitControls makeDefault target={CAMERA_TARGET} />
          ) : (
            <CameraRig />
          )}
          <Perf position="bottom-right" />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
