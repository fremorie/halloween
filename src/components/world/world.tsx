import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Ground } from "./ground";
import { Station } from "./station";

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
