import { useEffect, useRef } from "react";

import { useGameStore } from "@/store/gameStore";

export function useSewingMachineSound(
  edgeThreadStartNodeIds: (number | null)[],
) {
  const sewingMachineSound = useGameStore((state) => state.sewingMachineSound);
  const wrappedEdgeCount = edgeThreadStartNodeIds.filter(
    (startNodeId) => startNodeId !== null,
  ).length;
  const previousWrappedEdgeCountRef = useRef(wrappedEdgeCount);

  useEffect(() => {
    const hasNewEdgeBeenWrapped =
      wrappedEdgeCount > previousWrappedEdgeCountRef.current;
    previousWrappedEdgeCountRef.current = wrappedEdgeCount;

    if (hasNewEdgeBeenWrapped) sewingMachineSound?.play();
  }, [sewingMachineSound, wrappedEdgeCount]);
}
