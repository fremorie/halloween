import { Lights } from "@/components/lighting/lights";
import { levels } from "@/data/levels";
import { Cat } from "@/components/cat/cat";
import { LanternFaceClock } from "@/components/materials/lanternFaceClock";
import { useGameStore } from "@/store/gameStore";
import { HatSilhouetteModel } from "@/components/models/hatSilhouette/hatSilhouetteModel";
import { CapeSilhouetteModel } from "@/components/models/capeSilhouette/capeSilhouetteModel";
import { WingsSilhouetteModel } from "@/components/models/wingsSilhouette/wingsSilhouetteModel";
import { GrassField } from "@/components/grass/GrassField";
import { Ground } from "./ground";
import { Station } from "./station";
import { useCelebrationTimer } from "./useCelebrationTimer";
import { useRewardBeatTimer } from "./useRewardBeatTimer";
import { Trees } from "@/components/trees/trees";

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

      <HatSilhouetteModel isRevealed={isHatPuzzleSolved} />
      <CapeSilhouetteModel isRevealed={isCapePuzzleSolved} />
      <WingsSilhouetteModel isRevealed={isWingsPuzzleSolved} />
    </>
  );
}
