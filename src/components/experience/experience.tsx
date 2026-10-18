"use client";

import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";

import { Effects } from "@/components/postprocessing/effects";
import { CAMERA_SETTINGS, CAMERA_TARGET } from "@/settings/cameraSettings";
import { PAPER_COLOR } from "@/settings/paperSettings";
import { World } from "@/components/world/world";
import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";
import { CameraRig } from "@/components/experience/cameraRig";
import { useGameStore } from "@/store/gameStore";

export function Experience() {
  const runCount = useGameStore((state) => state.runCount);
  const { freeCamera, physicsDebug } = useControls({
    freeCamera: { value: false, label: "Free camera" },
    physicsDebug: { value: false, label: "Physics debug" },
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

          <Physics debug={physicsDebug}>
            <World />
          </Physics>

          {freeCamera ? (
            <OrbitControls makeDefault target={CAMERA_TARGET} />
          ) : (
            <CameraRig key={runCount} />
          )}
          <Perf position="bottom-right" />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
