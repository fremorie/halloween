import { TrimeshCollider } from "@react-three/rapier";

import { useTreeV4GLTF } from "@/components/models/tree-v4/useTreeV4GLTF";

export function TreeTrunkCollider() {
  const { nodes } = useTreeV4GLTF();
  const trunkGeometry = nodes.Trunk001.geometry;
  const trunkTriangleIndices = trunkGeometry.index;

  if (!trunkTriangleIndices) {
    return null;
  }

  return (
    <TrimeshCollider
      args={[
        trunkGeometry.attributes.position.array,
        trunkTriangleIndices.array,
      ]}
    />
  );
}
