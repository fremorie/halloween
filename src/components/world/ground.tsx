import { CuboidCollider } from "@react-three/rapier";
import { useControls } from "leva";

import { SHADOW_CATCHER_SETTINGS } from "@/settings/lightSettings";
import {
  GROUND_COLLIDER_CENTRE,
  GROUND_COLLIDER_HALF_EXTENTS,
} from "@/settings/physicsSettings";
import { RENDER_ORDER } from "@/utils/renderOrder";

export function Ground() {
  const { shadowColor } = useControls("Shadows", {
    shadowColor: {
      value: SHADOW_CATCHER_SETTINGS.shadowColor,
      label: "Shadow color",
    },
  });

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
          color={shadowColor}
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
