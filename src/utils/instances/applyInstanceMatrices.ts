import * as THREE from "three";

export function applyInstanceMatrices(
  instancedMesh: THREE.InstancedMesh | null,
  instanceMatrices: THREE.Matrix4[],
) {
  if (!instancedMesh) return;

  instanceMatrices.forEach((instanceMatrix, instanceIndex) =>
    instancedMesh.setMatrixAt(instanceIndex, instanceMatrix),
  );
  instancedMesh.instanceMatrix.needsUpdate = true;
  instancedMesh.computeBoundingSphere();
}
