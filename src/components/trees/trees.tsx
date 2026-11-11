import { RigidBody } from "@react-three/rapier";

import { TreeV4Model } from "@/components/models/tree-v4/treeV4Model";
import { useTreeV4Materials } from "@/components/models/tree-v4/useTreeV4Materials";
import { TREE_PLACEMENTS } from "@/settings/treeSettings";
import { TreeTrunkCollider } from "./treeTrunkCollider";

export function Trees() {
  const treeV4Materials = useTreeV4Materials();

  return (
    <>
      {TREE_PLACEMENTS.map((tree) => (
        <RigidBody
          type="fixed"
          colliders={false}
          key={tree.key}
          position={tree.position}
          rotation={[0, tree.rotationY, 0]}
          scale={tree.scale}
        >
          <TreeV4Model materials={treeV4Materials} />
          <TreeTrunkCollider />
        </RigidBody>
      ))}
    </>
  );
}
