import type { GroundEllipse } from "@/types/journey";
import { ARRIVAL_RADIUS_X, ARRIVAL_RADIUS_Z } from "@/settings/journeySettings";
import { getStationOrigin } from "./getStationOrigin";

export function getArrivalArea(stationIndex: number): GroundEllipse {
  const [x, , z] = getStationOrigin(stationIndex);

  return {
    x,
    z,
    radiusX: ARRIVAL_RADIUS_X,
    radiusZ: ARRIVAL_RADIUS_Z,
  };
}
