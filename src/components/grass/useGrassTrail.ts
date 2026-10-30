import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  ClampToEdgeWrapping,
  Color,
  LinearFilter,
  MathUtils,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  UnsignedByteType,
  type Vector3,
  Vector2,
  type WebGLRenderer,
  WebGLRenderTarget,
} from "three";

import {
  TRAIL_MAX_STAMP_DISTANCE,
  TRAIL_RECOVERY_TIME,
  TRAIL_RESOLUTION,
  TRAIL_STAMP_FADE_OUT_HEIGHT,
  TRAIL_TEXEL_SIZE,
} from "@/settings/grassTrailSettings";
import { useGameStore } from "@/store/gameStore";

import { grassTrailCenterUniform, grassTrailMapUniform } from "./grassMaterial";
import { GrassTrailMaterial } from "./grassTrailMaterial";

function createTrailRenderTarget() {
  return new WebGLRenderTarget(TRAIL_RESOLUTION, TRAIL_RESOLUTION, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    wrapS: ClampToEdgeWrapping,
    wrapT: ClampToEdgeWrapping,
    format: RGBAFormat,
    type: UnsignedByteType,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });
}

function createTrailPass() {
  const material = new GrassTrailMaterial();
  const scene = new Scene();
  scene.add(new Mesh(new PlaneGeometry(2, 2), material));

  return {
    material,
    scene,
    camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
    read: createTrailRenderTarget(),
    write: createTrailRenderTarget(),
    center: new Vector2(),
    catPosition: new Vector2(),
  };
}

type TrailPass = ReturnType<typeof createTrailPass>;

function clearTrailPass(trailPass: TrailPass, renderer: WebGLRenderer) {
  const previousRenderTarget = renderer.getRenderTarget();
  const previousClearColor = new Color();
  const previousClearAlpha = renderer.getClearAlpha();

  renderer.getClearColor(previousClearColor);
  renderer.setClearColor(0x000000, 0);

  [trailPass.read, trailPass.write].forEach((renderTarget) => {
    renderer.setRenderTarget(renderTarget);
    renderer.clear(true, false, false);
  });

  renderer.setRenderTarget(previousRenderTarget);
  renderer.setClearColor(previousClearColor, previousClearAlpha);
}

function disposeTrailPass(trailPass: TrailPass) {
  trailPass.read.dispose();
  trailPass.write.dispose();
  trailPass.material.dispose();

  trailPass.scene.traverse((object) => {
    if (object instanceof Mesh) {
      object.geometry.dispose();
    }
  });
}

function snapToTrailTexel(worldCoordinate: number) {
  return Math.round(worldCoordinate / TRAIL_TEXEL_SIZE) * TRAIL_TEXEL_SIZE;
}

function startTrailPassAtCat(trailPass: TrailPass, catPosition: Vector3) {
  trailPass.center.set(
    snapToTrailTexel(catPosition.x),
    snapToTrailTexel(catPosition.z),
  );
  trailPass.catPosition.set(catPosition.x, catPosition.z);
}

function renderTrailFrame(
  trailPass: TrailPass,
  renderer: WebGLRenderer,
  catPosition: Vector3,
  delta: number,
) {
  const centerX = snapToTrailTexel(catPosition.x);
  const centerZ = snapToTrailTexel(catPosition.z);

  const catTravelThisFrame = Math.hypot(
    catPosition.x - trailPass.catPosition.x,
    catPosition.z - trailPass.catPosition.y,
  );
  if (catTravelThisFrame > TRAIL_MAX_STAMP_DISTANCE) {
    trailPass.catPosition.set(catPosition.x, catPosition.z);
  }

  const { uniforms } = trailPass.material;
  uniforms.uPrevious.value = trailPass.read.texture;
  uniforms.uPreviousCenter.value.copy(trailPass.center);
  uniforms.uCenter.value.set(centerX, centerZ);
  uniforms.uPreviousPlayerPosition.value.copy(trailPass.catPosition);
  uniforms.uPlayerPosition.value.set(catPosition.x, catPosition.z);
  uniforms.uDecay.value = Math.exp(-delta / TRAIL_RECOVERY_TIME);
  uniforms.uStampStrength.value =
    1 - MathUtils.smoothstep(catPosition.y, 0, TRAIL_STAMP_FADE_OUT_HEIGHT);

  const previousRenderTarget = renderer.getRenderTarget();
  renderer.setRenderTarget(trailPass.write);
  renderer.render(trailPass.scene, trailPass.camera);
  renderer.setRenderTarget(previousRenderTarget);

  [trailPass.read, trailPass.write] = [trailPass.write, trailPass.read];
  trailPass.center.set(centerX, centerZ);
  trailPass.catPosition.set(catPosition.x, catPosition.z);

  grassTrailMapUniform.value = trailPass.read.texture;
  grassTrailCenterUniform.value.copy(trailPass.center);
}

export function useGrassTrail() {
  const renderer = useThree((state) => state.gl);
  const trailPassRef = useRef<TrailPass>(undefined);

  useEffect(
    () => () => {
      if (trailPassRef.current) {
        disposeTrailPass(trailPassRef.current);
        trailPassRef.current = undefined;
      }
    },
    [],
  );

  useFrame((_, delta) => {
    const { catPosition } = useGameStore.getState();

    if (!trailPassRef.current) {
      trailPassRef.current = createTrailPass();
      clearTrailPass(trailPassRef.current, renderer);
      startTrailPassAtCat(trailPassRef.current, catPosition);
    }

    renderTrailFrame(trailPassRef.current, renderer, catPosition, delta);
  });
}
