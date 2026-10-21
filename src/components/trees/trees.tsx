import { CylinderCollider, RigidBody } from "@react-three/rapier";

import { useLeavesMaterial } from "@/components/models/tree/useLeavesMaterial";
import { TreeModel } from "@/components/models/tree/treeModel";

export function Trees() {
  const leavesMaterial = useLeavesMaterial();

  return (
    <>
      <RigidBody type="fixed" colliders={false}>
        <TreeModel
          position={[-12, 0, -5]}
          scale={0.9}
          leavesMaterial={leavesMaterial}
        />
        <CylinderCollider args={[0.75, 2]} position={[-12, 0.75, -5]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <TreeModel
          rotation-y={-3}
          position={[11, 0, -25]}
          scale={1}
          leavesMaterial={leavesMaterial}
        />
        <CylinderCollider args={[0.75, 2]} position={[11, 0.75, -25]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <TreeModel
          rotation-y={0.2}
          position={[-12, 0, -40]}
          scale={1.2}
          leavesMaterial={leavesMaterial}
        />
        <CylinderCollider args={[0.75, 2]} position={[-12, 0.75, -40]} />
      </RigidBody>
    </>
  );
}
