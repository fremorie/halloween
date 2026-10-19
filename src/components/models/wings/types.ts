import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type WingsGLTFResult = GLTF & {
  nodes: {
    Wings: THREE.SkinnedMesh;
    Root: THREE.Bone;
    Skeleton1L: THREE.Bone;
    Skeleton1R: THREE.Bone;
  };
  materials: {
    Wings: THREE.MeshStandardMaterial;
  };
};
