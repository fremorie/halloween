import { useHelper } from "@react-three/drei";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
  CameraHelper,
  DirectionalLightHelper,
  type Camera,
  type DirectionalLight,
  type Object3D,
} from "three";

const DEBUG = false;

export function Environment() {
  const lightRef = useRef<DirectionalLight>(null);
  const shadowCameraRef = useRef<Camera>(null);

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
      <ambientLight intensity={0.6} />
      <directionalLight
        ref={lightRef}
        position={[3, 5, 2]}
        intensity={2}
        castShadow
        shadow-bias={-0.001}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={10}
      />
    </>
  );
}
