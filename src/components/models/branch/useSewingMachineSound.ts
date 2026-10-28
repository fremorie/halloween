import { useEffect, useRef } from "react";

import { SEWING_MACHINE_PITCH_RISE_IN_SEMITONES } from "@/settings/soundEffectSettings";
import { useGameStore } from "@/store/gameStore";

const SEMITONES_PER_OCTAVE = 12;

export function useSewingMachineSound(
  edgeThreadStartNodeIds: (number | null)[],
) {
  const sewingMachineSound = useGameStore((state) => state.sewingMachineSound);
  const totalEdgeCount = edgeThreadStartNodeIds.length;
  const wrappedEdgeCount = edgeThreadStartNodeIds.filter(
    (startNodeId) => startNodeId !== null,
  ).length;
  const previousWrappedEdgeCountRef = useRef(wrappedEdgeCount);

  useEffect(() => {
    const hasNewEdgeBeenWrapped =
      wrappedEdgeCount > previousWrappedEdgeCountRef.current;
    previousWrappedEdgeCountRef.current = wrappedEdgeCount;

    if (!hasNewEdgeBeenWrapped || sewingMachineSound === null) return;

    const wrappingProgress =
      totalEdgeCount > 1 ? (wrappedEdgeCount - 1) / (totalEdgeCount - 1) : 1;
    const pitchRiseInSemitones =
      wrappingProgress * SEWING_MACHINE_PITCH_RISE_IN_SEMITONES;
    const playbackRate = 2 ** (pitchRiseInSemitones / SEMITONES_PER_OCTAVE);

    const sewingMachineSoundId = sewingMachineSound.play();
    sewingMachineSound.rate(playbackRate, sewingMachineSoundId);
  }, [sewingMachineSound, wrappedEdgeCount, totalEdgeCount]);
}
