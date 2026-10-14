import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useWindowGameEvents } from "@/components/experience/useWindowGameEvents";
import { Ground } from "./ground";
import { Station } from "./station";

export function World() {
  useWindowGameEvents();

  return (
    <>
      <Lights />
      {levels.map((level, stationIndex) => (
        <Station key={level.piece} level={level} stationIndex={stationIndex} />
      ))}
      <Cat stationCount={levels.length} />
      <LanternFaceClock />
      <Ground />
    </>
  );
}
