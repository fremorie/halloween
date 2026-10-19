import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type WingsGLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
};
