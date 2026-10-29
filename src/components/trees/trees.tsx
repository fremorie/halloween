import { CylinderCollider, RigidBody } from "@react-three/rapier";

import { TreeV4Model } from "@/components/models/tree-v4/treeV4Model";
import { useTreeV4Materials } from "@/components/models/tree-v4/useTreeV4Materials";
import { TREE_PLACEMENTS } from "@/settings/treeSettings";

export function Trees() {
  const treeV4Materials = useTreeV4Materials();

  return (
    <>
      {TREE_PLACEMENTS.map((tree) => (
        <RigidBody type="fixed" colliders={false} key={tree.key}>
          <TreeV4Model
            position={tree.position}
            scale={tree.scale}
            rotation-y={tree.rotationY}
            materials={treeV4Materials}
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
