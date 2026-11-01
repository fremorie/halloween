"use client";

import { Suspense, useMemo } from "react";
import { MathUtils, Vector3 } from "three";
import { Leva, useControls, button } from "leva";
import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  OrbitControls,
  Preload,
  Sky,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";

import { Effects } from "@/components/postprocessing/effects";
import { CAMERA_SETTINGS, CAMERA_TARGET } from "@/settings/cameraSettings";
import { PAPER_COLOR } from "@/settings/paperSettings";
import { World } from "@/components/world/world";
import { KEYBOARD_CONTROLS_MAP } from "@/settings/controlsSettings";
import { CameraRig } from "@/components/experience/cameraRig";
import { SceneReadySignal } from "@/components/experience/sceneReadySignal";
import { useGameStore } from "@/store/gameStore";
import { levels } from "@/data/levels";
import { REWARDED_COSTUME_PIECES } from "@/settings/rewardSettings";
import { SUN_LIGHT_SETTINGS } from "@/settings/lightSettings";

const DEBUG = true;
const SHOW_PERF = false;

const [sunLightOffsetX, , sunLightOffsetZ] =
  SUN_LIGHT_SETTINGS.offsetFromTarget;
const SUN_LIGHT_AZIMUTH_DEGREES = MathUtils.radToDeg(
  Math.atan2(sunLightOffsetX, sunLightOffsetZ),
);
const LOW_EVENING_SUN_ELEVATION_DEGREES = 4;

type ExperienceProps = {
  onSceneReady: () => void;
};

export function Experience({ onSceneReady }: ExperienceProps) {
  const runCount = useGameStore((state) => state.runCount);
  const { freeCamera, physicsDebug } = useControls({
    freeCamera: { value: false, label: "Free camera" },
    physicsDebug: { value: false, label: "Physics debug" },
    "Jump to finale": button(() =>
      useGameStore.setState({
        mode: "rewarding",
        rewardBeat: "speech",
        currentStationIndex: levels.length - 1,
        wornCostumePieces: [...REWARDED_COSTUME_PIECES],
      }),
    ),
  });

  const {
    skyVisible,
    sunElevationDegrees,
    sunAzimuthDegrees,
    skyDistance,
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
  } = useControls("Sky", {
    skyVisible: { value: true, label: "Visible" },
    sunElevationDegrees: {
      value: LOW_EVENING_SUN_ELEVATION_DEGREES,
      min: -10,
      max: 90,
      step: 0.1,
      label: "Sun elevation°",
    },
    sunAzimuthDegrees: {
      value: SUN_LIGHT_AZIMUTH_DEGREES,
      min: -180,
      max: 180,
      step: 0.5,
      label: "Sun azimuth°",
    },
    skyDistance: {
      value: 1000,
      min: 10,
      max: 10000,
      step: 10,
      label: "Distance",
    },
    turbidity: { value: 10, min: 0, max: 20, step: 0.1, label: "Turbidity" },
    rayleigh: { value: 3, min: 0, max: 4, step: 0.01, label: "Rayleigh" },
    mieCoefficient: {
      value: 0.005,
      min: 0,
      max: 0.1,
      step: 0.001,
      label: "Mie coefficient",
    },
    mieDirectionalG: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.001,
      label: "Mie directional G",
    },
  });

  const skySunPosition = useMemo(
    () =>
      new Vector3().setFromSphericalCoords(
        1,
        MathUtils.degToRad(90 - sunElevationDegrees),
        MathUtils.degToRad(sunAzimuthDegrees),
      ),
    [sunElevationDegrees, sunAzimuthDegrees],
  );

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
        hidden={!DEBUG}
      />
      <KeyboardControls map={KEYBOARD_CONTROLS_MAP}>
        <Canvas
          flat
          shadows="percentage"
          dpr={[1, 1.5]}
          camera={CAMERA_SETTINGS}
        >
          <Suspense fallback={null}>
            <color args={[PAPER_COLOR]} attach="background" />
            {skyVisible && (
              <Sky
                distance={skyDistance}
                sunPosition={skySunPosition}
                turbidity={turbidity}
                rayleigh={rayleigh}
                mieCoefficient={mieCoefficient}
                mieDirectionalG={mieDirectionalG}
              />
            )}

            <Effects />

            <Physics debug={physicsDebug}>
              <World />
            </Physics>

            {freeCamera ? (
              <OrbitControls makeDefault target={CAMERA_TARGET} />
            ) : (
              <CameraRig key={runCount} />
            )}
            {SHOW_PERF && <Perf position="bottom-right" />}
            <Preload all />
            <SceneReadySignal onSceneReady={onSceneReady} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </>
  );
}
