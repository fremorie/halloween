import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type HatPatchworkGLTFResult = GLTF & {
  nodes: {
    Patch_bottom_left: THREE.Mesh;
    Patch_bottom_right: THREE.Mesh;
    Patch_top: THREE.Mesh;
  };
};
