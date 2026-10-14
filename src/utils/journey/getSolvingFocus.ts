import { SOLVING_CAMERA_SHIFT } from "@/settings/journeySettings";
import { getStationOrigin, getStationSide } from "./getStationOrigin";

export function getSolvingFocus(stationIndex: number): [number, number] {
  const [x, , z] = getStationOrigin(stationIndex);

  return [x - getStationSide(stationIndex) * SOLVING_CAMERA_SHIFT, z];
}
