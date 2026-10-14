import type { Color, InstancedMesh } from "three";

export function paintInstanceColors(
  instancedMesh: InstancedMesh,
  getInstanceColor: (instanceIndex: number) => Color,
) {
  for (
    let instanceIndex = 0;
    instanceIndex < instancedMesh.count;
    instanceIndex += 1
  ) {
    instancedMesh.setColorAt(instanceIndex, getInstanceColor(instanceIndex));
  }
  if (instancedMesh.instanceColor) {
    instancedMesh.instanceColor.needsUpdate = true;
  }
}
