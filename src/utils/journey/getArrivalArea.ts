import type { GroundEllipse } from "@/types/journey";
import { getStationOrigin } from "@/utils/journey/getStationOrigin";
import { ARRIVAL_RADIUS_X, ARRIVAL_RADIUS_Z } from "@/settings/journeySettings";

export function getArrivalArea(stationIndex: number): GroundEllipse {
  const [x, , z] = getStationOrigin(stationIndex);

  return {
    x,
    z,
    radiusX: ARRIVAL_RADIUS_X,
    radiusZ: ARRIVAL_RADIUS_Z,
  };
}
