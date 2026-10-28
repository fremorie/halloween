import type { Vec3 } from "@/types/math";

export const TREE_PLACEMENTS = [
  { position: [-12, 0, -5], scale: 0.9, rotationY: 0, key: "treeA" },
  { position: [11, 0, -25], scale: 1, rotationY: -3, key: "treeB" },
  { position: [-12, 0, -40], scale: 1.2, rotationY: 0.2, key: "treeC" },
] satisfies { position: Vec3; scale: number; rotationY: number; key: string }[];

export const TREE_CANOPY_RADIUS = 5;
