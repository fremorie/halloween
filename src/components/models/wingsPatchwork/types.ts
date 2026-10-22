import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type WingsPatchworkGLTFResult = GLTF & {
  nodes: {
    PatchBottom: THREE.Mesh;
    PatchLeft: THREE.Mesh;
    PatchMiddleLeft: THREE.Mesh;
    PatchMiddleRight: THREE.Mesh;
    PatchRight: THREE.Mesh;
    PatchTopLeft: THREE.Mesh;
    PatchTopRight: THREE.Mesh;
  };
};
