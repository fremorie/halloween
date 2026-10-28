import { CylinderCollider, RigidBody } from "@react-three/rapier";

import { useLeavesMaterial } from "@/components/models/tree/useLeavesMaterial";
import { TreeModel } from "@/components/models/tree/treeModel";
import { TREE_PLACEMENTS } from "@/settings/treeSettings";

export function Trees() {
  const leavesMaterial = useLeavesMaterial();

  return (
    <>
      {TREE_PLACEMENTS.map((tree) => (
        <RigidBody type="fixed" colliders={false} key={tree.key}>
          <TreeModel
            position={tree.position}
            scale={tree.scale}
            rotation-y={tree.rotationY}
            leavesMaterial={leavesMaterial}
          />
          <CylinderCollider
            args={[0.75, 2]}
            position={[tree.position[0], 0.75, tree.position[2]]}
          />
        </RigidBody>
      ))}
    </>
  );
}
