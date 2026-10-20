import type { GroundEllipse } from "@/types/journey";
import {
  PEDESTAL_DETOUR_RADIUS_X,
  PEDESTAL_DETOUR_RADIUS_Z,
} from "@/settings/journeySettings";
import { getStationOrigin } from "./getStationOrigin";

export function getPedestalDetourArea(stationIndex: number): GroundEllipse {
  const [x, , z] = getStationOrigin(stationIndex);

  return {
    x,
    z,
    radiusX: PEDESTAL_DETOUR_RADIUS_X,
    radiusZ: PEDESTAL_DETOUR_RADIUS_Z,
  };
}
