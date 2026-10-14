import {
  STAND_SPOT_AHEAD,
  STAND_SPOT_INSET,
  STATION_SPACING,
} from "@/settings/journeySettings";
import type { Vec3 } from "@/types/math";
import { getStationSide } from "./getStationOrigin";

export function getStandSpot(stationIndex: number): Vec3 {
  return [
    getStationSide(stationIndex) * STAND_SPOT_INSET,
    0,
    -stationIndex * STATION_SPACING + STAND_SPOT_AHEAD,
  ];
}
