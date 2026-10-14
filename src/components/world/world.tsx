import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useGameStore } from "@/store/gameStore";
import { Ground } from "./ground";
import { Station } from "./station";
import { useCelebrationTimer } from "./useCelebrationTimer";

export function World() {
  const runCount = useGameStore((state) => state.runCount);

  useCelebrationTimer();

  return (
    <>
      <Lights />
      {levels.map((level, stationIndex) => (
        <Station key={level.piece} level={level} stationIndex={stationIndex} />
      ))}
      <Cat key={runCount} stationCount={levels.length} />
      <LanternFaceClock />
      <Ground />
    </>
  );
}
