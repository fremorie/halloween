import { useLayoutEffect, useMemo, useRef } from "react";
import { Color, FrontSide, type InstancedMesh } from "three";
import {
  CylinderCollider,
  InstancedRigidBodies,
  type InstancedRigidBodyProps,
} from "@react-three/rapier";

import { RevealStandardMaterial } from "@/components/materials/revealStandardMaterial";
import { useUncarvedPumpkinGLTF } from "@/components/models/uncarvedPumpkin/useUncarvedPumpkinGLTF";
import {
  PUMPKIN_ANGULAR_DAMPING,
  PUMPKIN_COLLIDER_HALF_HEIGHT,
  PUMPKIN_COLLIDER_RADIUS,
  PUMPKIN_LINEAR_DAMPING,
} from "@/settings/physicsSettings";
import { SCATTERED_PUMPKIN_PLACEMENTS } from "@/settings/scatteredPumpkinSettings";
import { paintInstanceColors } from "@/utils/instances";

export function ScatteredPumpkins() {
  const { nodes, materials } = useUncarvedPumpkinGLTF();
  const pumpkinInstancesRef = useRef<InstancedMesh>(null);

  const pumpkinBodies = useMemo<InstancedRigidBodyProps[]>(
    () =>
      SCATTERED_PUMPKIN_PLACEMENTS.map((placement, pumpkinIndex) => ({
        key: `scattered-pumpkin-${pumpkinIndex}`,
        position: placement.position,
        rotation: [0, placement.rotationY, 0],
        scale: [placement.scale, placement.scale, placement.scale],
      })),
    [],
  );

  useLayoutEffect(() => {
    const pumpkinInstances = pumpkinInstancesRef.current;
    if (!pumpkinInstances) return;

    const brightnessColor = new Color();
    paintInstanceColors(pumpkinInstances, (pumpkinIndex) => {
      const { brightness } = SCATTERED_PUMPKIN_PLACEMENTS[pumpkinIndex];
      return brightnessColor.setScalar(brightness);
    });
  }, []);

  return (
    <InstancedRigidBodies
      instances={pumpkinBodies}
      colliders={false}
      linearDamping={PUMPKIN_LINEAR_DAMPING}
      angularDamping={PUMPKIN_ANGULAR_DAMPING}
      colliderNodes={[
        <CylinderCollider
          key="scattered-pumpkin-collider"
          args={[PUMPKIN_COLLIDER_HALF_HEIGHT, PUMPKIN_COLLIDER_RADIUS]}
          position={[0, PUMPKIN_COLLIDER_HALF_HEIGHT, 0]}
        />,
      ]}
    >
      <instancedMesh
        ref={pumpkinInstancesRef}
        args={[
          nodes.BaseUncarvedPumpkin.geometry,
          undefined,
          pumpkinBodies.length,
        ]}
        frustumCulled={false}
        castShadow
        receiveShadow
      >
        <RevealStandardMaterial
          sourceMaterial={materials.pumpkin}
          shadowSide={FrontSide}
        />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
