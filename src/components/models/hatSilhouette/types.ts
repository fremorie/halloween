import type { GLTF } from "three-stdlib";
import * as THREE from "three";

export type HatGLTFResult = GLTF & {
  nodes: {
    Hat: THREE.Mesh;
  };
};
