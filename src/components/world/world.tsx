import { Lights } from "@/components/lighting/lights";
import { Ground } from "./ground";
import { Station } from "@/components/world/station";
import { levels } from "@/data/levels";

export function World() {
  return (
    <>
      <Lights />
      {levels.map((level, stationIndex) => (
        <Station key={level.piece} level={level} stationIndex={stationIndex} />
      ))}
      <Ground />
    </>
  );
}
