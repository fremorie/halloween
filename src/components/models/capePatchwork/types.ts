import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type CapePatchworkGLTFResult = GLTF & {
  nodes: {
    PatchLeft: THREE.Mesh;
    PatchMiddle: THREE.Mesh;
    PatchRight: THREE.Mesh;
    PatchTopLeft: THREE.Mesh;
    PatchTopRight: THREE.Mesh;
  };
};
