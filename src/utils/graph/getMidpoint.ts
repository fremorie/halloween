import type { Vec3 } from "@/types/math";

export function getMidpoint(start: Vec3, end: Vec3): Vec3 {
  return [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];
}
