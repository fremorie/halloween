import type { GroundEllipse } from "@/types/journey";

export function isInsideGroundEllipse(
  position: { x: number; z: number },
  ellipse: GroundEllipse,
) {
  return (
    Math.hypot(
      (position.x - ellipse.x) / ellipse.radiusX,
      (position.z - ellipse.z) / ellipse.radiusZ,
    ) < 1
  );
}
