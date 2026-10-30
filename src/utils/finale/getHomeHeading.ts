import { Vector3 } from "three";

import { getHeading } from "@/utils/cat";
import { FINALE_LANDING_SPOT } from "@/settings/finaleSettings";

const homePosition = new Vector3(...FINALE_LANDING_SPOT);
const directionHome = new Vector3();

export function getHomeHeading(position: Vector3) {
  directionHome.copy(homePosition).sub(position).setY(0);

  return getHeading(directionHome);
}
