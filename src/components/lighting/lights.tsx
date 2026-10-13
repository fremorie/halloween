import { useHelper } from "@react-three/drei";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
  CameraHelper,
  DirectionalLightHelper,
  type Camera,
  type DirectionalLight,
  type Object3D,
} from "three";
import { useControls } from "leva";

import {
  HEMISPHERE_LIGHT_SETTINGS,
  SUN_LIGHT_SETTINGS,
} from "@/settings/lightSettings";
import { EnvironmentLighting } from "./environmentLighting";
import { useSunFollowing } from "./useSunFollowing";

const DEBUG = false;

export function Lights() {
  const lightRef = useRef<DirectionalLight>(null);
  const shadowCameraRef = useRef<Camera>(null);

  useSunFollowing(lightRef);

  const { environmentLighting } = useControls({
    environmentLighting: { value: true, label: "Environment light" },
  });

  const [hasShadowCamera, setHasShadowCamera] = useState(false);

  useEffect(() => {
    if (!lightRef.current) return;

    shadowCameraRef.current = lightRef.current.shadow.camera;
    setHasShadowCamera(true);
  }, []);

  useHelper(
    DEBUG && (lightRef as RefObject<Object3D>),
    DirectionalLightHelper,
    1,
  );

  useHelper(
    DEBUG && hasShadowCamera && (shadowCameraRef as RefObject<Object3D>),
    CameraHelper,
  );

  return (
    <>
      <hemisphereLight
        color={HEMISPHERE_LIGHT_SETTINGS.skyColor}
        groundColor={HEMISPHERE_LIGHT_SETTINGS.groundColor}
        intensity={HEMISPHERE_LIGHT_SETTINGS.intensity}
      />
      <directionalLight
        ref={lightRef}
        castShadow
        position={SUN_LIGHT_SETTINGS.offsetFromTarget}
        color={SUN_LIGHT_SETTINGS.color}
        intensity={SUN_LIGHT_SETTINGS.intensity}
        shadow-mapSize={[
          SUN_LIGHT_SETTINGS.shadowMapSize,
          SUN_LIGHT_SETTINGS.shadowMapSize,
        ]}
        shadow-bias={SUN_LIGHT_SETTINGS.shadowBias}
        shadow-normalBias={SUN_LIGHT_SETTINGS.shadowNormalBias}
        shadow-camera-left={-SUN_LIGHT_SETTINGS.shadowReach}
        shadow-camera-right={SUN_LIGHT_SETTINGS.shadowReach}
        shadow-camera-top={SUN_LIGHT_SETTINGS.shadowReach}
        shadow-camera-bottom={-SUN_LIGHT_SETTINGS.shadowReach}
        shadow-camera-near={SUN_LIGHT_SETTINGS.shadowNear}
        shadow-camera-far={SUN_LIGHT_SETTINGS.shadowFar}
      />

      {environmentLighting && <EnvironmentLighting />}
    </>
  );
}
