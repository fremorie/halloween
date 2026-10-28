import { CuboidCollider } from "@react-three/rapier";

import { SHADOW_CATCHER_SETTINGS } from "@/settings/lightSettings";
import {
  GROUND_COLLIDER_CENTRE,
  GROUND_COLLIDER_HALF_EXTENTS,
} from "@/settings/physicsSettings";
import { RENDER_ORDER } from "@/utils/renderOrder";

export function Ground() {
  return (
    <>
      <mesh
        receiveShadow
        renderOrder={RENDER_ORDER.shadows}
        position-y={0}
        rotation-x={-Math.PI * 0.5}
        scale={400}
      >
        <planeGeometry />
        <shadowMaterial
          color={SHADOW_CATCHER_SETTINGS.shadowColor}
          opacity={SHADOW_CATCHER_SETTINGS.shadowOpacity}
        />
      </mesh>
      <CuboidCollider
        args={GROUND_COLLIDER_HALF_EXTENTS}
        position={GROUND_COLLIDER_CENTRE}
      />
    </>
  );
}
