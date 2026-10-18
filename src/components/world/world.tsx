import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useGameStore } from "@/store/gameStore";
import { Ground } from "./ground";
import { Station } from "./station";
import { useCelebrationTimer } from "./useCelebrationTimer";
import { HatSilhouetteModel } from "@/components/models/hatSilhouette/hatSilhouetteModel";
import { useRewardBeatTimer } from "./useRewardBeatTimer";

const HAT_LEVEL_INDEX = levels.findIndex(({ piece }) => piece === "hat");

export function World() {
  const runCount = useGameStore((state) => state.runCount);
  const isHatPuzzleSolved = useGameStore(
    (state) => state.solvedAttempts[HAT_LEVEL_INDEX] !== undefined,
  );

  useCelebrationTimer();
  useRewardBeatTimer();

  return (
    <>
      <Lights />
      {levels.map((level, stationIndex) => (
        <Station key={level.piece} level={level} stationIndex={stationIndex} />
      ))}
      <Cat key={runCount} stationCount={levels.length} />
      <LanternFaceClock />
      <Ground />

      <HatSilhouetteModel isRevealed={isHatPuzzleSolved} />
    </>
  );
}
