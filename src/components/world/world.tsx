import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useGameStore } from "@/store/gameStore";
import { HatSilhouetteModel } from "@/components/models/hatSilhouette/hatSilhouetteModel";
import { CapeSilhouetteModel } from "@/components/models/capeSilhouette/capeSilhouetteModel";
import { WingsSilhouetteModel } from "@/components/models/wingsSilhouette/wingsSilhouetteModel";
import { Ground } from "./ground";
import { Station } from "./station";
import { useCelebrationTimer } from "./useCelebrationTimer";
import { useRewardBeatTimer } from "./useRewardBeatTimer";

const HAT_LEVEL_INDEX = levels.findIndex(({ piece }) => piece === "hat");
const CAPE_LEVEL_INDEX = levels.findIndex(({ piece }) => piece === "cape");
const WINGS_LEVEL_INDEX = levels.findIndex(({ piece }) => piece === "wings");

export function World() {
  const runCount = useGameStore((state) => state.runCount);
  const isHatPuzzleSolved = useGameStore(
    (state) => state.solvedAttempts[HAT_LEVEL_INDEX] !== undefined,
  );
  const isCapePuzzleSolved = useGameStore(
    (state) => state.solvedAttempts[CAPE_LEVEL_INDEX] !== undefined,
  );
  const isWingsPuzzleSolved = useGameStore(
    (state) => state.solvedAttempts[WINGS_LEVEL_INDEX] !== undefined,
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
      <CapeSilhouetteModel isRevealed={isCapePuzzleSolved} />
      <WingsSilhouetteModel isRevealed={isWingsPuzzleSolved} />
    </>
  );
}
