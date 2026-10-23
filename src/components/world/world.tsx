import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useGameStore } from "@/store/gameStore";
import { GrassField } from "@/components/grass/GrassField";
import { Trees } from "@/components/trees/trees";
import { Ground } from "./ground";
import { Station } from "./station";
import { useCelebrationTimer } from "./useCelebrationTimer";
import { useRewardBeatTimer } from "./useRewardBeatTimer";
import { useIntroBeatTimer } from "./useIntroBeatTimer";

export function World() {
  const runCount = useGameStore((state) => state.runCount);

  useCelebrationTimer();
  useRewardBeatTimer();
  useIntroBeatTimer();

  return (
    <>
      <fog attach="fog" args={["#ffffff", 25, 75]} />
      <Lights />
      <Ground />
      <Trees />
      <GrassField />
      {levels.map((level, stationIndex) => (
        <Station
          key={`${level.piece}-${runCount}`}
          level={level}
          stationIndex={stationIndex}
        />
      ))}
      <Cat key={runCount} stationCount={levels.length} />
      <LanternFaceClock />
    </>
  );
}
