import { MathUtils, type Vector3 } from "three";

import type { GroundEllipse } from "@/types/journey";
import {
  PEDESTAL_DETOUR_INSIDE_LEAD_ANGLE,
  PEDESTAL_DETOUR_TRIGGER_FRACTION,
} from "@/settings/journeySettings";

function doesSegmentCrossCircle(
  startX: number,
  startZ: number,
  endX: number,
  endZ: number,
  circleRadius: number,
) {
  const segmentX = endX - startX;
  const segmentZ = endZ - startZ;
  const segmentLengthSquared = segmentX ** 2 + segmentZ ** 2;
  const closestPointFraction =
    segmentLengthSquared > 0
      ? MathUtils.clamp(
          -(startX * segmentX + startZ * segmentZ) / segmentLengthSquared,
          0,
          1,
        )
      : 0;

  return (
    closestPointFraction > 0 &&
    Math.hypot(
      startX + closestPointFraction * segmentX,
      startZ + closestPointFraction * segmentZ,
    ) < circleRadius
  );
}

export function getApproachDirection(
  catPosition: Vector3,
  standSpot: Vector3,
  detourArea: GroundEllipse,
  direction: Vector3,
) {
  const catX = (catPosition.x - detourArea.x) / detourArea.radiusX;
  const catZ = (catPosition.z - detourArea.z) / detourArea.radiusZ;
  const spotX = (standSpot.x - detourArea.x) / detourArea.radiusX;
  const spotZ = (standSpot.z - detourArea.z) / detourArea.radiusZ;

  if (
    !doesSegmentCrossCircle(
      catX,
      catZ,
      spotX,
      spotZ,
      PEDESTAL_DETOUR_TRIGGER_FRACTION,
    )
  ) {
    return direction.copy(standSpot).sub(catPosition).setY(0).normalize();
  }

  const orbitSide = Math.sign(catX * spotZ - catZ * spotX) || 1;
  const catDistanceFromCentre = Math.hypot(catX, catZ);
  const catAngle = Math.atan2(catZ, catX);

  const leadAngle =
    catDistanceFromCentre > 1
      ? Math.acos(1 / catDistanceFromCentre)
      : PEDESTAL_DETOUR_INSIDE_LEAD_ANGLE;
  const orbitTargetAngle = catAngle + orbitSide * leadAngle;

  return direction
    .set(
      (Math.cos(orbitTargetAngle) - catX) * detourArea.radiusX,
      0,
      (Math.sin(orbitTargetAngle) - catZ) * detourArea.radiusZ,
    )
    .normalize();
}
