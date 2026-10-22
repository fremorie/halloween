import { getStationOrigin } from "./getStationOrigin";

export function getSolvingFocus(stationIndex: number): [number, number] {
  const [x, , z] = getStationOrigin(stationIndex);

  return [x, z];
}
