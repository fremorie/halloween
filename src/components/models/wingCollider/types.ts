import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type WingColliderGLTFResult = GLTF & {
  nodes: {
    LeftWingCollider: THREE.Mesh;
    RightWingCollider: THREE.Mesh;
  };
};
