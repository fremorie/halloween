import { Vector3 } from "three";

import { CAT_START } from "@/settings/journeySettings";
import { getHeading } from "@/utils/cat";

const homePosition = new Vector3(...CAT_START);
const directionHome = new Vector3();

export function getHomeHeading(position: Vector3) {
  directionHome.copy(homePosition).sub(position).setY(0);

  return getHeading(directionHome);
}
