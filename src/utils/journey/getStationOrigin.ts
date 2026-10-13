import type { Vec3 } from "@/types/math";
import {
  STATION_SIDE_OFFSET,
  STATION_SPACING,
} from "@/settings/journeySettings";

export function getStationSide(stationIndex: number): 1 | -1 {
  return stationIndex % 2 === 0 ? -1 : 1;
}

export function getStationOrigin(stationIndex: number): Vec3 {
  return [
    getStationSide(stationIndex) * STATION_SIDE_OFFSET,
    0,
    -stationIndex * STATION_SPACING,
  ];
}
