import { Vector3 } from "three";

import { getHeading } from "@/utils/cat";
import { FINALE_LANDING_SPOT } from "@/settings/finaleSettings";

const landingSpot = new Vector3(...FINALE_LANDING_SPOT);
const directionToLandingSpot = new Vector3();

export function getLandingSpotHeading(position: Vector3) {
  directionToLandingSpot.copy(landingSpot).sub(position).setY(0);

  return getHeading(directionToLandingSpot);
}
