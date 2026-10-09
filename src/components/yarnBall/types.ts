import { type GLTF } from "three-stdlib";
import * as THREE from "three";

export type YarnBallGLTFResult = GLTF & {
  nodes: {
    YarnBall: THREE.Mesh;
  };
  materials: {
    yarn: THREE.MeshStandardMaterial;
  };
};
